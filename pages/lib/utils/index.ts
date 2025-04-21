import dayjs from 'dayjs';
import { getSlotRanges } from './slots';
import { timeOverLap } from './timeOverlap';

export const isDateLieInWorkingDay = (date: string, workingDays: number[]) => {
  const inputDate = dayjs(date);
  for (let i = 0; i < workingDays.length; i++) {
    if (workingDays[i] === inputDate.day()) {
      return {
        message: 'working day is  valid',
        status: true,
      };
    }
  }
  return {
    message: 'working day is not valid ',
    status: false,
  };
};

const timeSlotGenerator = (
  workingHours: any,
  slotSize: number,
  bookedSlots: { id: number; startTime: string; endTime: string }[],
  date: string
) => {
  const { startTime, endTime } = workingHours;

  const fullSlot = {
    startTime,
    endTime,
    slots: getSlotRanges(startTime, endTime, slotSize),
    slotSize,
  };

  const { slots } = fullSlot;

  const presentWorkingHoursSlots = slots.filter((slot) => isPresent(slot.startTime));
  let avilableSlots: { startTime: string; endTime: string }[] = [];
  if (bookedSlots.length === 0) {
    return presentWorkingHoursSlots;
  }
  for (const slot of bookedSlots) {
    avilableSlots = presentWorkingHoursSlots.filter(
      (book) =>
        !timeOverLap({
          startTime1: slot.startTime,
          endTime1: slot.endTime,
          startTime2: book.startTime,
          endTime2: book.endTime,
        })
    );
  }
  return avilableSlots;
};

const isPresent = (time: string) => {
  const inputTime = dayjs(time);
  const now = dayjs();
  return inputTime.isAfter(now);
};
