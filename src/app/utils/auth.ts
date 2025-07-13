import { compareSync, hashSync } from "bcryptjs";

const comparePassword = (password: string, hash: string): boolean => {
    return compareSync(password, hash) ;
}
const hashPassword = (password: string): string => {
    return hashSync(password);
    
}

export { comparePassword, hashPassword };