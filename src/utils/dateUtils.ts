import { format, isToday, isYesterday, parseISO, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

export const formatDate = (date: string): string => {
  const parsedDate = parseISO(date);
  
  if (isToday(parsedDate)) {
    return 'Today';
  }
  
  if (isYesterday(parsedDate)) {
    return 'Yesterday';
  }
  
  return format(parsedDate, 'MMM d, yyyy');
};

export const formatDateFull = (date: string): string => {
  return format(parseISO(date), 'EEEE, MMMM d, yyyy');
};

export const getTodayISODate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const getCurrentWeekDates = (): string[] => {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 0 });
  const end = endOfWeek(now, { weekStartsOn: 0 });
  
  return eachDayOfInterval({ start, end })
    .map(date => date.toISOString().split('T')[0]);
};

export const isCurrentWeek = (dateString: string): boolean => {
  const date = parseISO(dateString);
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 0 });
  
  return date >= weekStart && date <= weekEnd;
};