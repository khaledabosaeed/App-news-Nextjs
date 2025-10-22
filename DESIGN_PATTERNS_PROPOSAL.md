# 🎯 Design Patterns Improvements Proposal

## Overview
تحسينات معمارية مقترحة لتطبيق الأخبار لتحسين القابلية للصيانة والاختبار والتوسع.

---

## 1. Repository Pattern

### المشكلة الحالية
```typescript
// ❌ news.service.ts
const db = sql('news.db');
const getNews = (category: string) => {
  return db.prepare(`SELECT * FROM items WHERE category = ?`).all(category);
}
```

**المشاكل:**
- اتصال مباشر بقاعدة البيانات
- صعوبة Unit Testing
- خلط User و News في نفس الملف
- تكرار كود الاتصال

### الحل المقترح

#### 1.1 Base Repository (Generic)
```typescript
// src/repositories/base.repository.ts
import Database from 'better-sqlite3';

export abstract class BaseRepository<T> {
  protected db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  protected prepare(sql: string) {
    return this.db.prepare(sql);
  }

  abstract getTableName(): string;

  findAll(): T[] {
    return this.prepare(`SELECT * FROM ${this.getTableName()}`).all() as T[];
  }

  findById(id: string | number): T | null {
    const result = this.prepare(
      `SELECT * FROM ${this.getTableName()} WHERE id = ?`
    ).get(id);
    return result ? (result as T) : null;
  }

  delete(id: string | number): void {
    this.prepare(`DELETE FROM ${this.getTableName()} WHERE id = ?`).run(id);
  }
}
```

#### 1.2 News Repository
```typescript
// src/repositories/news.repository.ts
import { BaseRepository } from './base.repository';
import Database from 'better-sqlite3';

export interface NewsEntity {
  slug: string;
  title: string;
  content: string;
  image: string;
  author: string;
  authorEmail: string;
  date: string;
  category: string;
}

export class NewsRepository extends BaseRepository<NewsEntity> {
  getTableName(): string {
    return 'items';
  }

  findBySlug(slug: string): NewsEntity | null {
    const result = this.prepare(
      'SELECT * FROM items WHERE slug = ?'
    ).get(slug);
    return result ? (result as NewsEntity) : null;
  }

  findByCategory(category: string): NewsEntity[] {
    return this.prepare(
      'SELECT * FROM items WHERE category = ?'
    ).all(category) as NewsEntity[];
  }

  findLatest(limit: number = 10): NewsEntity[] {
    return this.prepare(
      `SELECT * FROM items ORDER BY date DESC LIMIT ?`
    ).all(limit) as NewsEntity[];
  }

  create(news: Omit<NewsEntity, 'slug'>): NewsEntity {
    const info = this.prepare(`
      INSERT INTO items (title, slug, image, content, author, author_email, date, category)
      VALUES (@title, @slug, @image, @content, @author, @authorEmail, @date, @category)
    `).run(news as any);

    return { ...news, slug: news.title } as NewsEntity;
  }

  update(slug: string, news: Partial<NewsEntity>): void {
    const fields = Object.keys(news)
      .map(key => `${key} = @${key}`)
      .join(', ');

    this.prepare(
      `UPDATE items SET ${fields} WHERE slug = @slug`
    ).run({ ...news, slug });
  }
}
```

#### 1.3 User Repository
```typescript
// src/repositories/user.repository.ts
import { BaseRepository } from './base.repository';

export interface UserEntity {
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
}

export class UserRepository extends BaseRepository<UserEntity> {
  getTableName(): string {
    return 'Users';
  }

  findByEmail(email: string): UserEntity | null {
    const result = this.prepare(
      'SELECT * FROM Users WHERE email = ?'
    ).get(email);
    return result ? (result as UserEntity) : null;
  }

  exists(email: string): boolean {
    const result = this.prepare(
      'SELECT COUNT(*) as count FROM Users WHERE email = ?'
    ).get(email) as { count: number };
    return result.count > 0;
  }

  create(user: UserEntity): void {
    this.prepare(`
      INSERT INTO Users (email, name, password, role)
      VALUES (@email, @name, @password, @role)
    `).run(user);
  }

  updatePassword(email: string, hashedPassword: string): void {
    this.prepare(
      'UPDATE Users SET password = ? WHERE email = ?'
    ).run(hashedPassword, email);
  }

  findByRole(role: string): UserEntity[] {
    return this.prepare(
      'SELECT * FROM Users WHERE role = ?'
    ).all(role) as UserEntity[];
  }
}
```

