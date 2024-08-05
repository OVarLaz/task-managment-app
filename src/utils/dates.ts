export const isDueDateValid = (dueDate: string) => {
  const today = new Date();
  const dueDateObj = new Date(dueDate);
  return dueDateObj >= today;
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
  return dueDate;
};
