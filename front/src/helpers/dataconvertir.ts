// helpers/dateHelpers.ts
export const getDayOfWeek = (date: string) => {
    const day = new Date(date).getDay();
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return daysOfWeek[day];
  };
  