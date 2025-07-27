import { NextRequest, NextResponse } from "next/server";
import { varvfiy } from "./app/utils/auth";
import { cookies } from "next/headers";

const redirectToLogin = (req: NextRequest, message: string) => {
  const redirectUrl = new URL("/user/login", req.url);
  redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
  redirectUrl.searchParams.set("message", message);
  return NextResponse.redirect(redirectUrl);
};

const isAuth = async (token: string, req: NextRequest) => {
  if (!token) {
    return redirectToLogin(req, "Please login first");
  }
  const user = await varvfiy(token);
  if (!user) {
    (await cookies()).delete("auth-token");
    // return NextResponse.redirect(
    //   new URL(
    //     `/user/login?message=${encodeURI(
    //       "Your session is expired. Please login again"
    //     )}`,
    //     req.url
    //   ),
    //   {
    //     headers: {
    //       errorMassage: "somthing is wrong log in again!!",
    //     },
    //   }
    // );
    return redirectToLogin(req, "Your session is expired. Please login again");
  }
  return user;
};

export const middleware = async (req: NextRequest) => {
  const token = req.cookies.get("auth-token")?.value;
  const res = await isAuth(token as string, req);
  // const res = await isAuth(token as string, req) as News.Iuser;
  // const token = req.cookies.get("auth-token")?.value;
  if (res instanceof (NextResponse)) {
    return res;
  }
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/Admin") && res.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (pathname.startsWith("/add-news") && !["admin", "user"].includes(res.role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
    return NextResponse.next();

  // switch (req.nextUrl.pathname) {
  //   case '/Admin': {
  //     const res = await isAuth(token as string, req) as News.Iuser;
  //     if (res instanceof (NextResponse)) {
  //       return res;
  //     }
  //     if (res.role !== "admin") {
  //       return NextResponse.redirect(new URL("/", req.url));
  //     }
  //   }
  //     break;
  //   case '/add-news': {
  //     const user = await isAuth(token as string, req) as News.Iuser;
  //     if (user instanceof (NextResponse)) {
  //       return user;
  //     }
  //     if (user.role !== "admin" && user.role !== "user") {
  //       return NextResponse.redirect(new URL("/", req.url));
  //     }
  //   }
  //     break;
  //   default:
  //     break;
  // }
}

export const config = {
  matcher: ['/add-news/:path*', "/Admin/:path*"]
};
