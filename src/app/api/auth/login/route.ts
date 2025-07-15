import { NextRequest, NextResponse } from "next/server"
import { login } from "../../../services/auth";
import { comparePassword, genrateToken } from "@/src/app/utils/auth";
import { cookies } from "next/headers";

const POST = async (request: NextRequest) => {
    const { email, password } = await request.json() as { email: string; password: string };
    if (!email || !password) {
        return new NextResponse("Invalid credentials", { status: 401 });
    }
    const user = (login(email));
    console.log(user);
    if (!user) {
        return new NextResponse("Invalid credentials", { status: 401 });
    }
    const isValid = comparePassword(password, user.password as string);
    if (!isValid) {
        return new NextResponse("Invalid credentials", { status: 401 });
    }
    delete user.password;
    const token = genrateToken(user);

    (await cookies()).set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
    });
    return NextResponse.json({ token });
};
export { POST };