import sql from 'better-sqlite3'
const db = sql('news.db');
const login = (email: string): News.Iuser | null => {
    const user = db
        .prepare(`SELECT * FROM Users WHERE email = ?`)
        .get(email);
    return user ? (user as News.Iuser) : null;
}
const exists = (email: string): boolean => {
    const exisit = db.prepare("SELECT * FROM Users WHERE email = ?").get(email);
    if (exisit) {
        return true
    } else {
        return false
    }
};
export {
    login,
    exists
};


// const register = (user: News.Iuser): void => {
//     const password = hashPassword(user.password as string);
//     if (exists(user.email)) {
//         throw new Error("email already exist");
//     } else {
//         AddUser()
//     }
// }
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
