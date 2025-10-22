import { NextRequest, NextResponse } from "next/server";
import { genrateToken, hashPassword } from '@/src/app/utils/auth'
import { exists } from "../../../services/auth";
import { addUser } from "@/src/app/services/news.service";
import { cookies } from "next/headers";

const POST = async (req: NextRequest) => {
    try {
        const { email, name, password, role } =
        await req.json() as { email: string, name: string, password: string, role: string };
        const exist = exists(email);
        if (exist) {
            return NextResponse.json(
                { error: "Email already exists" },
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
        }
        const hashedPassword = await hashPassword(password);
        const user: News.Iuser = { email, name, password: hashedPassword, role };
        addUser(user);
        delete user.password;
        const token = await genrateToken(user);
        (await cookies()).set("auth-token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });
        return new NextResponse(await (token), { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export {
    POST
}