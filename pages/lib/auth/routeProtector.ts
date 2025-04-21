import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { ok } from "assert";

export const routeProtector = async ({ req }: { req: NextApiRequest }) => {
	const token = await getToken({ req });
	if (!token) {
		return { message: "user is not authorized", ok: false };
	}
	return {
		ok: true,
		username: token.name,
		userId: token?.id,
	};
};
