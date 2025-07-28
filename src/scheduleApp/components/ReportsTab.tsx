import React from 'react';
import { getDisplayName } from '../utils/helpers';

const ReportsTab = (props: any) => {
  const {
    reportPeriodMode,
    setReportPeriodMode,
    selectedReportMonth,
    setSelectedReportMonth,
    reportStartDate,
    setReportStartDate,
    reportEndDate,
    setReportEndDate,
    resetToCurrentMonth,
    advancedReportData,
    employees,
    changeHistory
  } = props;

  return (
    <div className="space-y-6">
      {/* Controles de Período */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">📊 Configuração do Período de Análise</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          <div className="lg:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Modo de Análise</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="reportMode" value="month" checked={reportPeriodMode === 'month'} onChange={(e) => setReportPeriodMode(e.target.value)} className="text-blue-600" />
                <span className="text-sm">📅 Mês Específico</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="reportMode" value="custom" checked={reportPeriodMode === 'custom'} onChange={(e) => setReportPeriodMode(e.target.value)} className="text-blue-600" />
                <span className="text-sm">📆 Período Personalizado</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-1">
            {reportPeriodMode === 'month' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mês/Ano</label>
                <input
                  type="month"
                  value={`${selectedReportMonth.getFullYear()}-${String(selectedReportMonth.getMonth() + 1).padStart(2, '0')}`}
                  onChange={(e) => {
                    const [year, month] = e.target.value.split('-');
                    setSelectedReportMonth(new Date(parseInt(year), parseInt(month) - 1, 1));
                  }}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                  <input type="date" value={reportStartDate} onChange={(e) => setReportStartDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data de Fim</label>
                  <input type="date" value={reportEndDate} onChange={(e) => setReportEndDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 flex flex-col justify-end">
            <button onClick={resetToCurrentMonth} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-2">
              🔄 Mês Atual
            </button>
            {advancedReportData.isValidPeriod && (
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                📊 <strong>{advancedReportData.totalWorkdays} dias úteis</strong> no período
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cards de Resumo - Médias */}
      {advancedReportData.isValidPeriod && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">{advancedReportData.averages.office.toFixed(1)}</div>
            <div className="text-sm text-green-700">Média Presencial</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">{advancedReportData.averages.home.toFixed(1)}</div>
            <div className="text-sm text-blue-700">Média Home Office</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">{advancedReportData.averages.vacation.toFixed(1)}</div>
            <div className="text-sm text-orange-700">Média Férias</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-gray-600">{advancedReportData.averages.holiday.toFixed(1)}</div>
            <div className="text-sm text-gray-700">Média Plantão</div>
          </div>
        </div>
      )}

      {/* Estatísticas Individuais */}
      {advancedReportData.isValidPeriod && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold mb-4">Estatísticas Individuais por Pessoa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {Object.values(advancedReportData.personalStats).map((stat: any) => (
              <div key={stat.name} className="p-4 rounded-lg border bg-white">
                <h4 className="font-medium text-sm truncate">{getDisplayName(stat.name)}</h4>
                <div className="text-xs text-gray-600">
                  {employees.find((emp: any) => emp.name === stat.name)?.team || 'Sem equipe'}
                </div>
                <div className="space-y-2 mt-3">
                  <div className="flex justify-between items-center text-xs"><span>🟢 Presencial:</span><span className="font-medium">{stat.office} dias</span></div>
                  <div className="flex justify-between items-center text-xs"><span>🔵 Home Office:</span><span className="font-medium">{stat.home} dias</span></div>
                  {stat.vacation > 0 && <div className="flex justify-between items-center text-xs"><span>🟠 Férias:</span><span className="font-medium">{stat.vacation} dias</span></div>}
                  {stat.holiday > 0 && <div className="flex justify-between items-center text-xs"><span>⚫ Plantão:</span><span className="font-medium">{stat.holiday} dias</span></div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">Histórico de Alterações</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-4">
          {changeHistory.length > 0 ? changeHistory.slice(0, 10).map((change: any) => (
            <div key={change.id} className="flex items-center justify-between p-3 bg-gray-50 rounded text-sm">
              <span>{change.action}</span>
              <span className="text-gray-500">{new Date(change.timestamp).toLocaleString()}</span>
            </div>
          )) : (
            <div className="text-center text-gray-500 py-8">Nenhuma alteração registrada ainda</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;