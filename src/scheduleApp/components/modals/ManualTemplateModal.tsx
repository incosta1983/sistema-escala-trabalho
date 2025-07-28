import React from 'react';

const ManualTemplateModal = (props: any) => {
  const { manualTemplateOption, setManualTemplateOption, executeManualTemplate, setShowManualTemplateModal } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">🎯 Configurar Template Manual</h3>
          <p className="text-sm text-gray-700 font-medium mb-3">Como você quer inicializar as pessoas no calendário?</p>
          
          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="manualOption" value="blank" checked={manualTemplateOption === 'blank'} onChange={(e) => setManualTemplateOption(e.target.value)} className="mt-1"/>
              <div>
                <div className="font-medium">⚫ Deixar em branco</div>
                <div className="text-sm text-gray-600">Você define um por um do zero.</div>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="manualOption" value="all_office" checked={manualTemplateOption === 'all_office'} onChange={(e) => setManualTemplateOption(e.target.value)} className="mt-1"/>
              <div>
                <div className="font-medium">🟢 Iniciar todas como Presencial</div>
                <div className="text-sm text-gray-600">Clique nos nomes para mandar para home office.</div>
              </div>
            </label>
            <label className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input type="radio" name="manualOption" value="all_home" checked={manualTemplateOption === 'all_home'} onChange={(e) => setManualTemplateOption(e.target.value)} className="mt-1"/>
              <div>
                <div className="font-medium">🔵 Iniciar todas como Home Office</div>
                <div className="text-sm text-gray-600">Clique nos nomes para trazer ao escritório.</div>
              </div>
            </label>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => executeManualTemplate(manualTemplateOption)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Aplicar Template
            </button>
            <button
              onClick={() => setShowManualTemplateModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualTemplateModal;