import dayjs from 'dayjs';

/**
 * Validates whether a given time slot is valid by checking:
 * - `startTime` is before `endTime`
 * - The difference between `startTime` and `endTime` exactly matches the expected `slotSize` in minutes
 *
 * @param {Object} params - Parameters to validate the slot.
 * @param {string} params.startTime - The start time of the slot (ISO format).
 * @param {string} params.endTime - The end time of the slot (ISO format).
 * @param {number} params.slotSize - The expected duration of the slot in minutes.
 *
 * @returns Returns `true` if the time slot is valid, otherwise `false`.
 *
 * @example
 * const isValid = checkSlotValidation({
 *   startTime: "2025-04-21T10:00:00Z",
 *   endTime: "2025-04-21T10:15:00Z",
 *   slotSize: 15
 * });
 * console.log(isValid); // true
 */

export const checkSlotValidation = ({
  startTime,
  endTime,
  slotSize,
}: {
  startTime: string;
  endTime: string;
  slotSize: number;
}) => {
  if (!dayjs(startTime).isBefore(endTime)) {
    return false;
  }
  const start = dayjs(startTime);
  const end = dayjs(endTime);
  const diffInMinute = end.diff(start, 'minute');
  if (diffInMinute === Number(slotSize)) {
    return true;
  }
  return false;
};
