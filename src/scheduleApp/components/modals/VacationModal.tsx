import React from 'react';

const VacationModal = (props: any) => {
  const { vacationData, setVacationData, setPersonVacation, vacationPersonId, setShowVacationForm } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Definir Período de Férias</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
              <input
                type="date"
                value={vacationData.start}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVacationData((prev: any) => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data de Fim</label>
              <input
                type="date"
                value={vacationData.end}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVacationData((prev: any) => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setPersonVacation(vacationPersonId, vacationData.start, vacationData.end)}
              className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              disabled={!vacationData.start || !vacationData.end}
            >
              Definir Férias
            </button>
            <button
              onClick={() => setShowVacationForm(false)}
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

export default VacationModal;