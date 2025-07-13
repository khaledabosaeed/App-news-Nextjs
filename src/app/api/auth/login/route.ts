import { NextRequest, NextResponse } from "next/server"
import { login } from "../../../services/auth";
import { comparePassword } from "@/src/app/utils/auth";

const POST = async (request: NextRequest) => {
    const { email, password } = await request.json() as { email: string; password: string };
    if (!email || !password) {
        return new NextResponse("Invalid credentials", { status: 401 });
    }
    const user = login(email);
        if (!user) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }
    const isValid =  comparePassword(password, user.password || "");
    
        if (!isValid) {
            return new NextResponse("Invalid credentials", { status: 401 });
        }
    delete user.password;
    return new NextResponse(JSON.stringify(user), { status: 200 });
}
    export {
        POST
    }