#### 1.4 Database Connection Singleton
```typescript
// src/database/connection.ts
import Database from 'better-sqlite3';

class DatabaseConnection {
  private static instance: Database.Database | null = null;
  private static dbPath: string = 'news.db';

  private constructor() {} // منع إنشاء instance مباشرة

  static getInstance(): Database.Database {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new Database(DatabaseConnection.dbPath);
      DatabaseConnection.instance.pragma('journal_mode = WAL'); // Performance optimization
    }
    return DatabaseConnection.instance;
  }

  static setDbPath(path: string): void {
    DatabaseConnection.dbPath = path;
  }

  static close(): void {
    if (DatabaseConnection.instance) {
      DatabaseConnection.instance.close();
      DatabaseConnection.instance = null;
    }
  }
}

export { DatabaseConnection };
```

#### 1.5 Repository Factory
```typescript
// src/repositories/repository.factory.ts
import { NewsRepository } from './news.repository';
import { UserRepository } from './user.repository';
import { DatabaseConnection } from '../database/connection';

export class RepositoryFactory {
  private static newsRepository: NewsRepository | null = null;
  private static userRepository: UserRepository | null = null;

  static getNewsRepository(): NewsRepository {
    if (!this.newsRepository) {
      const db = DatabaseConnection.getInstance();
      this.newsRepository = new NewsRepository(db);
    }
    return this.newsRepository;
  }

  static getUserRepository(): UserRepository {
    if (!this.userRepository) {
      const db = DatabaseConnection.getInstance();
      this.userRepository = new UserRepository(db);
    }
    return this.userRepository;
  }

  // للتسهيل في Testing
  static reset(): void {
    this.newsRepository = null;
    this.userRepository = null;
  }
}
```

### الفوائد
✅ فصل واضح بين Data Access و Business Logic
✅ سهولة عمل Unit Testing (يمكن Mock الـ Repository)
✅ تجنب تكرار الكود
✅ إمكانية تبديل قاعدة البيانات بسهولة
✅ إدارة أفضل للـ Database Connection

---

## 2. Service Layer Pattern

### المشكلة الحالية
```typescript
// ❌ news.service.ts - مجرد wrapper للـ DB
const getNews = (category: string) => {
  return db.prepare(`SELECT * FROM items WHERE category = ?`).all(category);
}
```

**المشاكل:**
- لا يوجد Business Logic
- دوال منفصلة بدون تنظيم
- صعوبة في Dependency Injection

### الحل المقترح

