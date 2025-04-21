import { prisma } from '@/prisma';
export type EventTypePayload = {
  title?: string;
  description?: string;
  slotSize?: number;
};

/**
 * Updates an existing event's details such as title, description, or slot size.
 *
 * @param {Object} params - Parameters for updating the event.
 * @param {string} params.eventId - The unique ID of the event to be updated.
 * @param {EventTypePayload} params.payload - The fields to update in the event.
 * @param {string} [params.payload.title] - The new title of the event (optional).
 * @param {string} [params.payload.description] - The new description of the event (optional).
 * @param {number} [params.payload.slotSize] - The new slot size in minutes (optional).
 *
 * @returns  The updated event object.
 *
 * @example
 * const updatedEvent = await editEvent({
 *   eventId: "evt_456",
 *   payload: {
 *     title: "Yoga Class",
 *     slotSize: 30
 *   }
 * });
 * console.log(updatedEvent.title); // "Yoga Class"
 */

export const editEvent = async ({
  eventId,
  payload,
}: {
  eventId: string;
  payload: EventTypePayload;
}) => {
  const editedEvent = await prisma.event.update({
    where: { eventId },
    data: {
      ...(payload.slotSize && { slotSize: payload.slotSize }),
      ...(payload.description && { description: payload.description }),
      ...(payload.title && { title: payload.title }),
    },
  });

  return editedEvent;
};
