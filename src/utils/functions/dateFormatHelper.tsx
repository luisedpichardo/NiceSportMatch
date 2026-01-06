export const dateFormatHelper = (date: any) => {
  const selectedDate = new Date(date);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Helper to strip time
  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(selectedDate, today)) return 'Today';
  else if (selectedDate < today) return 'Past';
  else if (isSameDay(selectedDate, tomorrow)) return 'Tomorrow';

  return date;
};
