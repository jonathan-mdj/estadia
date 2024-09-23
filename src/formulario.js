import React from 'react';

export const Formulario = ({ isFormOpen, handleSubmit, handleChange, formData }) => {
  return (
    <div className={`form-container ${isFormOpen ? 'open' : ''}`}>
      <form onSubmit={handleSubmit} className="bg-dark text-light p-4 rounded">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="phoneNumber" className="form-label me-2">Número de Teléfono:</label>
          <select
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="form-select me-2"
            required
          >
            <option value="+52">México (+52)</option>
            <option value="+1">Estados Unidos (+1)</option>
            <option value="+44">Reino Unido (+44)</option>
            <option value="+33">Francia (+33)</option>
          </select>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="form-control"
            placeholder="Número"
            required
          />
        </div>
        <button type="submit" className="custom-btn">Guardar</button>
      </form>
    </div>
  );
};
