import { NextRequest, NextResponse } from "next/server";

const privateRoutesArr = ["/settings", "/", "/support", "/chat"];

const publicRoutesArr = ["/login", "/registration", "/login/forgot"];

export default function middleware(req: NextRequest) {
	const pathname = req.nextUrl.pathname.substring(1).split("/")[0];
	const fullPathname = "/" + pathname;

	const response = NextResponse.next();

	const isAuth = req.cookies.get("accessJwt");

	if (publicRoutesArr.includes(fullPathname) && isAuth) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	if (privateRoutesArr.includes(fullPathname) && !isAuth) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	response.cookies.set("activePage", pathname === "" ? "home" : pathname);

	return response;
}

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"]
};
