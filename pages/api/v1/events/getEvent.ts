import { getAllEventbyUserId } from "@/pages/lib/event/getAllEvent";
import { responseWrapper } from "@/pages/lib/utils/responseWrapper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const userId = req.headers["user_id"] as string;

	const allEvent = await getAllEventbyUserId({ userId: Number(userId) });

	return res.send(
		responseWrapper({
			data: allEvent,
			message: "",
			status: true,
		})
	);
}
