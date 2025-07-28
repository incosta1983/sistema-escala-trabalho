export interface Employee {
  id: number;
  name: string;
  type: 'variable' | 'always_office' | 'always_home';
  isManager: boolean;
  team: string;
  officeDays: number;
  preferences: { [key: string]: 'home' };
}

export type ScheduleStatus = 'office' | 'home' | 'vacation' | 'holiday';

export interface Schedules {
  [employeeId: number]: {
    [dateStr: string]: ScheduleStatus;
  };
}

export interface Vacations {
  [employeeId: number]: {
    start: string;
    end: string;
  };
}

export interface Holidays {
  [dateStr: string]: boolean;
}

export interface HolidayStaff {
  [dateStr: string]: number[];
}

export interface WeekendShifts {
  [dateStr: string]: boolean;
}

export interface WeekendStaff {
  [dateStr: string]: number[];
}

export interface Change {
  id: number;
  timestamp: Date;
  action: string;
}

export interface ConfirmModalData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  type: 'warning' | 'danger' | 'info';
}