import { isSlotWithinWorkingTime } from "@/pages/lib/utils/isSlotWithinWorkingHours";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
	const { startTime, endTime, workingDays, workingEnd, workingStart } =
		req.body;

	console.log(startTime, endTime);
	const result = isSlotWithinWorkingTime({
		startTime,
		endTime,
		workingDays,
		workingEnd,
		workingStart,
	});

	res.send(result);
};

export default handler;
