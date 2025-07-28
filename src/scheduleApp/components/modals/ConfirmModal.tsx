import React from 'react';

const ConfirmModal = (props: any) => {
  const { confirmModalData } = props;
  const { title, message, onConfirm, onCancel, confirmText, cancelText, type } = confirmModalData;

  // Não renderiza nada se não houver dados
  if (!title) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${
              type === 'danger' ? 'bg-red-100 text-red-600' :
              type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {type === 'danger' ? '⚠️' : type === 'warning' ? '❓' : 'ℹ️'}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 whitespace-pre-line">{message}</p>
          </div>
          
          <div className="flex gap-3">
            {cancelText && (
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                {cancelText}
              </button>
            )}
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors font-medium ${
                type === 'danger' 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;