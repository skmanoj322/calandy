// filter out avilable slot and give the slots which active in that particular slot
// if only startTime given only that day avilable slot should be consider

import { getBookedSlots } from "@/pages/lib/booking/getBookedSlots";
import { getWorkingHours } from "@/pages/lib/profile/getWorkingHours";
import {
	isSlotWithinWorkingTime,
	isWorkingDay,
} from "@/pages/lib/utils/isSlotWithinWorkingHours";
import { responseWrapper } from "@/pages/lib/utils/responseWrapper";
import { timeOverLap } from "@/pages/lib/utils/timeOverlap";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { NextApiRequest, NextApiResponse } from "next";
import utc from "dayjs/plugin/utc";
dayjs.extend(isoWeek);
dayjs.extend(utc);

type TIMESLOT = {
	slotSize: number;
	slots: { startTime: string; endTime: string }[];
};

const getAvilableSlots = async (req: NextApiRequest, res: NextApiResponse) => {
	const { startTime, endTime, eventId } = req.query;
	console.log("INIT", startTime, endTime, eventId);

	if (typeof startTime !== "string" || typeof eventId !== "string") {
		return res.status(400).send({
			message: "Invalid params",
			status: false,
		});
	}

	let initialStartTime = dayjs(startTime);
	const bookedSlot = await getBookedSlots({ eventId });

	if (!bookedSlot) {
		return res.status(400).send({
			message: "Invalid eventId",
		});
	}
	const workingHours = await getWorkingHours({ userId: bookedSlot?.userId });

	if (
		!workingHours?.userConstraints ||
		!workingHours.userConstraints.days ||
		!workingHours.userConstraints.endTime ||
		!workingHours.userConstraints.startTime
	) {
		return res.send({
			message: "Working hours not defined",
		});
	}

	const { slotSize } = bookedSlot;
	const { booking } = bookedSlot;

	const timeSlot = timeSlotFilterHandler({
		booking,
		initialStartTime,
		slotSize,
		workingHours: {
			days: workingHours.userConstraints.days,
			endTime: workingHours.userConstraints.endTime,
			startTime: workingHours.userConstraints.startTime,
		},
		// @ts-ignore
		endTime,
	});

	return res.send(
		responseWrapper({
			data: timeSlot,
			message: "",
			status: true,
		})
	);
};

export const isConflictWithBookingTime = ({
	booking,
	startTime,
	endTime,
	workingDays,
}: {
	booking: { id: number; startTime: string; endTime: string }[];
	startTime: string;
	endTime: string;
	workingDays: number[];
}) => {
	if (dayjs(startTime).date() !== dayjs(endTime).date()) {
		const startDay = dayjs(startTime).day();
		const endDay = dayjs(endTime).day();

		if (!isWorkingDay({ workingDays, dayOfWeek: startDay })) {
			return false;
		}
		if (!isWorkingDay({ workingDays, dayOfWeek: endDay })) {
			return false;
		}
	}

	if (!isWorkingDay({ workingDays, dayOfWeek: dayjs(startTime).day() })) {
		return false;
	}
	for (const {
		endTime: bookinEndTime,
		startTime: bookingStartTime,
	} of booking) {
		if (
			timeOverLap({
				startTime1: startTime,
				endTime1: endTime,
				startTime2: bookingStartTime,
				endTime2: bookinEndTime,
			})
		) {
			return true;
		}
	}
	return false;
};

export const timeSlotFilterHandler = ({
	initialStartTime,
	endTime,
	booking,
	slotSize,
	workingHours,
}: {
	initialStartTime: dayjs.Dayjs;
	endTime?: string;
	slotSize: number;
	booking: { startTime: string; endTime: string; id: number }[];
	workingHours: { startTime: string; endTime: string; days: string };
}) => {
	let timeSlot: TIMESLOT = { slotSize, slots: [] };
	const defaultEndTime = endTime
		? endTime
		: `${initialStartTime.format("YYYY-MM-DD")}T${workingHours.endTime}`;
	while (initialStartTime.isBefore(defaultEndTime)) {
		const start = initialStartTime.utc().format();
		const end = initialStartTime.add(slotSize, "minute").utc().format();
		if (
			isConflictWithBookingTime({
				booking,
				startTime: start,
				endTime: end,
				workingDays: JSON.parse(workingHours?.days),
			})
		) {
			initialStartTime = initialStartTime.add(slotSize, "minute");
			continue;
		}

		if (
			!isSlotWithinWorkingTime({
				workingStart: workingHours.startTime,
				workingEnd: workingHours.endTime,
				workingDays: JSON.parse(workingHours.days),
				startTime: start,
				endTime: end,
			})
		) {
			initialStartTime = initialStartTime.add(slotSize, "minute");
			continue;
		}
		timeSlot.slots.push({ startTime: start, endTime: end });
		initialStartTime = initialStartTime.add(slotSize, "minute");
	}
	return timeSlot;
};

export default getAvilableSlots;
