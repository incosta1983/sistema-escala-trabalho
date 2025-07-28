import React from 'react';
import { Copy, RotateCcw, Users, Edit } from 'lucide-react';
import { templates, statusColors, statusLabels } from '../utils/constants';

const TemplatesTab = (props: any) => {
  const { applyTemplate, copyPreviousWeek } = props;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold mb-4">Templates de Escala</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Aplicar Template</h4>
            <div className="space-y-3 border rounded-lg p-4">
              {Object.entries(templates).map(([key, template]) => (
                <div key={key} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{template.name}</h5>
                    <div className="flex gap-2">
                      <button
                        onClick={() => applyTemplate(key, null, false)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        title="Aplicar template substituindo todas as configurações"
                      >
                        Aplicar
                      </button>
                      {key !== 'manager_rotation' && key !== 'manual' && (
                        <button
                          onClick={() => applyTemplate(key, null, true)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          title="Aplicar template respeitando preferências individuais"
                        >
                          + Preferências
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {key === 'manager_rotation' ? (
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-xs text-purple-600">Gestores</span>
                      </div>
                    ) : key === 'manual' ? (
                      <div className="flex items-center gap-1">
                        <Edit className="w-4 h-4 text-gray-600" />
                        <span className="text-xs text-gray-600">Controle Manual</span>
                      </div>
                    ) : (
                      template.pattern.map((status: string, index: number) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded ${statusColors[status as keyof typeof statusColors]}`}
                          title={statusLabels[status]}
                        ></div>
                      ))
                    )}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {template.description || `Seg - Sex: ${template.pattern.join(' → ')}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Ações Rápidas</h4>
            <div className="space-y-3 border rounded-lg p-4">
              <button
                onClick={copyPreviousWeek}
                className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              >
                <Copy className="w-4 h-4" />
                Replicar 1ª Semana
              </button>
              <button
                onClick={() => applyTemplate('4x1')}
                className="w-full flex items-center gap-2 px-3 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200"
              >
                <RotateCcw className="w-4 h-4" />
                Aplicar 4x1
              </button>
              <button
                onClick={() => applyTemplate('manager_rotation')}
                className="w-full flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
              >
                <Users className="w-4 h-4" />
                Meta de Gestores
              </button>
              <button
                onClick={() => applyTemplate('manual')}
                className="w-full flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
              >
                <Edit className="w-4 h-4" />
                Modo Manual
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesTab;