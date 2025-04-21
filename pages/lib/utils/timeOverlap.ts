import dayjs from 'dayjs';

/**
 * Checks if two time intervals overlap.
 *
 * @param {Object} params - Parameters containing the start and end times of both intervals.
 * @param {string} params.startTime1 - Start time of the first interval (ISO string).
 * @param {string} params.endTime1 - End time of the first interval (ISO string).
 * @param {string} params.startTime2 - Start time of the second interval (ISO string).
 * @param {string} params.endTime2 - End time of the second interval (ISO string).
 *
 * @returns {boolean} `true` if the two time intervals overlap, otherwise `false`.
 *
 * @example
 * const isOverlapping = timeOverLap({
 *   startTime1: "2025-04-21T10:00:00Z",
 *   endTime1: "2025-04-21T10:30:00Z",
 *   startTime2: "2025-04-21T10:15:00Z",
 *   endTime2: "2025-04-21T10:45:00Z"
 * });
 * console.log(isOverlapping); // true
 */

export const timeOverLap = ({
  startTime1,
  endTime1,
  startTime2,
  endTime2,
}: {
  startTime1: string;
  endTime1: string;
  startTime2: string;
  endTime2: string;
}) => {
  const s1 = dayjs(startTime1).isBefore(endTime2);
  const s2 = dayjs(startTime2).isBefore(endTime1);
  return s1 && s2;
};
