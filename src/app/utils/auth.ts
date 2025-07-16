import { compareSync, hashSync } from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";

const Jwt = process.env.JWT_TOKEN;
const secret = new TextEncoder().encode(Jwt);

const comparePassword = (password: string, hash: string): boolean => {
    return compareSync(password, hash);
};
const hashPassword = (password: string): string => {
    return hashSync(password);
}
const genrateToken = async (user: News.Iuser) => {
    return await new SignJWT({
        email: user.email,
        name: user.name,
        role: user.role,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(secret);
}

const varvfiy = async (token: string): Promise<News.Iuser | null> => {
    console.log("🔐 Token:", token);
    console.log("🔐 Secret:", secret, "| Type:", typeof secret);

    try {
        const { payload } = await jwtVerify(token, secret);
        console.log("✅ Decoded Payload:", payload);
        return (payload as News.Iuser) ;
    } catch (error: any) {
        console.error("❌ JWT Verification Error:", error.message);
        return null;
    }
}

export { comparePassword, hashPassword, varvfiy, genrateToken };