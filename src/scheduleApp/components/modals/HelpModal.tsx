import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const HelpModal = (props: any) => {
  const { setShowHelp, activeHelpTab, setActiveHelpTab } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h3 className="text-xl font-semibold">📚 Ajuda e Legendas</h3>
          <button onClick={() => setShowHelp(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-1 px-6 pt-4 border-b bg-gray-50">
          <button onClick={() => setActiveHelpTab('basico')} className={`px-4 py-2 rounded-t-lg text-sm font-medium ${activeHelpTab === 'basico' ? 'bg-white text-blue-600' : 'text-gray-600'}`}>🎯 Básico</button>
          <button onClick={() => setActiveHelpTab('funcionalidades')} className={`px-4 py-2 rounded-t-lg text-sm font-medium ${activeHelpTab === 'funcionalidades' ? 'bg-white text-blue-600' : 'text-gray-600'}`}>⚙️ Funcionalidades</button>
          <button onClick={() => setActiveHelpTab('dicas')} className={`px-4 py-2 rounded-t-lg text-sm font-medium ${activeHelpTab === 'dicas' ? 'bg-white text-blue-600' : 'text-gray-600'}`}>💡 Dicas</button>
        </div>

        <div className="p-6 overflow-y-auto">
          {activeHelpTab === 'basico' && (
            <div className="space-y-6">
              {/* Content for 'basico' tab */}
              <p>Explicações sobre perfis, status, cores e regimes de trabalho.</p>
            </div>
          )}
          {activeHelpTab === 'funcionalidades' && (
            <div className="space-y-6">
              {/* Content for 'funcionalidades' tab */}
              <p>Detalhes sobre templates, filtros e importação.</p>
            </div>
          )}
          {activeHelpTab === 'dicas' && (
             <div className="space-y-6">
              {/* Content for 'dicas' tab */}
              <p>Indicadores visuais, atalhos e melhores práticas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpModal;