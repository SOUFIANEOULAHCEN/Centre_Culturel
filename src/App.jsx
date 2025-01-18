import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [table, setTable] = useState('utilisateur');
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiUrl = 'http://localhost/Backend/api.php';

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}?table=${table}`);
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [table]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async () => {
    try {
      await axios.post(`${apiUrl}?table=${table}`, form);
      fetchData();
      setForm({});
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${apiUrl}?table=${table}&id=${selectedId}`, form);
      fetchData();
      setForm({});
      setSelectedId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}?table=${table}&id=${id}`);
      fetchData();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleSelect = (item) => {
    setForm(item);
    setSelectedId(item.idUser || item.idAdmin || item.idReserve || item.idEvent);
    setIsModalOpen(true);
  };

  const openModal = () => {
    setForm({});
    setSelectedId(null);
    setIsModalOpen(true);
  };

  const getFormFields = () => {
    switch (table) {
      case 'utilisateur':
        return ['nom', 'prenom', 'email', 'MotDePass'];
      case 'administrateur':
        return ['nom', 'prenom', 'email', 'MotDePass'];
      case 'reservations':
        return ['titre', 'Description', 'dateDebut', 'dateFin', 'statut', 'flyer', 'idUser'];
      case 'evenements':
        return ['idReserve', 'idUser'];
      default:
        return [];
    }
  };

  return (
    <div className="App p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Gestion de la base de données Complexe</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Table: </label>
        <select
          value={table}
          onChange={(e) => setTable(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="utilisateur">Utilisateur</option>
          <option value="administrateur">Administrateur</option>
          <option value="reservations">Reservations</option>
          <option value="evenements">Evenements</option>
        </select>
      </div>

      <button
        onClick={openModal}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Ajouter
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {selectedId ? 'Modifier' : 'Ajouter'}
            </h2>
            {getFormFields().map((key) => (
              <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  {key}:
                </label>
                <input
                  type="text"
                  name={key}
                  value={form[key] || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={selectedId ? handleUpdate : handleAdd}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                {selectedId ? 'Mettre à jour' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-4 py-2 border-b">
                    {key}
                  </th>
                ))}
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.idUser || item.idAdmin || item.idReserve || item.idEvent}>
                {Object.values(item).map((value, index) => (
                  <td key={index} className="px-4 py-2 border-b">
                    {value}
                  </td>
                ))}
                <td className="px-4 py-2 border-b">
                  <button
                    onClick={() => handleSelect(item)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(item.idUser || item.idAdmin || item.idReserve || item.idEvent)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;