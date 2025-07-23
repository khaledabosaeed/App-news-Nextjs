import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const POST = async (request: NextRequest) => {
    const cookieStore = (await cookies());
    cookieStore.delete('auth-token');
    return NextResponse.redirect(new URL("/", request.url))
}
export {
    POST
}