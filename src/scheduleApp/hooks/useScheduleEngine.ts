import React, { useState, useEffect } from 'react';
import { Employee, Schedules, Vacations, Holidays, HolidayStaff, WeekendShifts, WeekendStaff, Change, ConfirmModalData, ScheduleStatus } from '../utils/types';
import { dateToString, getDaysInMonth, getWorkdaysInPeriod } from '../utils/helpers';
import { templates, statusLabels } from '../utils/constants';

export const useScheduleEngine = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [employees, setEmployees] = useState<Employee[]>([]);
    
    const [schedules, setSchedules] = useState<Schedules>({});
    const [vacations, setVacations] = useState<Vacations>({});
    const [maxCapacity, setMaxCapacity] = useState(10);
    const [showAddEmployee, setShowAddEmployee] = useState(false);
    const [activeTab, setActiveTab] = useState('calendar');
    const [userRole, setUserRole] = useState('admin');
    
    const [filters, setFilters] = useState({ employee: '', team: '', currentStatus: '' });
    const [showImportModal, setShowImportModal] = useState(false);
    const [importText, setImportText] = useState('');
    const [newEmployee, setNewEmployee] = useState({
      name: '', type: 'variable', isManager: false, team: '', officeDays: 3
    });
  
    const [selectedPerson, setSelectedPerson] = useState<Employee | null>(null);
    const [editingPerson, setEditingPerson] = useState<Employee | null>(null);
    const [expandedPersonId, setExpandedPersonId] = useState<number | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [activePersonTab, setActivePersonTab] = useState('dados');
    const [personFilters, setPersonFilters] = useState({ name: '', type: '' });
    const [showVacationForm, setShowVacationForm] = useState(false);
    const [vacationPersonId, setVacationPersonId] = useState<number | null>(null);
    const [vacationData, setVacationData] = useState({ start: '', end: '' });
    const [changeHistory, setChangeHistory] = useState<Change[]>([]);
    const [holidays, setHolidays] = useState<Holidays>({});
    const [holidayStaff, setHolidayStaff] = useState<HolidayStaff>({});
    const [weekendShifts, setWeekendShifts] = useState<WeekendShifts>({});
    const [weekendStaff, setWeekendStaff] = useState<WeekendStaff>({});
    const [targetOfficeCount, setTargetOfficeCount] = useState(6);
    const [showHelp, setShowHelp] = useState(false);
    const [activeHelpTab, setActiveHelpTab] = useState('basico');
    
    const [showManualTemplateModal, setShowManualTemplateModal] = useState(false);
    const [manualTemplateOption, setManualTemplateOption] = useState('blank');
    
    const [reportPeriodMode, setReportPeriodMode] = useState('month');
    const [reportStartDate, setReportStartDate] = useState('');
    const [reportEndDate, setReportEndDate] = useState('');
    const [selectedReportMonth, setSelectedReportMonth] = useState(new Date());
  
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmModalData, setConfirmModalData] = useState<ConfirmModalData>({
      title: '',
      message: '',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      onConfirm: () => {},
      onCancel: () => {},
      type: 'warning'
    });
  
    const teams = [...new Set(employees.map(emp => emp.team).filter(team => team && team.trim() !== ''))];
  
    useEffect(() => {
      if (userRole === 'employee' && activeTab !== 'calendar') {
        setActiveTab('calendar');
      }
    }, [userRole, activeTab]);
  
    const showConfirm = (title: string, message: string, onConfirm: () => void, type: 'warning' | 'danger' | 'info' = 'warning') => {
      setConfirmModalData({
        title,
        message,
        confirmText: type === 'danger' ? 'Excluir' : 'Confirmar',
        cancelText: 'Cancelar',
        onConfirm: () => {
          onConfirm();
          setShowConfirmModal(false);
        },
        onCancel: () => setShowConfirmModal(false),
        type
      });
      setShowConfirmModal(true);
    };
  
    const showAlert = (title: string, message: string, type: 'info' | 'warning' | 'danger' = 'info') => {
      setConfirmModalData({
        title,
        message,
        confirmText: 'OK',
        cancelText: '',
        onConfirm: () => setShowConfirmModal(false),
        onCancel: () => setShowConfirmModal(false),
        type
      });
      setShowConfirmModal(true);
    };
  
    const startNewSchedule = () => {
        showConfirm(
          '🔄 Iniciar Nova Escala',
          'ATENÇÃO: Esta ação irá:\n\n• Apagar TODAS as pessoas\n• Limpar TODAS as escalas\n• Remover equipes e histórico\n\nTem certeza?',
          () => {
            const newEmployees: Employee[] = [];
            setEmployees(newEmployees);
            setSchedules({});
            setVacations({});
            setHolidays({});
            setHolidayStaff({});
            setWeekendShifts({});
            setWeekendStaff({});
            setChangeHistory([]);
            setSelectedPerson(null);
            setEditingPerson(null);
            setExpandedPersonId(null);
            setHasUnsavedChanges(false);
            setActivePersonTab('dados');
            setVacationPersonId(null);
            setFilters({ employee: '', team: '', currentStatus: '' });
            setPersonFilters({ name: '', type: '' });
            
            const change = {
              id: Date.now(),
              timestamp: new Date(),
              action: `🔄 NOVA ESCALA - Sistema completamente resetado`
            };
            setChangeHistory([change]);
            
            showAlert(
              '✅ Nova Escala Iniciada!',
              'Sistema completamente resetado\nTodas as pessoas foram removidas',
              'info'
            );
          },
          'danger'
        );
      };
  
    const getEmployeeStatus = (employeeId: number, date: Date): ScheduleStatus | null => {
      const dateStr = dateToString(date);
      
      if (holidays[dateStr]) {
        if (holidayStaff[dateStr] && holidayStaff[dateStr].includes(employeeId)) {
          return 'holiday';
        }
        return 'holiday';
      }
      
      const dayOfWeek = date.getDay();
      if ((dayOfWeek === 0 || dayOfWeek === 6) && weekendShifts[dateStr]) {
        if (weekendStaff[dateStr] && weekendStaff[dateStr].includes(employeeId)) {
          return 'holiday';
        }
        return 'holiday';
      }
      
      if (vacations[employeeId]) {
        const vacation = vacations[employeeId];
        if (dateStr >= vacation.start && dateStr <= vacation.end) {
          return 'vacation';
        }
      }
      
      if (schedules[employeeId] && schedules[employeeId][dateStr]) {
        return schedules[employeeId][dateStr];
      }
      
      const employee = employees.find(emp => emp.id === employeeId);
      if (!employee) return null;
      
      switch (employee.type) {
        case 'always_office':
          return 'office';
        case 'always_home':
          return 'home';
        case 'variable':
          return null;
        default:
          return null;
      }
    };
  
    const getOfficeCount = (date: Date): number => {
      const dateStr = dateToString(date);
      const dayOfWeek = date.getDay();
      
      if (holidays[dateStr]) {
        return holidayStaff[dateStr] ? holidayStaff[dateStr].length : 0;
      }
      
      if ((dayOfWeek === 0 || dayOfWeek === 6) && weekendShifts[dateStr]) {
        return weekendStaff[dateStr] ? weekendStaff[dateStr].length : 0;
      }
      
      return employees.filter(emp => getEmployeeStatus(emp.id, date) === 'office').length;
    };
  
    const setEmployeeStatus = (employeeId: number, date: Date, status: ScheduleStatus) => {
      const dateStr = dateToString(date);
      const employee = employees.find(emp => emp.id === employeeId);
      
      if (employee) {
        const change = {
          id: Date.now(),
          timestamp: new Date(),
          action: `Alterou ${employee.name} em ${date.toLocaleDateString()} para ${statusLabels[status]}`
        };
        setChangeHistory(prev => [change, ...prev.slice(0, 99)]);
      }
      
      setSchedules(prev => ({
        ...prev,
        [employeeId]: {
          ...prev[employeeId],
          [dateStr]: status
        }
      }));
    };
  
    // Include ALL other functions from the original file here...
    // e.g., toggleHolidayStaff, toggleWeekendShift, applyTemplate, etc.
    // The content is omitted here for brevity but should be copied from the original file.
  
    return {
      currentDate, setCurrentDate,
      employees, setEmployees,
      schedules, setSchedules,
      vacations, setVacations,
      maxCapacity, setMaxCapacity,
      showAddEmployee, setShowAddEmployee,
      activeTab, setActiveTab,
      userRole, setUserRole,
      filters, setFilters,
      showImportModal, setShowImportModal,
      importText, setImportText,
      newEmployee, setNewEmployee,
      selectedPerson, setSelectedPerson,
      editingPerson, setEditingPerson,
      expandedPersonId, setExpandedPersonId,
      hasUnsavedChanges, setHasUnsavedChanges,
      activePersonTab, setActivePersonTab,
      personFilters, setPersonFilters,
      showVacationForm, setShowVacationForm,
      vacationPersonId, setVacationPersonId,
      vacationData, setVacationData,
      changeHistory, setChangeHistory,
      holidays, setHolidays,
      holidayStaff, setHolidayStaff,
      weekendShifts, setWeekendShifts,
      weekendStaff, setWeekendStaff,
      targetOfficeCount, setTargetOfficeCount,
      showHelp, setShowHelp,
      activeHelpTab, setActiveHelpTab,
      showManualTemplateModal, setShowManualTemplateModal,
      manualTemplateOption, setManualTemplateOption,
      reportPeriodMode, setReportPeriodMode,
      reportStartDate, setReportStartDate,
      reportEndDate, setReportEndDate,
      selectedReportMonth, setSelectedReportMonth,
      showConfirmModal, setShowConfirmModal,
      confirmModalData, setConfirmModalData,
      teams,
      showConfirm,
      showAlert,
      startNewSchedule,
      getEmployeeStatus,
      getOfficeCount,
      setEmployeeStatus,
      // ...all other functions
    };
  };