#### 2.1 News Service
```typescript
// src/services/news.service.ts
import { NewsRepository, NewsEntity } from '../repositories/news.repository';
import { RepositoryFactory } from '../repositories/repository.factory';
import slugify from 'slugify';

export interface CreateNewsDTO {
  title: string;
  content: string;
  image: string;
  author: string;
  authorEmail: string;
  category: string;
}

export interface NewsDTO {
  slug: string;
  title: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export class NewsService {
  private repository: NewsRepository;

  constructor(repository?: NewsRepository) {
    this.repository = repository || RepositoryFactory.getNewsRepository();
  }

  async getNewsByCategory(category: string): Promise<NewsDTO[]> {
    const news = this.repository.findByCategory(category);
    return news.map(this.toDTO);
  }

  async getNewsBySlug(slug: string): Promise<NewsDTO | null> {
    const news = this.repository.findBySlug(slug);
    return news ? this.toDTO(news) : null;
  }

  async getLatestNews(limit: number = 10): Promise<NewsDTO[]> {
    const news = this.repository.findLatest(limit);
    return news.map(this.toDTO);
  }

  async createNews(dto: CreateNewsDTO): Promise<NewsDTO> {
    // Business Logic: Generate slug
    const slug = slugify(dto.title, { lower: true, strict: true });

    // Business Logic: Add timestamp
    const date = new Date().toISOString();

    // Create entity
    const newsEntity: NewsEntity = {
      ...dto,
      slug,
      date,
    };

    const created = this.repository.create(newsEntity);
    return this.toDTO(created);
  }

  async updateNews(slug: string, dto: Partial<CreateNewsDTO>): Promise<void> {
    // Business Logic: Update slug if title changed
    if (dto.title) {
      dto = {
        ...dto,
        slug: slugify(dto.title, { lower: true, strict: true })
      } as any;
    }

    this.repository.update(slug, dto as any);
  }

  async deleteNews(slug: string): Promise<void> {
    this.repository.delete(slug);
  }

  // Helper: Entity to DTO
  private toDTO(entity: NewsEntity): NewsDTO {
    return {
      slug: entity.slug,
      title: entity.title,
      content: entity.content,
      image: entity.image,
      author: entity.author,
      date: entity.date,
      category: entity.category,
    };
  }
}
```

#### 2.2 Auth Service
```typescript
// src/services/auth.service.ts
import { UserRepository, UserEntity } from '../repositories/user.repository';
import { RepositoryFactory } from '../repositories/repository.factory';
import { hashPassword, comparePassword, genrateToken } from '../utils/auth';

export interface RegisterDTO {
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'user';
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  };
}

export class AuthService {
  private repository: UserRepository;

  constructor(repository?: UserRepository) {
    this.repository = repository || RepositoryFactory.getUserRepository();
  }

  async register(dto: RegisterDTO): Promise<AuthResponse> {
    // Business Logic: Check if user exists
    if (this.repository.exists(dto.email)) {
      throw new Error('Email already exists');
    }

    // Business Logic: Hash password
    const hashedPassword = await hashPassword(dto.password);

    // Create user
    const user: UserEntity = {
      ...dto,
      password: hashedPassword,
    };

    this.repository.create(user);

    // Generate token
    const token = await genrateToken({
      email: user.email,
      name: user.name,
      role: user.role,
    } as any);

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDTO): Promise<AuthResponse> {
    // Business Logic: Find user
    const user = this.repository.findByEmail(dto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Business Logic: Verify password
    const isValid = await comparePassword(dto.password, user.password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = await genrateToken({
      email: user.email,
      name: user.name,
      role: user.role,
    } as any);

    return {
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async changePassword(email: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = this.repository.findByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    const isValid = await comparePassword(oldPassword, user.password);
    if (!isValid) {
      throw new Error('Invalid old password');
    }

    const hashedPassword = await hashPassword(newPassword);
    this.repository.updatePassword(email, hashedPassword);
  }
}
```

### الفوائد
✅ Business Logic منظم في Classes
✅ سهولة Dependency Injection للـ Testing
✅ فصل واضح بين DTOs و Entities
✅ إعادة استخدام الكود

---

## 3. Validation with Strategy Pattern

### المشكلة الحالية
```typescript
// ❌ serverAction.ts - Validation يدوي
const valdtion: string[] = [];
if (!title) valdtion.push("the titel is required");
if (!newItem.content) valdtion.push("the content is required");
// ... كل الحقول
```

**المشاكل:**
- تكرار منطق Validation
- صعب القراءة
- لا يمكن إعادة استخدامه

### الحل المقترح

#### 3.1 Validation Strategy
```typescript
// src/validation/validator.interface.ts
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface IValidator<T> {
  validate(data: T): ValidationResult;
}
```

