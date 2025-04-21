import { prisma } from "@/prisma";

/**
 * Retrieves a user's working hours, including start time, end time, and available working days.
 *
 * @param {Object} params - Parameters for querying the user's working hours.
 * @param {number} params.userId - The ID of the user.
 *
 * @returns  The user's working hours and username, or null if the user or constraints are not found.
 *
 * @example
 * const workingHours = await getWorkingHours({ userId: 42 });
 * console.log(workingHours?.userConstraints?.startTime); // "09:00"
 */

export const getWorkingHours = async ({ userId }: { userId: number }) => {
	const workingHours = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			username: true,
			userConstraints: {
				select: {
					startTime: true,
					endTime: true,
					days: true,
				},
			},
		},
	});

	return workingHours;
};
