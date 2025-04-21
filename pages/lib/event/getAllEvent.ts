import { prisma } from "@/prisma";

/**
 * Retrieves all events created by a specific user using their user ID.
 *
 * @param {Object} params - Parameters for querying events.
 * @param {number} params.userId - The ID of the user whose events are to be retrieved.
 *
 * @returns  An object containing the user's events, or null if the user is not found.
 *
 * @example
 * const result = await getAllEventbyUserId({ userId: 2 });
 * console.log(result?.event); // Array of events created by the user
 */

export const getAllEventbyUserId = async ({ userId }: { userId: number }) => {
	const allEvent = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			event: true,
			password: false,
			userConstraints: false,
		},
	});
	return allEvent;
};
