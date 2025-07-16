import { NextRequest, NextResponse } from "next/server"
import { login } from "../../../services/auth";
import { comparePassword, genrateToken } from "@/src/app/utils/auth";

const POST = async (request: NextRequest) => {
    const { email, password } = await request.json() as { email: string; password: string };
    if (!email || !password) {
        return new NextResponse("Invalid credentials", { status: 401 });
    }
    const user = (login(email));
    if (!user) {
        return new NextResponse("Invalid credentials", { status: 401 });
    }
    const isValid = comparePassword(password, user.password as string);
    if (!isValid) {
        return new NextResponse("Invalid credentials", { status: 401 });
    }
    delete user.password;
    
    const token = await genrateToken(user);
    
  const res = NextResponse.
  redirect(new URL("/add-news", request.url));
  res.cookies.set("auth-token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });
    return res;
};
export { POST };