#### 3.2 Field Validators
```typescript
// src/validation/field.validators.ts
export class FieldValidator {
  static required(value: any, fieldName: string): string | null {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  }

  static email(value: string, fieldName: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return `${fieldName} must be a valid email`;
    }
    return null;
  }

  static minLength(value: string, min: number, fieldName: string): string | null {
    if (value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  }

  static maxLength(value: string, max: number, fieldName: string): string | null {
    if (value.length > max) {
      return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
  }

  static inArray(value: any, array: any[], fieldName: string): string | null {
    if (!array.includes(value)) {
      return `${fieldName} must be one of: ${array.join(', ')}`;
    }
    return null;
  }

  static url(value: string, fieldName: string): string | null {
    try {
      new URL(value);
      return null;
    } catch {
      return `${fieldName} must be a valid URL`;
    }
  }
}
```

#### 3.3 News Validator
```typescript
// src/validation/news.validator.ts
import { IValidator, ValidationResult } from './validator.interface';
import { FieldValidator } from './field.validators';
import { AllwoowllAll } from '../data/catagory';

export interface NewsFormData {
  title: string;
  content: string;
  image: string;
  author: string;
  authorEmail: string;
  date: string;
  category: string;
}

export class NewsValidator implements IValidator<NewsFormData> {
  validate(data: NewsFormData): ValidationResult {
    const errors: string[] = [];

    // Title validation
    const titleRequired = FieldValidator.required(data.title, 'Title');
    if (titleRequired) errors.push(titleRequired);
    else {
      const titleMax = FieldValidator.maxLength(data.title, 300, 'Title');
      if (titleMax) errors.push(titleMax);
    }

    // Content validation
    const contentRequired = FieldValidator.required(data.content, 'Content');
    if (contentRequired) errors.push(contentRequired);

    // Image validation
    const imageRequired = FieldValidator.required(data.image, 'Image URL');
    if (imageRequired) errors.push(imageRequired);
    else {
      const imageUrl = FieldValidator.url(data.image, 'Image URL');
      if (imageUrl) errors.push(imageUrl);
      else {
        const imageMax = FieldValidator.maxLength(data.image, 3000, 'Image URL');
        if (imageMax) errors.push(imageMax);
      }
    }

    // Author validation
    const authorRequired = FieldValidator.required(data.author, 'Author');
    if (authorRequired) errors.push(authorRequired);

    // Email validation
    const emailRequired = FieldValidator.required(data.authorEmail, 'Author Email');
    if (emailRequired) errors.push(emailRequired);
    else {
      const emailValid = FieldValidator.email(data.authorEmail, 'Author Email');
      if (emailValid) errors.push(emailValid);
    }

    // Date validation
    const dateRequired = FieldValidator.required(data.date, 'Date');
    if (dateRequired) errors.push(dateRequired);

    // Category validation
    const categoryValid = FieldValidator.inArray(data.category, AllwoowllAll, 'Category');
    if (categoryValid) errors.push(categoryValid);

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}
```

#### 3.4 Auth Validator
```typescript
// src/validation/auth.validator.ts
import { IValidator, ValidationResult } from './validator.interface';
import { FieldValidator } from './field.validators';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  name: string;
  role: string;
}

export class LoginValidator implements IValidator<LoginFormData> {
  validate(data: LoginFormData): ValidationResult {
    const errors: string[] = [];

    const emailRequired = FieldValidator.required(data.email, 'Email');
    if (emailRequired) errors.push(emailRequired);
    else {
      const emailValid = FieldValidator.email(data.email, 'Email');
      if (emailValid) errors.push(emailValid);
    }

    const passwordRequired = FieldValidator.required(data.password, 'Password');
    if (passwordRequired) errors.push(passwordRequired);

    return { isValid: errors.length === 0, errors };
  }
}

export class RegisterValidator implements IValidator<RegisterFormData> {
  validate(data: RegisterFormData): ValidationResult {
    const errors: string[] = [];

    // Name validation
    const nameRequired = FieldValidator.required(data.name, 'Name');
    if (nameRequired) errors.push(nameRequired);

    // Email validation
    const emailRequired = FieldValidator.required(data.email, 'Email');
    if (emailRequired) errors.push(emailRequired);
    else {
      const emailValid = FieldValidator.email(data.email, 'Email');
      if (emailValid) errors.push(emailValid);
    }

    // Password validation
    const passwordRequired = FieldValidator.required(data.password, 'Password');
    if (passwordRequired) errors.push(passwordRequired);
    else {
      const passwordMin = FieldValidator.minLength(data.password, 6, 'Password');
      if (passwordMin) errors.push(passwordMin);
    }

    // Role validation
    const roleValid = FieldValidator.inArray(data.role, ['admin', 'user'], 'Role');
    if (roleValid) errors.push(roleValid);

    return { isValid: errors.length === 0, errors };
  }
}
```

