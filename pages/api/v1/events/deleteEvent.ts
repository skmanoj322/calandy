import { deleteEventbyId } from "@/pages/lib/event/deleteEvent";
import { extractUserIdfromreq } from "@/pages/lib/utils/extractUserId";
import { responseWrapper } from "@/pages/lib/utils/responseWrapper";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { eventId } = req.body;
	const { userId } = extractUserIdfromreq(req);

	const deleteEvent = await deleteEventbyId({ eventId });

	const parseResponse = responseWrapper({
		data: deleteEvent,
		status: true,
		message: "",
	});

	return res.send(parseResponse);
};
export default handler;
