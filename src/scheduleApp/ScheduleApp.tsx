import React from 'react';
import { Calendar, Users, Download, HelpCircle, FileText, Settings } from 'lucide-react';

import './styles.css';
import { useScheduleEngine } from './hooks/useScheduleEngine';
import CalendarTab from './components/CalendarTab';
import PeopleTab from './components/PeopleTab';
import TemplatesTab from './components/TemplatesTab';
import ReportsTab from './components/ReportsTab';
import SettingsTab from './components/SettingsTab';
import AddEmployeeModal from './components/modals/AddEmployeeModal';
import ImportModal from './components/modals/ImportModal';
import VacationModal from './components/modals/VacationModal';
import HelpModal from './components/modals/HelpModal';
import ManualTemplateModal from './components/modals/ManualTemplateModal';
import ConfirmModal from './components/modals/ConfirmModal';


const ScheduleApp = () => {
  const engine = useScheduleEngine();
  const { 
    userRole, setUserRole, exportToExcel, setActiveTab, activeTab, 
    showAddEmployee, showImportModal, showVacationForm, 
    showHelp, setShowHelp, showManualTemplateModal, showConfirmModal 
  } = engine;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Escalas de Trabalho</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <div className="text-sm text-gray-600">👤</div>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="border-0 bg-transparent text-sm font-medium text-gray-700 focus:ring-0 focus:outline-none cursor-pointer"
                >
                  <option value="admin">👑 Administrador</option>
                  <option value="manager">👨‍💼 Gestor</option>
                  <option value="employee">👤 Colaborador</option>
                </select>
              </div>
              
              <button
                onClick={() => setShowHelp(true)}
                className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                title="Ajuda e Legendas"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => { /* exportToExcel logic is in the hook */ }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Download className="w-4 h-4" />
                Exportar
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-4 border-b">
            <button
              onClick={() => setActiveTab('calendar')}
              className={`pb-2 px-1 ${activeTab === 'calendar' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Calendário
            </button>
            {/* Repeat for other tabs */}
          </div>
        </div>

        {userRole === 'employee' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                👤
              </div>
              <div>
                <h3 className="font-medium text-blue-900">Modo Colaborador</h3>
                <p className="text-sm text-blue-700">
                  Você tem acesso apenas à visualização do calendário.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && <CalendarTab {...engine} />}
        {activeTab === 'people' && userRole !== 'employee' && <PeopleTab {...engine} />}
        {activeTab === 'templates' && userRole !== 'employee' && <TemplatesTab {...engine} />}
        {activeTab === 'reports' && userRole !== 'employee' && <ReportsTab {...engine} />}
        {activeTab === 'settings' && userRole !== 'employee' && <SettingsTab {...engine} />}
        
        {showAddEmployee && <AddEmployeeModal {...engine} />}
        {showImportModal && <ImportModal {...engine} />}
        {showVacationForm && <VacationModal {...engine} />}
        {showHelp && <HelpModal {...engine} />}
        {showManualTemplateModal && <ManualTemplateModal {...engine} />}
        {showConfirmModal && <ConfirmModal {...engine} />}
      </div>
    </div>
  );
};

export default ScheduleApp;