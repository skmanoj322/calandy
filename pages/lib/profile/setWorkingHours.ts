import { prisma } from "@/prisma";

export type SetWorkingHoursPayload = {
	days: string;
	startTime: string;
	endTime: string;
};
/**
 * Updates a user's working hours, including start time, end time, and working days.
 *
 * @param {Object} params - The parameters to update the user's working hours.
 * @param {number} params.userId - The ID of the user whose working hours are being updated.
 * @param {SetWorkingHoursPayload} params.payload - The payload containing the updated working hours.
 * @param {string} [params.payload.startTime] - The new start time (e.g., "09:00").
 * @param {string} [params.payload.endTime] - The new end time (e.g., "18:00").
 * @param {string} [params.payload.days] - A JSON stringified array of working days (e.g., '["Mon", "Tue"]').
 *
 * @returns The updated user's working hours and username.
 *
 * @example
 * const result = await setWorkingHours({
 *   userId: 1,
 *   payload: {
 *     startTime: "09:00",
 *     endTime: "17:00",
 *     days: JSON.stringify(["Mon", "Tue", "Wed"])
 *   }
 * });
 * console.log(result.userConstraints.startTime); // "09:00"
 */

export const setWorkingHours = async ({
	userId,
	payload,
}: {
	userId: number;
	payload: SetWorkingHoursPayload;
}) => {
	const setNewWorking = await prisma.user.update({
		where: { id: userId },
		data: {
			userConstraints: {
				update: {
					...payload,
				},
			},
		},
		select: {
			username: true,
			userConstraints: {
				select: {
					days: true,
					startTime: true,
					endTime: true,
				},
			},
		},
	});

	return setNewWorking;
};
