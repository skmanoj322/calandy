import { prisma } from "@/prisma";

/**
 * Retrieves the working hours (start and end time) for a specific user.
 *
 * @param {Object} params - Parameters for querying user working hours.
 * @param {number} params.userId - The ID of the user.
 *
 * @returns The user's working hours if defined, or null if the user or constraints are not found.
 *
 * @example
 * const workingHours = await userWorkingHours({ userId: 10 });
 * console.log(workingHours?.userConstraints?.startTime); // "09:00"
 */

export const userWorkingHours = async ({ userId }: { userId: number }) => {
	const workingHours = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			userConstraints: {
				select: {
					startTime: true,
					endTime: true,
				},
			},
		},
	});

	return workingHours;
};

/**
 * Updates the working hours (start and end time) for a specific user.
 *
 * @param {Object} params - Parameters required to update working hours.
 * @param {number} params.userId - The ID of the user.
 * @param {string} params.startTime - The new start time (e.g., "09:00").
 * @param {string} params.endTime - The new end time (e.g., "18:00").
 *
 * @returns
 *  The updated userConstraints object containing the new working hours.
 *
 * @example
 * const updated = await setWorkinghours({
 *   userId: 1,
 *   startTime: "09:00",
 *   endTime: "17:00"
 * });
 * console.log(updated.userConstraints); // { startTime: "09:00", endTime: "17:00" }
 */

export const setWorkinghours = async ({
	userId,
	endTime,
	startTime,
}: {
	userId: number;
	endTime: string;
	startTime: string;
}) => {
	const setworkingHour = await prisma.user.update({
		where: { id: userId },
		data: {
			userConstraints: {
				update: {
					endTime,
					startTime,
				},
			},
		},
		select: {
			userConstraints: {
				select: {
					endTime: true,
					startTime: true,
				},
			},
		},
	});

	return setworkingHour;
};
