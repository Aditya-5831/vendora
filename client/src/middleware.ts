import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/sign-up", "/sign-in"];
const protectedRoutes = ["/orders"];

export const middleware = (req: NextRequest) => {
  const { nextUrl } = req;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isLoggedIn = !!refreshToken;

  const isOnAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isOnAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && isOnProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