#### 3.5 استخدام في Server Action
```typescript
// src/services/serverAction.ts (المحسّن)
'use server';

import slugify from 'slugify';
import xss from 'xss';
import { redirect } from 'next/navigation';
import { NewsValidator } from '../validation/news.validator';
import { NewsService } from './news.service';

export const handleSubmit = async (
  prevState: { validation: string[] },
  formData: FormData
) => {
  // استخراج البيانات
  const data = {
    title: xss(formData.get('title') as string),
    content: xss(formData.get('content') as string),
    author: formData.get('author') as string,
    authorEmail: formData.get('author-email') as string,
    image: formData.get('imageUrl') as string,
    date: formData.get('date') as string,
    category: formData.get('category') as string,
  };

  // Validation باستخدام Strategy
  const validator = new NewsValidator();
  const result = validator.validate(data);

  if (!result.isValid) {
    return { validation: result.errors };
  }

  // Business Logic عبر Service
  const newsService = new NewsService();
  await newsService.createNews(data);

  redirect('/');
};
```

### الفوائد
✅ Validation قابل لإعادة الاستخدام
✅ سهل القراءة والصيانة
✅ يمكن توسيعه بسهولة
✅ Strategy Pattern واضح

---

## 4. Custom Error Handling

### المشكلة الحالية
```typescript
// ❌ لا يوجد Error Handling منظم
return new NextResponse("Invalid credentials", { status: 401 });
```

### الحل المقترح

#### 4.1 Custom Exceptions
```typescript
// src/errors/app.errors.ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(public errors: string[]) {
    super('Validation failed', 400, 'VALIDATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}
```

#### 4.2 Error Handler Utility
```typescript
// src/errors/error.handler.ts
import { NextResponse } from 'next/server';
import { AppError } from './app.errors';

export const handleError = (error: unknown): NextResponse => {
  console.error('Error occurred:', error);

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          code: error.code,
          ...(error instanceof ValidationError && { errors: error.errors }),
        },
      },
      { status: error.statusCode }
    );
  }

  // Unknown error
  return NextResponse.json(
    {
      success: false,
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
      },
    },
    { status: 500 }
  );
};
```

#### 4.3 استخدام في Service
```typescript
// src/services/auth.service.ts (محسّن)
import { ConflictError, UnauthorizedError } from '../errors/app.errors';

export class AuthService {
  async register(dto: RegisterDTO): Promise<AuthResponse> {
    if (this.repository.exists(dto.email)) {
      throw new ConflictError('Email already exists');
    }
    // ...
  }

  async login(dto: LoginDTO): Promise<AuthResponse> {
    const user = this.repository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isValid = await comparePassword(dto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedError('Invalid credentials');
    }
    // ...
  }
}
```

#### 4.4 استخدام في API Route
```typescript
// src/app/api/auth/login/route.ts (محسّن)
import { NextRequest } from 'next/server';
import { AuthService } from '../../../services/auth.service';
import { handleError } from '../../../errors/error.handler';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const authService = new AuthService();
    const result = await authService.login(body);

    const response = NextResponse.json({
      success: true,
      data: result,
    });

    response.cookies.set('auth-token', result.token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
    });

    return response;
  } catch (error) {
    return handleError(error);
  }
};
```

