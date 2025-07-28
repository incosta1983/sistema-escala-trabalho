import React from 'react';

const AddEmployeeModal = (props: any) => {
  const { newEmployee, setNewEmployee, addEmployee, setShowAddEmployee } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Adicionar Nova Pessoa</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nome completo"
              value={newEmployee.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEmployee((prev: any) => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Equipe"
              value={newEmployee.team}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEmployee((prev: any) => ({ ...prev, team: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
            />
            <select
              value={newEmployee.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewEmployee((prev: any) => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="variable">Presença Variável</option>
              <option value="always_office">Sempre Presencial</option>
              <option value="always_home">Sempre Home Office</option>
            </select>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={newEmployee.isManager}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEmployee((prev: any) => ({ ...prev, isManager: e.target.checked }))}
              />
              <span className="text-sm">Gestor</span>
            </label>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={addEmployee}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Adicionar
            </button>
            <button
              onClick={() => setShowAddEmployee(false)}
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

export default AddEmployeeModal;