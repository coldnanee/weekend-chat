import { NextRequest, NextResponse } from "next/server";

const privateRoutesArr = ["/settings", "/", "/support", "/chat"];

const publicRoutesArr = ["/login", "/registration"];

export default function middleware(req: NextRequest) {
	const pathname = "/" + req.nextUrl.pathname.substring(1).split("/")[0];

	const response = NextResponse.next();

	const isAuth = req.cookies.get("accessJwt");

	if (publicRoutesArr.includes(pathname) && isAuth) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (privateRoutesArr.includes(pathname) && !isAuth) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return response;
}

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"]
};