### الفوائد
✅ Error Handling موحد
✅ أكواد خطأ واضحة
✅ سهل Debug
✅ Responses منظمة

---

## 5. Result Pattern (بديل للـ Exceptions)

### الحل البديل للـ try-catch

```typescript
// src/common/result.ts
export class Result<T> {
  private constructor(
    public readonly isSuccess: boolean,
    public readonly value?: T,
    public readonly error?: string
  ) {}

  static success<T>(value: T): Result<T> {
    return new Result<T>(true, value);
  }

  static failure<T>(error: string): Result<T> {
    return new Result<T>(false, undefined, error);
  }

  getValue(): T {
    if (!this.isSuccess) {
      throw new Error('Cannot get value from failed result');
    }
    return this.value!;
  }

  getError(): string {
    if (this.isSuccess) {
      throw new Error('Cannot get error from successful result');
    }
    return this.error!;
  }
}
```

#### استخدام في Service
```typescript
// src/services/auth.service.ts (مع Result Pattern)
export class AuthService {
  async login(dto: LoginDTO): Promise<Result<AuthResponse>> {
    const user = this.repository.findByEmail(dto.email);
    if (!user) {
      return Result.failure('Invalid credentials');
    }

    const isValid = await comparePassword(dto.password, user.password);
    if (!isValid) {
      return Result.failure('Invalid credentials');
    }

    const token = await genrateToken({ email: user.email, name: user.name, role: user.role });

    return Result.success({
      token,
      user: { email: user.email, name: user.name, role: user.role },
    });
  }
}
```

#### استخدام في API Route
```typescript
// src/app/api/auth/login/route.ts
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const authService = new AuthService();
  const result = await authService.login(body);

  if (!result.isSuccess) {
    return NextResponse.json(
      { success: false, error: result.getError() },
      { status: 401 }
    );
  }

  const data = result.getValue();
  const response = NextResponse.json({ success: true, data });
  response.cookies.set('auth-token', data.token, { httpOnly: true, path: '/', maxAge: 3600 });

  return response;
};
```

### الفوائد
✅ بديل أنظف للـ try-catch
✅ Explicit Error Handling
✅ Type-safe

---

## 6. Factory Pattern للـ Services

```typescript
// src/services/service.factory.ts
import { NewsService } from './news.service';
import { AuthService } from './auth.service';
import { RepositoryFactory } from '../repositories/repository.factory';

export class ServiceFactory {
  private static newsService: NewsService | null = null;
  private static authService: AuthService | null = null;

  static getNewsService(): NewsService {
    if (!this.newsService) {
      const repository = RepositoryFactory.getNewsRepository();
      this.newsService = new NewsService(repository);
    }
    return this.newsService;
  }

  static getAuthService(): AuthService {
    if (!this.authService) {
      const repository = RepositoryFactory.getUserRepository();
      this.authService = new AuthService(repository);
    }
    return this.authService;
  }

  static reset(): void {
    this.newsService = null;
    this.authService = null;
  }
}
```

### استخدام
```typescript
// في أي مكان
const newsService = ServiceFactory.getNewsService();
const news = await newsService.getNewsByCategory('sports');
```

---

## 7. Builder Pattern للكائنات المعقدة

```typescript
// src/builders/news.builder.ts
import slugify from 'slugify';
import { CreateNewsDTO } from '../services/news.service';

export class NewsBuilder {
  private news: Partial<CreateNewsDTO> = {};

  setTitle(title: string): this {
    this.news.title = title;
    return this;
  }

  setContent(content: string): this {
    this.news.content = content;
    return this;
  }

  setImage(image: string): this {
    this.news.image = image;
    return this;
  }

  setAuthor(author: string, email: string): this {
    this.news.author = author;
    this.news.authorEmail = email;
    return this;
  }

  setCategory(category: string): this {
    this.news.category = category;
    return this;
  }

  build(): CreateNewsDTO {
    if (!this.news.title || !this.news.content || !this.news.image) {
      throw new Error('Missing required fields');
    }

    return this.news as CreateNewsDTO;
  }
}

// استخدام
const news = new NewsBuilder()
  .setTitle('Breaking News')
  .setContent('This is the content')
  .setImage('https://example.com/image.jpg')
  .setAuthor('John Doe', 'john@example.com')
  .setCategory('technology')
  .build();
```

