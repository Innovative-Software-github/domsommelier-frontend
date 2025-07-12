export const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
  });
  const formattedTime = date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { formattedDate, formattedTime };
};