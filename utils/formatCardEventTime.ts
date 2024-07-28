import { format } from 'date-fns';

const formatEventTime = (startTime: any, endTime: any): string => {
  const start = (startTime instanceof Date) ? startTime : new Date(startTime);
  const end = (endTime instanceof Date) ? endTime : new Date(endTime);

  const isSameDay = start.toDateString() === end.toDateString();
  
  if (isSameDay) {
    return `${format(startTime, 'MMMM d')} at ${format(startTime, 'hh:mm a')}`;
  } else {
    return `${format(startTime, 'MMMM d')} - ${format(endTime, 'MMMM d')}`;
  }
};

export default formatEventTime;