---

## 8. Dependency Injection Container (متقدم)

```typescript
// src/di/container.ts
type Constructor<T> = new (...args: any[]) => T;

export class DIContainer {
  private services = new Map<string, any>();
  private singletons = new Map<string, any>();

  register<T>(name: string, constructor: Constructor<T>, singleton: boolean = true): void {
    if (singleton) {
      this.singletons.set(name, constructor);
    } else {
      this.services.set(name, constructor);
    }
  }

  resolve<T>(name: string): T {
    // Check if singleton
    if (this.singletons.has(name)) {
      const constructor = this.singletons.get(name);
      if (!this.services.has(name)) {
        this.services.set(name, new constructor());
      }
      return this.services.get(name);
    }

    // Create new instance
    const constructor = this.services.get(name);
    if (!constructor) {
      throw new Error(`Service ${name} not registered`);
    }
    return new constructor();
  }
}

// Setup
const container = new DIContainer();
container.register('NewsRepository', NewsRepository);
container.register('UserRepository', UserRepository);
container.register('NewsService', NewsService);
container.register('AuthService', AuthService);

export { container };
```

---

## ملخص الفوائد

| Pattern | الفائدة الرئيسية |
|---------|------------------|
| Repository | فصل Data Access عن Business Logic |
| Service Layer | تنظيم Business Logic في Classes |
| Strategy (Validation) | Validation قابل لإعادة الاستخدام |
| Custom Errors | Error Handling موحد |
| Result Pattern | بديل للـ try-catch |
| Factory | إنشاء Objects بطريقة منظمة |
| Builder | إنشاء Objects معقدة بسهولة |
| DI Container | إدارة Dependencies مركزية |

---

## خطة التطبيق المقترحة

### Phase 1: Foundation (الأولوية العالية)
1. ✅ Database Connection Singleton
2. ✅ Base Repository
3. ✅ News & User Repositories
4. ✅ Repository Factory

### Phase 2: Business Logic
5. ✅ News Service
6. ✅ Auth Service
7. ✅ Service Factory

### Phase 3: Validation & Error Handling
8. ✅ Validation Strategy
9. ✅ Custom Errors
10. ✅ Error Handler

### Phase 4: Advanced (اختياري)
11. Result Pattern
12. Builder Pattern
13. DI Container

---

## Testing Benefits

مع هذه التحسينات، يصبح Testing أسهل:

```typescript
// tests/news.service.test.ts
import { NewsService } from '../services/news.service';
import { NewsRepository } from '../repositories/news.repository';

describe('NewsService', () => {
  let service: NewsService;
  let mockRepository: jest.Mocked<NewsRepository>;

  beforeEach(() => {
    mockRepository = {
      findByCategory: jest.fn(),
      create: jest.fn(),
      // ... mock methods
    } as any;

    service = new NewsService(mockRepository);
  });

  it('should get news by category', async () => {
    mockRepository.findByCategory.mockReturnValue([
      { slug: 'test', title: 'Test News', /* ... */ }
    ]);

    const result = await service.getNewsByCategory('sports');

    expect(mockRepository.findByCategory).toHaveBeenCalledWith('sports');
    expect(result).toHaveLength(1);
  });
});
```

---

## الخلاصة

هذه التحسينات ستجعل الكود:
- ✅ أكثر قابلية للصيانة
- ✅ أسهل في الاختبار
- ✅ أفضل في الأداء
- ✅ أكثر قابلية للتوسع
- ✅ أسهل في القراءة والفهم

يمكن تطبيقها تدريجياً حسب الأولوية المذكورة أعلاه.
