import React, { useState } from "react";

export default function Test_components() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setUsers([...users, formData]);
      setFormData({
        name: "",
        email: "",
      });
    }
  };

  return (
    <div className="my-4 w-4/5 h-auto border border-1 p-3 mx-auto rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Ajouter un utilisateur</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Nom</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Entrez le nom"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Entrez l\'email"
            className="input input-bordered"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Ajouter
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Liste des utilisateurs</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
