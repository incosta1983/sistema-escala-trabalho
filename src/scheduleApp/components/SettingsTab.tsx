import React from 'react';
import { RotateCcw } from 'lucide-react';

const SettingsTab = (props: any) => {
  const { startNewSchedule, maxCapacity, setMaxCapacity, userRole } = props;

  return (
    <div className="space-y-6">
      <div className="bg-red-50 border-2 border-red-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">🔄 Iniciar Nova Escala</h3>
            <p className="text-sm text-red-700 mb-1">
              <strong>⚠️ CUIDADO:</strong> Reset completo do sistema!
            </p>
            <p className="text-xs text-red-600">
              Remove TODAS as pessoas e limpa todas as escalas.
            </p>
          </div>
          <button
            onClick={startNewSchedule}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold border-2 border-red-800 transition-all hover:scale-105"
            disabled={userRole === 'employee'}
          >
            <RotateCcw className="w-5 h-5" />
            Iniciar Nova Escala
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">Configurações do Sistema</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 text-blue-600 mt-0.5">ℹ️</div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Sistema de Metas Atualizado</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <div>• <strong>Meta presencial:</strong> Sempre respeitada (prioridade absoluta)</div>
                <div>• <strong>Capacidade máxima:</strong> Apenas indicador visual - não limita</div>
                <div>• <strong>Superlotação:</strong> Fundo vermelho no calendário quando exceder</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Capacidade e Metas</h4>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacidade Máxima do Escritório (Indicador Visual)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={maxCapacity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxCapacity(Number(e.target.value))}
                className="flex-1 px-3 py-2 border rounded-lg"
                min="1"
              />
              <span className="text-sm text-gray-600">pessoas</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              📊 Apenas para alerta visual - não limita a meta presencial
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;