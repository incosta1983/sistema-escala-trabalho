import { Employee } from './types';

export const dateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getDaysInMonth = (date: Date): (Date | null)[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};

export const getDisplayName = (fullName: string): string => {
  const names = fullName.trim().split(' ');
  return names.length >= 2 ? `${names[0]} ${names[1]}` : names[0] || '';
};

export const getSortedEmployees = (employeesList: Employee[]): Employee[] => {
  return [...employeesList].sort((a, b) => {
    if (a.isManager && !b.isManager) return -1;
    if (!a.isManager && b.isManager) return 1;
    return a.name.localeCompare(b.name);
  });
};

export const getWorkdaysInPeriod = (startDate: Date, endDate: Date): Date[] => {
    const days = [];
    const current = new Date(startDate);
    
    // Ajuste para evitar loop infinito com datas inválidas
    const end = new Date(endDate);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Segunda a sexta
        days.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };