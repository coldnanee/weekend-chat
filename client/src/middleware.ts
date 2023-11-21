import { NextRequest, NextResponse } from "next/server";

const privateRoutesArr = ["/settings", "/"];

const publicRoutesArr = ["/login", "/registration"];

export default function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	const response = NextResponse.next();

	const isAuth = req.cookies.get("accessJwt");

	if (publicRoutesArr.includes(pathname) && isAuth) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (privateRoutesArr.includes(pathname) && !isAuth) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	response.cookies.set("auth", isAuth ? "auth" : "");

	if (!isAuth) {
		response.cookies.delete("auth");
	}

	return response;
}

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"]
};