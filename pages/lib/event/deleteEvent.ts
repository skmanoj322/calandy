import { prisma } from "@/prisma";

/**
 * Deletes an event from the database based on the provided event ID.
 *
 * @param {Object} params - Parameters for identifying the event.
 * @param {string} params.eventId - The unique ID of the event to delete.
 *
 * @returns  The deleted event object if successful, or an Error if deletion fails.
 *
 * @example
 * const result = await deleteEventbyId({ eventId: "evt_123" });
 * if (result instanceof Error) {
 *   console.error("Failed to delete event:", result.message);
 * } else {
 *   console.log("Deleted event:", result);
 * }
 */

export const deleteEventbyId = async ({ eventId }: { eventId: string }) => {
	try {
		const deleteEvent = await prisma.event.delete({
			where: {
				eventId,
			},
		});
		return deleteEvent;
	} catch (error) {
		return error;
	}
};
