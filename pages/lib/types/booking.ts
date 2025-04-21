export interface CreateBooking {
  eventId: number;
  startTime: string;
  endTime: string;
  guestIds?: number[];
}
