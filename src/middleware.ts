import { NextRequest, NextResponse } from "next/server";
import { varvfiy } from "./app/utils/auth";
import { cookies } from "next/headers";

export const middleware = async (req: NextRequest) => {
  console.log("🔥 Middleware running:", req.nextUrl.pathname);

  const token = req.cookies.get("auth-token")?.value;

  if (req.nextUrl.pathname.startsWith("/Admin")) {
    if (!token) {
      console.log("❌ No token. Redirecting...");
      return NextResponse.redirect(new URL("/user/login", req.url));
    }
    const user = await varvfiy(token);
    if (!user) {
      (await cookies()).delete("auth-token");
      return NextResponse.redirect(new URL("/user/login", req.url), {
        headers: {
          errorMassage: "somthing is wrong log in again!!"
        }
      });
    }
    if (user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url), {
        headers: {
          errorMassage: "somthing is wrong log in again!!"
        }
      });
    }

  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/news-list/:path*', "/Admin/:path*"]
};
