import React from 'react';
import { Plus, FileText, Edit, X, Calendar, RotateCcw } from 'lucide-react';
import { getSortedEmployees } from '../utils/helpers';
import { employeeTypes, statusLabels } from '../utils/constants';
import { Employee } from '../utils/types';

const PeopleTab = (props: any) => {
  const {
    employees,
    setEmployees,
    targetOfficeCount,
    setTargetOfficeCount,
    setShowImportModal,
    setShowAddEmployee,
    personFilters,
    setPersonFilters,
    getFilteredPeople,
    getPersonStatus,
    userRole,
    expandedPersonId,
    setExpandedPersonId,
    editingPerson,
    setEditingPerson,
    hasUnsavedChanges,
    setHasUnsavedChanges,
    activePersonTab,
    setActivePersonTab,
    showConfirm,
    updatePerson,
    setSelectedPerson,
    setVacationPersonId,
    setShowVacationForm,
    vacations,
    schedules,
    setSchedules,
    setVacations,
    setChangeHistory,
  } = props;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Gerenciar Pessoas</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Meta presencial (absoluta):</span>
              <input
                type="number"
                value={targetOfficeCount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetOfficeCount(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded text-center font-medium"
                min="0"
              />
              <span className="text-sm text-gray-600">pessoas</span>
              <div className="text-xs text-blue-600 ml-2">
                🎯 Templates sempre respeitam este número
              </div>
            </div>
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <FileText className="w-4 h-4" />
              Importar Lista
            </button>
            <button
              onClick={() => setShowAddEmployee(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Adicionar Nova Pessoa
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar por nome</label>
            <input
              type="text"
              placeholder="Buscar..."
              value={personFilters.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPersonFilters((prev: any) => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={personFilters.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setPersonFilters((prev: any) => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="">Todos</option>
              <option value="manager">Gestores</option>
              <option value="employee">Colaboradores</option>
            </select>
          </div>
        </div>

        {/* People Grid */}
        <div className="border rounded-lg p-4" style={{ maxHeight: '70vh', minHeight: '60vh', overflowY: 'auto' }}>
          {employees.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma pessoa cadastrada</h3>
              <p className="text-gray-600 mb-6 max-w-md">
                Comece adicionando pessoas individualmente ou importe uma lista completa de uma só vez.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <FileText className="w-4 h-4" />
                  Importar Lista
                </button>
                <button
                  onClick={() => setShowAddEmployee(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Pessoa
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {getSortedEmployees(getFilteredPeople()).map((person: Employee) => {
                const status = getPersonStatus(person.id);
                const statusIcon: { [key: string]: string } = {
                  'office': '🟢', 'home': '🔵', 'vacation': '🟠',
                  'always_office': '🟢', 'always_home': '🔵', 'variable': '⚪'
                };
                const isExpanded = expandedPersonId === person.id;
                const currentEditData = editingPerson || person;

                return (
                  <div key={person.id} className={`transition-all duration-300 rounded-lg ${isExpanded ? 'border-2 border-blue-500 bg-blue-50 shadow-lg' : 'border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}>
                    {/* Card Header */}
                    <div className="p-4">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 flex-1">
                           <span className="text-lg">{statusIcon[status] || '⚪'}</span>
                           <div className="flex-1 min-w-0">
                             <div className="font-medium text-base truncate flex items-center gap-2">
                               {person.name}
                               {person.isManager && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Gestor</span>}
                             </div>
                             {person.team && <div className="text-sm text-gray-600 mt-1">{person.team}</div>}
                           </div>
                         </div>
                         
                         <div className="flex items-center gap-2">
                           <button
                             onClick={() => {
                               setExpandedPersonId(person.id);
                               setEditingPerson(person);
                               setHasUnsavedChanges(false);
                               setActivePersonTab('dados');
                             }}
                             className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg" title="Editar pessoa"
                             disabled={userRole === 'employee'}
                           >
                             <Edit className="w-4 h-4" />
                           </button>
                           <button
                             onClick={() => {
                               showConfirm('❌ Excluir Pessoa', `Tem certeza que deseja excluir ${person.name}?`, () => {
                                 setEmployees((prev: Employee[]) => prev.filter(emp => emp.id !== person.id));
                                 if (expandedPersonId === person.id) {
                                   setExpandedPersonId(null);
                                   setEditingPerson(null);
                                 }
                                 // Additional cleanup logic here
                               }, 'danger');
                             }}
                             className="p-2 text-red-600 hover:bg-red-100 rounded-lg" title="Excluir pessoa"
                             disabled={userRole === 'employee'}
                           >
                             <X className="w-4 h-4" />
                           </button>
                         </div>
                       </div>
                       
                       <div className="mt-3">
                         <button
                           onClick={() => setExpandedPersonId(isExpanded ? null : person.id)}
                           className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                         >
                           📋 {isExpanded ? 'Fechar Detalhes' : 'Ver Detalhes'}
                         </button>
                       </div>
                     </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="border-t border-blue-200 bg-white person-card-expanded">
                        <div className="p-6">
                           <div className="flex items-center justify-between mb-4">
                             <div className="flex gap-4">
                               <button onClick={() => setActivePersonTab('dados')} className={`pb-2 px-1 border-b-2 ${activePersonTab === 'dados' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>📋 Dados Básicos</button>
                               <button onClick={() => setActivePersonTab('escala')} className={`pb-2 px-1 border-b-2 ${activePersonTab === 'escala' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}>📅 Escala & Férias</button>
                             </div>
                             
                             {hasUnsavedChanges && editingPerson && editingPerson.id === person.id && (
                               <div className="flex items-center gap-3">
                                 <span className="text-sm text-orange-600 font-medium">• Alterações não salvas</span>
                                 <button onClick={() => { if (editingPerson) { updatePerson(person.id, editingPerson); setHasUnsavedChanges(false); } }} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">💾 Salvar</button>
                               </div>
                             )}
                           </div>

                          {/* Dados Básicos Tab Content */}
                          {activePersonTab === 'dados' && (
                            // JSX for 'dados' tab (view and edit modes)
                            <div className="space-y-4">
                              {/* ... */}
                            </div>
                          )}

                          {/* Escala & Férias Tab Content */}
                          {activePersonTab === 'escala' && (
                             // JSX for 'escala' tab
                             <div className="space-y-6">
                               {/* ... */}
                             </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PeopleTab;