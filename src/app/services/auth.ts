import sql from 'better-sqlite3'
// import { hashPassword } from '../utils/auth';
const db = sql('news.db');

const login = (email: string): News.Iuser => {
    const login = db
        .prepare(`SELECT * FROM Users WHERE email = ?`)
        .get(email);
    return login as News.Iuser;
}
// const register = () => {
//   const hash = hashPassword(password);
  // const user = db
  //     .prepare(`INSERT INTO Users (email, password, name) VALUES (?, ?, ?)`)
  //     .run(email, hash, name);

  /**
   * check the eamil if exist or not
   * if exist return the user
   * if not exist create the user and add the user to the database
   *
   *
   * @param email
   * @param password
   * @param name
   * @returns user
   */
// }
export { login };
