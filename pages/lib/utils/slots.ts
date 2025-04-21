import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

dayjs.extend(customParseFormat);

/**
 * ISO 8601 timestamp format used throughout the app.
 * Example: "2025-04-21T10:00:00Z"
 */
export const TIMESTAMPFORMAT = 'YYYY-MM-DDTHH:mm:ss[Z]';
/**
 * Rounds a given Day.js object up to the nearest 15-minute mark.
 *
 * @param {dayjs.Dayjs} date - A Day.js date object to round.
 * @returns {dayjs.Dayjs} A new Day.js object rounded up to the nearest 15-minute increment.
 *
 * @example
 * const now = dayjs("2025-04-21T10:07:00Z");
 * const rounded = roundUpToNearest15(now); // 10:15:00
 */

export function roundUpToNearest15(date: dayjs.Dayjs) {
  const mins = date.minute();
  const remainder = mins % 15;
  return remainder === 0
    ? date.startOf('minute')
    : date.add(15 - remainder, 'minute').startOf('minute');
}
/**
 * Generates an array of time slot ranges between the given start and end times.
 *
 * @param {string} startTimeStr - The start time in ISO string format.
 * @param {string} endTimeStr - The end time in ISO string format.
 * @param {number} [slotSize=15] - The size of each time slot in minutes (default is 15).
 * @returns {Array<{ startTime: string, endTime: string }>} An array of time slot objects.
 *
 * @example
 * const slots = getSlotRanges("2025-04-21T09:00:00Z", "2025-04-21T10:00:00Z", 30);
 * console.log(slots); // [{ startTime: ..., endTime: ... }, ...]
 */

export function getSlotRanges(startTimeStr: string, endTimeStr: string, slotSize: number = 15) {
  const start = dayjs(startTimeStr);
  const end = dayjs(endTimeStr);
  const slots = [];
  let current = start;
  while (current.add(slotSize, 'minute').isSameOrBefore(end)) {
    const slotStart = current.format('YYYY-MM-DDTHH:mm:ss[Z]');
    const slotEnd = current.add(slotSize, 'minute').format('YYYY-MM-DDTHH:mm:ss[Z]');
    slots.push({ startTime: slotStart, endTime: slotEnd });
    current = current.add(slotSize, 'minute');
  }
  return slots;
}

/**
 * Generates an array of time slot ranges between the given start and end times.
 *
 * @param {string} startTimeStr - The start time in ISO string format.
 * @param {string} endTimeStr - The end time in ISO string format.
 * @param {number} [slotSize=15] - The size of each time slot in minutes (default is 15).
 * @returns {Array<{ startTime: string, endTime: string }>} An array of time slot objects.
 *
 * @example
 * const slots = getSlotRanges("2025-04-21T09:00:00Z", "2025-04-21T10:00:00Z", 30);
 * console.log(slots); // [{ startTime: ..., endTime: ... }, ...]
 */

export const isValidTimeStamp = (time: string) => {
  return dayjs(time, TIMESTAMPFORMAT, true).isValid();
};
