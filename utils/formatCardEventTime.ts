import { format } from 'date-fns';

const formatEventTime = (startTime: Date, endTime: Date): string => {
  const isSameDay = startTime.toDateString() === endTime.toDateString();
  
  if (isSameDay) {
    return `${format(startTime, 'MMMM d')} at ${format(startTime, 'hh:mm a')}`;
  } else {
    return `${format(startTime, 'MMMM d')} - ${format(endTime, 'MMMM d')}`;
  }
};

export default formatEventTime;
