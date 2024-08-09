export const isDueDateValid = (dueDate: string): boolean => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);

  const normalizeDate = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const normalizedToday = normalizeDate(today);
  const normalizedDueDate = normalizeDate(dueDateObj);

  return normalizedDueDate >= normalizedToday;
};

export const getDueDateLabel = (dueDate: string): string => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);

  today.setHours(0, 0, 0, 0);
  dueDateObj.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (dueDateObj.getTime() === today.getTime()) {
    return 'TODAY';
  }
  if (dueDateObj.getTime() === yesterday.getTime()) {
    return 'YESTERDAY';
  }
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat('en-GB', options);
  const formattedDate = formatter.format(dueDateObj).toUpperCase();
  return formattedDate;
};
