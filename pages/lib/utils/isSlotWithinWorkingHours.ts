import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/**
 * Checks whether a given time slot falls within a user's working hours and working days.
 *
 * @param {Object} params - Parameters to validate the time slot.
 * @param {string} params.startTime - The start time of the slot (ISO string).
 * @param {string} params.endTime - The end time of the slot (ISO string).
 * @param {number[]} params.workingDays - An array of allowed working days (0 = Sunday, 6 = Saturday).
 * @param {string} params.workingStart - The daily working start time (HH:mm format).
 * @param {string} params.workingEnd - The daily working end time (HH:mm format).
 *
 * @returns Returns `true` if the slot is fully within the working time and falls on a working day, otherwise `false`.
 *
 * @example
 * const result = isSlotWithinWorkingTime({
 *   startTime: "2025-04-21T10:00:00",
 *   endTime: "2025-04-21T10:15:00",
 *   workingDays: [1, 2, 3, 4, 5],
 *   workingStart: "09:00",
 *   workingEnd: "18:00"
 * });
 * console.log(result); // true
 */

export const isSlotWithinWorkingTime = ({
  startTime,
  endTime,
  workingDays,
  workingStart,
  workingEnd,
}: {
  startTime: string;
  endTime: string;
  workingDays: number[];
  workingStart: string;
  workingEnd: string;
}) => {
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const dayOfWeek = start.day();
  const dateStr = start.format('YYYY-MM-DD');
  const workingStartTime = dayjs(`${dateStr}T${workingStart}`);
  const workingEndTime = dayjs(`${dateStr}T${workingEnd}`);
  if (!isWorkingDay({ workingDays, dayOfWeek })) return false;
  return start.isSameOrAfter(workingStartTime) && end.isSameOrBefore(workingEndTime);
};
export const isWorkingDay = ({
  workingDays,
  dayOfWeek,
}: {
  workingDays: number[];
  dayOfWeek: number;
}) => {
  if (!workingDays.includes(dayOfWeek)) return false;
  return true;
};
