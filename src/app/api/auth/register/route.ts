import { NextRequest, NextResponse } from "next/server";
import { genrateToken, hashPassword } from '@/src/app/utils/auth'
import { exists } from "../../../services/auth";
import { addUser } from "@/src/app/services/news.service";

const POST = async (req: NextRequest) => {
    try {
        const { email, name, password, role } =
            await req.json() as { email: string, name: string, password: string, role: string };
        const exist = exists(email);
        if (exist) {
            return new NextResponse("Email already exists"), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        };
        const hashedPassword = await hashPassword(password);
        const user: News.Iuser = { email, name, password: hashedPassword, role };
        await addUser(user);
        delete user.password;
        const token = genrateToken(user);
        return new NextResponse(token, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export {
    POST
}