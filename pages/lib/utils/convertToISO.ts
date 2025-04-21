import { getSlotRanges } from './slots';

/**
 * Converts a date and time into an ISO 8601 timestamp string with an optional timezone.
 *
 * @param {Object} params - Parameters to convert to ISO format.
 * @param {string} params.date - The date in YYYY-MM-DD format.
 * @param {string} params.time - The time in HH:mm format.
 * @param {string} [params.timezone="Z"] - The timezone offset (default is UTC 'Z').
 *
 * @returns A string in ISO 8601 format (e.g., "2025-04-21T10:00:00Z").
 *
 * @example
 * const iso = convertToISO({ date: "2025-04-21", time: "10:00" });
 * console.log(iso); // "2025-04-21T10:00:00Z"
 */

export const convertToISO = ({
  date,
  time,
  timezone = 'Z',
}: {
  date: string;
  time: string;
  timezone?: string;
}) => {
  return `${date}T${time}:00Z`;
};

/**
 * Generates ISO start and end timestamps for a given date and time range,
 * and returns slot ranges based on the provided slot size.
 *
 * @param {Object} params - Parameters to create time range and slots.
 * @param {string} params.start - Start time in HH:mm format.
 * @param {string} params.end - End time in HH:mm format.
 * @param {string} params.date - The date in YYYY-MM-DD format.
 * @param {number} params.slotSize - The size of each slot in minutes.
 *
 * @returns An object containing:
 * - `startTimeStamp`: The full ISO start time.
 * - `endTimeStamp`: The full ISO end time.
 * - `slots`: An array of slot ranges generated between the start and end times.
 *
 * @example
 * const result = StartAndEndTimeStampWithSlots({
 *   start: "09:00",
 *   end: "11:00",
 *   date: "2025-04-21",
 *   slotSize: 30
 * });
 * console.log(result.slots); // e.g., [{ start: ..., end: ... }, ...]
 */

export const StartAndEndTimeStampWithSlots = ({
  start,
  end,
  date,
  slotSize,
}: {
  start: string;
  end: string;
  date: string;
  slotSize: number;
}) => {
  const startTimeStamp = convertToISO({ date, time: start });
  const endTimeStamp = convertToISO({ date, time: end });

  const slots = getSlotRanges(startTimeStamp, endTimeStamp, slotSize);

  return { startTimeStamp, endTimeStamp, slots };
};
