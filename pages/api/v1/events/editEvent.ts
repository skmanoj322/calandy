import { editEvent } from "@/pages/lib/event/editEvent";
import { extractUserIdfromreq } from "@/pages/lib/utils/extractUserId";
import { responseWrapper } from "@/pages/lib/utils/responseWrapper";
import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { userId, username } = extractUserIdfromreq(req);

	const { title, description, eventId, slotSize } = req.body;

	console.log("SLOTSIZE", slotSize);

	const Event = await editEvent({
		eventId,
		payload: { title, description, slotSize },
	});
	const parseEvent = responseWrapper({
		data: Event,
		message: "",
		status: true,
	});
	return res.send(parseEvent);
}
