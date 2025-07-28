import React from 'react';

const ImportModal = (props: any) => {
  const { importText, setImportText, importEmployees, setShowImportModal } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">📋 Importar Lista de Pessoas</h3>
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Como usar:</strong> Cole ou digite um nome por linha. Todos serão criados como "Presença Variável".
            </p>
          </div>
          
          <textarea
            value={importText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setImportText(e.target.value)}
            placeholder="João da Silva\nMaria Santos\nPedro Oliveira"
            className="w-full px-3 py-2 border rounded-lg h-40"
          />
          <div className="text-xs text-gray-500 mt-1">
            {importText.trim() ? `${importText.trim().split('\n').filter(n => n.trim()).length} pessoas para importar` : 'Nenhuma pessoa para importar'}
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={importEmployees}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              disabled={!importText.trim()}
            >
              ✅ Importar Pessoas
            </button>
            <button
              onClick={() => setShowImportModal(false)}
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

export default ImportModal;