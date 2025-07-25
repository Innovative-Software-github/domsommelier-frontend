export const generateMonthsUntilEndOfYear = (currentDate: Date) => {
  const months = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const result = [];
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  for (let month = currentMonth; month < 12; month++) {
    const lastDay = new Date(currentYear, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const days = [];
    // Если это текущий месяц, начинаем с сегодняшнего дня, иначе с 1
    const startDay = month === currentMonth ? currentDay : 1;
    for (let day = startDay; day <= daysInMonth; day++) {
      // Создаём дату
      const date = new Date(currentYear, month, day);
      // Проверяем, что дата не раньше сегодняшней (на случай если currentDate содержит время)
      if (
        month > currentMonth ||
        (month === currentMonth && day >= currentDay)
      ) {
        days.push(date);
      }
    }

    // Добавляем только если есть дни в этом месяце
    if (days.length > 0) {
      result.push({
        [months[month]]: days
      });
    }
  }

  return result;
};