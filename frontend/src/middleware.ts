import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL, URLS } from "@/common/utils/urls";
 
const PROTECTED_ROUTES = [URLS.HOME];
const PUBLIC_ROUTES = [URLS.LOGIN, URLS.REGISTER];
 
const middleware = async(req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.includes(path);
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL(URLS.LOGIN, req.nextUrl));
    } else {
      return NextResponse.next();
    }
  }

  try {
    const result = await fetch(`${BACKEND_URL}/api/user/verify`, {
      method: "POST",
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({ token })
    });
    const validatedToken = await result.json();
    const isValidToken = validatedToken.status === "success";

    if (isPublicRoute && isValidToken) {
      return NextResponse.redirect(new URL(URLS.HOME, req.nextUrl));
    }
    if (isProtectedRoute && !isValidToken) {
      return NextResponse.redirect(new URL(URLS.LOGIN, req.nextUrl));
    }
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL(URLS.LOGIN, req.nextUrl));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export default middleware;