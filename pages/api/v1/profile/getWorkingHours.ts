import { getWorkingHours } from "@/pages/lib/profile/getWorkingHours";
import { extractUserIdfromreq } from "@/pages/lib/utils/extractUserId";
import { responseWrapper } from "@/pages/lib/utils/responseWrapper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { userId } = extractUserIdfromreq(req);
	try {
		const data = await getWorkingHours({ userId });

		return res.send(
			responseWrapper({
				data,
				message: "",
				status: true,
			})
		);
	} catch (error) {
		return res.status(400).send(
			responseWrapper({
				data: error,
				message: "",
				status: false,
			})
		);
	}
}
