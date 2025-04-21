import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	if (!token) {
		return NextResponse.json({
			message: "Unauthrized user",
		});
	}
	const response = NextResponse.next();
	response.headers.set("user_id", token.id as string);
	response.headers.set("username", token.name as string);

	return response;
}

export const config = {
	matcher: ["/api/v1/:path*"],
};
