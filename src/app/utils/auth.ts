import { compareSync, hashSync } from "bcryptjs";
import jwt from "jsonwebtoken";

const Jwt = process.env.JWT_TOKEN;
const comparePassword = (password: string, hash: string): boolean => {
    return compareSync(password, hash);
};
const hashPassword = (password: string): string => {
    return hashSync(password);

}
const genrateToken = (user: News.Iuser) => {
    const token = jwt.sign(
        {
            email: user.email,
            name: user.name,
            role: user.role,
        },
        Jwt as string,
        {
            expiresIn: "24h",
        }
    );
    return token;
}

const varvfiy = (token: string): News.Iuser | null => {
    try {
        const user = jwt.verify(token, Jwt as string);
        return user as News.Iuser;
    } catch {
        return null
    }
}

export { comparePassword, hashPassword, varvfiy, genrateToken };