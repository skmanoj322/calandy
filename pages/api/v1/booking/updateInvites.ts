import { extractUserIdfromreq } from "@/pages/lib/utils/extractUserId";
import { responseWrapper } from "@/pages/lib/utils/responseWrapper";
import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

type BOOKING_STATUS = "CONFIRMED" | "CANCELLED";
const updateInvites = async (req: NextApiRequest, res: NextApiResponse) => {
	const { userId } = extractUserIdfromreq(req);
	const { id, bookingStatus }: { id: number; bookingStatus: BOOKING_STATUS } =
		req.body;
	// update the booking to db
	const updateBookingStatus = await prisma.bookingGuest.update({
		where: {
			id,
		},
		data: {
			bookingStatus,
		},
	});

	return res.send(
		responseWrapper({
			data: updateBookingStatus,
			message: "",
			status: false,
		})
	);
};

export default updateInvites;
