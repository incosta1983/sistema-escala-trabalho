import React from 'react';
import { Calendar, Filter, AlertTriangle, Edit } from 'lucide-react';
import { getDaysInMonth, dateToString, getDisplayName, getSortedEmployees } from '../utils/helpers';
import { monthNames, weekDays, statusLabels, statusColors } from '../utils/constants';

const CalendarTab = (props: any) => {
  const {
    currentDate,
    setCurrentDate,
    filters,
    setFilters,
    teams,
    employees,
    userRole,
    getOfficeCount,
    maxCapacity,
    toggleHoliday,
    holidays,
    weekendShifts,
    weekendStaff,
    toggleWeekendStaff,
    toggleWeekendShift,
    getFilteredEmployeesForDay,
    getEmployeeStatus,
    setEmployeeStatus,
    holidayStaff,
    toggleHolidayStaff,
  } = props;

  const days = getDaysInMonth(currentDate);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1 max-h-[80vh] overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtros
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colaborador</label>
              <input
                type="text"
                placeholder="Buscar por nome..."
                value={filters.employee}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters((prev: any) => ({ ...prev, employee: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipe</label>
              <select
                value={filters.team}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters((prev: any) => ({ ...prev, team: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Todas as equipes</option>
                {teams.map((team: string) => (
                  <option key={team} value={team}>{team}</option>
                ))}
                <option value="SEM_EQUIPE">Sem equipe</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status Atual</label>
              <select
                value={filters.currentStatus || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters((prev: any) => ({ ...prev, currentStatus: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Todos os status</option>
                <option value="office">🟢 Presencial</option>
                <option value="home">🔵 Home Office</option>
                <option value="vacation">🟠 Férias</option>
                <option value="holiday">⚫ Plantão/Feriado</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Calendar */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-lg shadow-sm p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              ←
            </button>
            <h2 className="text-xl font-semibold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              →
            </button>
          </div>

          <div className="flex gap-6 mb-4 text-sm">
            <div className="flex gap-4">
              {Object.entries(statusLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${statusColors[key]}`}></div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
              <Edit className="w-4 h-4" />
              <span className="text-xs font-medium">💡 Clique nos nomes para alternar</span>
            </div>
            {filters.currentStatus && (
              <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-lg">
                <Filter className="w-4 h-4" />
                <span className="text-xs font-medium">
                  🔍 Filtro ativo: {statusLabels[filters.currentStatus]}
                </span>
              </div>
            )}
          </div>

          {employees.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma pessoa para exibir</h3>
              <p className="text-gray-600">Vá para a aba "Pessoas" para adicionar funcionários ao sistema.</p>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map(day => (
                <div key={day} className="p-2 text-center font-medium text-gray-700 bg-gray-100">
                  {day}
                </div>
              ))}
              
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="p-2 min-h-[200px]"></div>;
                }
                
                const dayOfWeek = day.getDay();
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const dayStr = dateToString(day);
                const officeCount = getOfficeCount(day);
                const isOverCapacity = officeCount > maxCapacity;
                
                if (isWeekend) {
                  return (
                    <div key={index} className="border border-gray-200 min-h-[200px] bg-gray-50">
                      <div className="p-1 text-center text-sm font-medium text-gray-400">
                        {day.getDate()}
                      </div>
                      
                      {weekendShifts[dayStr] ? (
                        <div className="p-4">
                          <div className="text-center text-gray-500 text-sm mb-3">Plantão</div>
                          <div className="text-xs font-medium text-gray-600 mb-2">⚫ Plantão</div>
                          <div className="space-y-1 min-h-[60px] bg-gray-50 p-2 rounded">
                            {getSortedEmployees(getFilteredEmployeesForDay(day)).map((emp: any) => {
                              const isOnDuty = weekendStaff[dayStr]?.includes(emp.id);
                              if (!isOnDuty) return null;
                              
                              return (
                                <div
                                  key={emp.id}
                                  className={`text-xs p-2 rounded transition-all cursor-pointer hover:opacity-80 hover:scale-105 ${
                                    emp.isManager 
                                      ? 'bg-gray-100 text-gray-900 border-2 border-gray-600 font-semibold' 
                                      : 'bg-gray-50 text-gray-800 border-2 border-gray-400 font-medium'
                                  }`}
                                  onClick={() => toggleWeekendStaff(day, emp.id)}
                                  title={`${emp.name} ${emp.isManager ? '(Gestor)' : ''} - Clique para remover do plantão`}
                                >
                                  {getDisplayName(emp.name)}
                                  <span className="ml-1 text-xs opacity-60">✕</span>
                                </div>
                              );
                            })}
                          </div>
                          
                          {userRole !== 'employee' && (
                            <div className="mt-3 space-y-2">
                              <select 
                                className="w-full text-xs p-2 border rounded"
                                onChange={(e) => {
                                  if (e.target.value) {
                                    toggleWeekendStaff(day, parseInt(e.target.value));
                                    e.target.value = '';
                                  }
                                }}
                              >
                                <option value="">+ Adicionar ao plantão</option>
                                {getSortedEmployees(getFilteredEmployeesForDay(day))
                                  .filter((emp: any) => !weekendStaff[dayStr]?.includes(emp.id))
                                  .map((emp: any) => (
                                    <option key={emp.id} value={emp.id}>
                                      {getDisplayName(emp.name)} {emp.isManager ? '(Gestor)' : ''}
                                    </option>
                                  ))
                                }
                              </select>
                              <button
                                onClick={() => toggleWeekendShift(day)}
                                className="w-full text-xs p-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                              >
                                📅 Remover Plantão
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-4 text-center">
                          <div className="text-gray-400 text-xs mb-3">
                            Final de semana
                          </div>
                          {userRole !== 'employee' && (
                            <button
                              onClick={() => toggleWeekendShift(day)}
                              className="text-xs p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                            >
                              📅 Ativar Plantão
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <div key={index} className="border border-gray-200 min-h-[200px]">
                    <div className={`p-1 text-center text-sm font-medium relative ${
                      holidays[dayStr] 
                        ? 'bg-gray-400 text-white' 
                        : isOverCapacity 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-center gap-1">
                        {day.getDate()}
                        {userRole !== 'employee' && (
                          <button
                            onClick={() => toggleHoliday(day)}
                            className={`p-1 rounded hover:bg-opacity-70 ${
                              holidays[dayStr]
                                ? 'text-white hover:bg-gray-600'
                                : 'text-gray-500 hover:bg-gray-200'
                            }`}
                            title={holidays[dayStr] ? 'Remover feriado' : 'Marcar como feriado'}
                          >
                            <Calendar className="w-3 h-3" />
                          </button>
                        )}
                        {isOverCapacity && !holidays[dayStr] && (
                          <AlertTriangle className="w-3 h-3 text-red-600" />
                        )}
                      </div>
                    </div>
                    
                    {holidays[dayStr] ? (
                       <div className="p-4">
                       <div className="text-center text-gray-500 text-sm mb-3">Feriado</div>
                       <div className="text-xs font-medium text-gray-600 mb-2">⚫ Plantão</div>
                       <div className="space-y-1 min-h-[60px] bg-gray-50 p-2 rounded">
                         {getSortedEmployees(getFilteredEmployeesForDay(day)).map((emp: any) => {
                           const isOnDuty = holidayStaff[dayStr]?.includes(emp.id);
                           if (!isOnDuty) return null;
                           
                           return (
                             <div
                               key={emp.id}
                               className={`text-xs p-2 rounded transition-all cursor-pointer hover:opacity-80 hover:scale-105 ${
                                 emp.isManager 
                                   ? 'bg-gray-200 text-gray-900 border-2 border-blue-500 font-semibold shadow-sm' 
                                   : 'bg-gray-100 text-gray-800 border-2 border-blue-400 font-medium shadow-sm'
                               }`}
                               onClick={() => toggleHolidayStaff(day, emp.id)}
                               title={`${emp.name} ${emp.isManager ? '(Gestor)' : ''} - Clique para remover`}
                             >
                               {getDisplayName(emp.name)}
                               <span className="ml-1 text-xs opacity-60">✕</span>
                             </div>
                           );
                         })}
                       </div>
                       
                       {userRole !== 'employee' && (
                         <div className="mt-3">
                           <select 
                             className="w-full text-xs p-2 border rounded"
                             onChange={(e) => {
                               if (e.target.value) {
                                 toggleHolidayStaff(day, parseInt(e.target.value));
                                 e.target.value = '';
                               }
                             }}
                           >
                             <option value="">+ Adicionar ao plantão</option>
                             {getSortedEmployees(getFilteredEmployeesForDay(day))
                               .filter((emp: any) => !holidayStaff[dayStr]?.includes(emp.id))
                               .map((emp: any) => (
                                 <option key={emp.id} value={emp.id}>
                                   {getDisplayName(emp.name)} {emp.isManager ? '(Gestor)' : ''}
                                 </option>
                               ))
                             }
                           </select>
                         </div>
                       )}
                     </div>
                    ) : (
                      <>
                        <div className="p-2">
                          <div className="text-xs font-medium text-gray-600 mb-2">🟢 Presencial</div>
                          <div className="space-y-1 min-h-[60px] bg-green-50 p-2 rounded">
                            {getSortedEmployees(getFilteredEmployeesForDay(day)).map((emp: any) => {
                              const status = getEmployeeStatus(emp.id, day);
                              if (status !== 'office') return null;
                              
                              let borderClass = emp.type === 'always_office' ? 'border-l-4 border-l-green-700' : '';

                              return (
                                <div
                                  key={emp.id}
                                  className={`text-xs p-2 rounded transition-all ${borderClass} ${
                                    userRole !== 'employee' && emp.type === 'variable'
                                      ? 'cursor-pointer hover:opacity-80 hover:scale-105' 
                                      : 'cursor-default'
                                  } ${ emp.isManager ? 'bg-green-100 text-green-900 border-2 border-green-600' : 'bg-green-50 text-green-800 border-2 border-green-400' }`}
                                  onClick={() => userRole !== 'employee' && emp.type === 'variable' && setEmployeeStatus(emp.id, day, 'home')}
                                  title={`${emp.name} ${emp.type === 'variable' ? '- Clique para alternar' : ''}`}
                                >
                                  {getDisplayName(emp.name)}
                                  {userRole !== 'employee' && emp.type === 'variable' && <span className="ml-1 text-xs opacity-60">⇄</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="p-2">
                          <div className="text-xs font-medium text-gray-600 mb-2">🔵 Home Office</div>
                          <div className="space-y-1 min-h-[60px] bg-blue-50 p-2 rounded">
                            {getSortedEmployees(getFilteredEmployeesForDay(day)).map((emp: any) => {
                              const status = getEmployeeStatus(emp.id, day);
                              if (status !== 'home') return null;
                              
                              let borderClass = emp.type === 'always_home' ? 'border-l-4 border-l-blue-700' : '';

                              return (
                                <div
                                  key={emp.id}
                                  className={`text-xs p-2 rounded transition-all ${borderClass} ${
                                    userRole !== 'employee' && emp.type === 'variable'
                                      ? 'cursor-pointer hover:opacity-80 hover:scale-105' 
                                      : 'cursor-default'
                                  } ${ emp.isManager ? 'bg-blue-100 text-blue-900 border-2 border-blue-600' : 'bg-blue-50 text-blue-800 border-2 border-blue-400' }`}
                                  onClick={() => userRole !== 'employee' && emp.type === 'variable' && setEmployeeStatus(emp.id, day, 'office')}
                                  title={`${emp.name} ${emp.type === 'variable' ? '- Clique para alternar' : ''}`}
                                >
                                  {getDisplayName(emp.name)}
                                  {userRole !== 'employee' && emp.type === 'variable' && <span className="ml-1 text-xs opacity-60">⇄</span>}
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="p-2">
                          <div className="text-xs font-medium text-gray-600 mb-2">🟠 Férias</div>
                          <div className="space-y-1 min-h-[40px] bg-orange-50 p-2 rounded">
                            {getSortedEmployees(getFilteredEmployeesForDay(day)).map((emp: any) => {
                              const status = getEmployeeStatus(emp.id, day);
                              if (status !== 'vacation') return null;
                              
                              return (
                                <div key={emp.id}
                                  className={`text-xs p-2 rounded cursor-default ${ emp.isManager ? 'bg-orange-100 text-orange-900 border-2 border-orange-600' : 'bg-orange-50 text-orange-800 border-2 border-orange-400' }`}
                                  title={`${emp.name} - De férias`}
                                >
                                  {getDisplayName(emp.name)}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="p-1 text-xs text-center text-gray-600 border-t">
                          {officeCount}/{maxCapacity} no escritório
                        </div>
                      </>
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

export default CalendarTab;