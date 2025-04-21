import { createBooking } from '@/pages/lib/booking/createBooking';
import { getBookedSlots } from '@/pages/lib/booking/getBookedSlots';
import { getEventById } from '@/pages/lib/event/getEventbyEventId';
import { checkSlotValidation } from '@/pages/lib/utils/checkSlotValidation';
import { timeOverLap } from '@/pages/lib/utils/timeOverlap';
import { NextApiRequest, NextApiResponse } from 'next';
import { getWorkingHours } from '@/pages/lib/profile/getWorkingHours';
import { extractUserIdfromreq } from '@/pages/lib/utils/extractUserId';
import { isSlotWithinWorkingTime } from '@/pages/lib/utils/isSlotWithinWorkingHours';
import { isValidTimeStamp, TIMESTAMPFORMAT } from '@/pages/lib/utils/slots';

/**
 * @param {NewBookingPayload} req.body -Contains event ID start time end time usernames of the invities
 *
 * Workflow:
 * - Validates event existence
 * - Checks slot timing and alignment with event's slotSize
 * - Validates user working hours and matching working days
 * - Ensures the requested slot does not overlap with existing bookings
 * - Creates the booking if all validations pass
 *
 *
 * Responses:
 * - 200: Booking created successfully
 * - 400: Working hours not defined or other bad request
 * - 408: Invalid event ID
 * - 409: Time slot overlaps with an existing booking
 *
 * @param {NextApiRequest} req - The incoming API request
 * @param {NextApiResponse} res - The outgoing API response
 * @returns {Promise<void>}
 */

type NewBookingPayload = {
  eventId: string;
  startTime: string;
  endTime: string;
  usernames: string[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { eventId, startTime, endTime, usernames }: NewBookingPayload = req.body;

  const { userId } = extractUserIdfromreq(req);

  const event = await getEventById({ eventId });
  if (!event) {
    return res.status(408).send({
      message: 'please check your eventId',
      event,
    });
  }
  if (!checkSlotValidation({ startTime, endTime, slotSize: event?.slotSize })) {
    return res.send({
      message: `Check the TimeSlot Or TimeStamp. Event slot size is ${event.slotSize}min`,
      response: {},
      status: false,
    });
  }
  const workingHours = await getWorkingHours({ userId });

  if (!workingHours) {
    return res.send('working hours');
  }

  const { userConstraints } = workingHours;

  if (!userConstraints?.startTime || !userConstraints?.endTime || !userConstraints?.days) {
    return res.status(400).send({
      message: 'Working hours not defined',
      status: false,
      response: {},
    });
  }

  if (!isValidTimeStamp(startTime) || !isValidTimeStamp(endTime)) {
    return res.status(400).send({
      message: `Invalid TimeStamp,TimeStamp should be ${TIMESTAMPFORMAT}`,
      status: false,
      response: {},
    });
  }

  const destringifydays = JSON.parse(userConstraints.days);

  if (
    !isSlotWithinWorkingTime({
      workingStart: userConstraints?.startTime,
      workingEnd: userConstraints?.endTime,
      workingDays: destringifydays,
      startTime,
      endTime,
    })
  ) {
    return res.send({
      massage: 'slot does not lie in the working hours',
      status: false,
      response: {},
    });
  }
  const alreadyBookedSlot = await getBookedSlots({ eventId });
  for (const book of alreadyBookedSlot?.booking || []) {
    if (
      timeOverLap({
        startTime1: startTime,
        startTime2: book.startTime,
        endTime1: endTime,
        endTime2: book.endTime,
      })
    ) {
      return res.status(409).send({
        status: false,
        response: {},
        message: 'Booking Overlaped please try different slot',
      });
    }
  }

  const newBooking = await createBooking({
    eventId,
    startTime,
    endTime,
    usernames,
  });

  if (!newBooking.status) {
    res.status(400).send(newBooking);
  }

  return res.status(200).send(newBooking);
}
