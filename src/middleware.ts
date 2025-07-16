import { NextRequest, NextResponse } from "next/server";
import { varvfiy } from "./app/utils/auth";
import { cookies } from "next/headers";

const isAuth = async (token: string, req: NextRequest) => {
  if (!token) {
    return NextResponse.redirect(
      new URL(`/user/login?message=${encodeURI("Please login first")}`, req.url)
    );
  }
  const user = await varvfiy(token);
  if (!user) {
    (await cookies()).delete("auth-token");
    return NextResponse.redirect(
      new URL(
        `/user/login?message=${encodeURI(
          "Your session is expired. Please login again"
        )}`,
        req.url
      ),
      {
        headers: {
          errorMassage: "somthing is wrong log in again!!",
        },
      }
    );
  }
  return user;
};

export const middleware = async (req: NextRequest) => {
  console.log("🔥 Middleware running:", req.nextUrl.pathname);
  const token = req.cookies.get("auth-token")?.value;
  const res = await isAuth(token as string, req) as News.Iuser;
  if (res instanceof (NextResponse)) {
    return res;
  }
  console.log(res);
  
  switch (req.nextUrl.pathname) {
    case '/Admin': {
      const res = await isAuth(token as string, req) as News.Iuser;
      if (res instanceof (NextResponse)) {
        return res;
      }
      if (res.role !== "admin") {
        console.log(res.role);
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
      break;

    case '/add-news': {
      const user = await isAuth(token as string, req) as News.Iuser;
      if (user instanceof (NextResponse)) {
        return user;
      } console.log(user.role);
      if (user.role !== "admin" && user.role !== "user") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
      break;
    default:

      break;
  }
}

export const config = {
  matcher: ['/add-news/:path*', "/Admin/:path*"]
};
