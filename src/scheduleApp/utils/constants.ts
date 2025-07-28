export const statusColors = {
  office: 'bg-green-500',
  home: 'bg-blue-500',
  vacation: 'bg-orange-500',
  holiday: 'bg-gray-500'
};

export const statusLabels: { [key: string]: string } = {
  office: '🟢 Presencial',
  home: '🔵 Home Office',
  vacation: '🟠 Férias',
  holiday: '⚫ Plantão/Feriado'
};

export const employeeTypes: { [key: string]: string } = {
  always_office: 'Sempre Presencial',
  always_home: 'Sempre Home Office',
  variable: 'Presença Variável'
};

export const templates: { [key: string]: { name: string; pattern: string[]; description?: string } } = {
  '3x2': { name: '3 Presencial + 2 Home Office', pattern: ['office', 'office', 'office', 'home', 'home'] },
  '4x1': { name: '4 Presencial + 1 Home Office', pattern: ['office', 'office', 'office', 'office', 'home'] },
  '2x3': { name: '2 Presencial + 3 Home Office', pattern: ['office', 'office', 'home', 'home', 'home'] },
  'alternate': { name: 'Alternado', pattern: ['office', 'home', 'office', 'home', 'office'] },
  'manager_rotation': { name: 'Meta de Gestores (Mín. 2)', pattern: ['office', 'home'], description: 'Garante mínimo de 2 gestores presenciais por dia' },
  'manual': { name: '100% Manual', pattern: [], description: 'Controle total pelo usuário - clique no calendário para ajustar' }
};

export const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];