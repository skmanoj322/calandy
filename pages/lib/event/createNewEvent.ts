import { prisma } from "@/prisma";
import { EventType } from "../types/event";

/**
 * Creates a new event in the database using the provided event details.
 *
 * @param {EventType} event - The event details to be created.
 * @param {number} event.userId - The ID of the user creating the event.
 * @param {string} event.title - The title of the event.
 * @param {string} event.description - A short description of the event.
 * @param {number} event.slotSize - The duration of each slot for the event (in minutes).
 *
 * @returns {Promise<Event>} The newly created event record.
 */

export const createNewEvent = async (event: EventType) => {
	const newEvent = await prisma.event.create({
		data: { ...event },
	});

	return newEvent;
};
