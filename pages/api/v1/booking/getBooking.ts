import { getBookingById } from "@/pages/lib/booking/getBooking";
import { extractUserIdfromreq } from "@/pages/lib/utils/extractUserId";
import { responseWrapper } from "@/pages/lib/utils/responseWrapper";
import { NextApiRequest, NextApiResponse } from "next";

const getBooking = async (req: NextApiRequest, res: NextApiResponse) => {
	const { userId } = extractUserIdfromreq(req);
	// gets bookingDetail
	const bookingDetails = await getBookingById({ userId });
	const data = responseWrapper({
		data: bookingDetails,
		message: "",
		status: true,
	});

	res.send(data);
};
export default getBooking;
