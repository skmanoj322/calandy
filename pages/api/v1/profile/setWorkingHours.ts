import { setWorkingHours } from "@/pages/lib/profile/setWorkingHours";
import { extractUserIdfromreq } from "@/pages/lib/utils/extractUserId";
import { responseWrapper } from "@/pages/lib/utils/responseWrapper";
import { prisma } from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { userId } = extractUserIdfromreq(req);

	const { startTime, endTime, days } = req.body; //have to put validations here
	// todo put validation here
	try {
		const changeWorkingHours = await setWorkingHours({
			userId,
			payload: { days, endTime, startTime },
		});

		return res.send(
			responseWrapper({
				data: changeWorkingHours,
				message: "",
				status: true,
			})
		);
	} catch (error) {
		return res.status(400).send({
			message: `${error}`,
			error,
		});
	}
}
