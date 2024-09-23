import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Formulario } from './formulario';
import { TablaUsuarios } from './tablaUsuarios';
import { MensajeExito } from './mensajeExito';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phoneNumber: '', 
    countryCode: '+52',
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [fadeOut, setFadeOut] = useState(false);

  // Cambiar la URL por el endpoint correcto de tu API
  const addUser = async (user) => {
    try {
      const response = await fetch('https://localhost:7177/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber, // Enviamos el número completo
        }), // Enviamos los datos
      });
  
      if (response.ok) {
        const newUser = await response.json();
        console.log('Usuario registrado:', newUser);
        return true; // Indicamos que el usuario fue registrado correctamente
      } else {
        console.error('Error al registrar usuario. Status:', response.status);
        return false;
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combinar el código de país con el número de teléfono
    const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;

    // Crear un nuevo objeto formData con el número completo
    const userFormData = {
      ...formData,
      phoneNumber: fullPhoneNumber,  // Reemplazamos phoneNumber con el número completo
    };

    const isUserAdded = await addUser(userFormData);

    if (isUserAdded) {
      setUserList([...userList, userFormData]);
      setSuccessMessage('Usuario registrado');
      setFadeOut(false);

      setTimeout(() => {
        setFadeOut(true);
      }, 2000);

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      setFormData({ name: '', email: '', message: '', phoneNumber: '', countryCode: '+52' });
    } else {
      setSuccessMessage('Error al registrar el usuario');
    }
  };

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="mb-4 text-center">
          Registro de integrantes <span style={{ color: '#39E2CB', textShadow: '0 0 8px #39E2CB, 0 0 16px #39E2CB' }}>HC</span> Promedical
        </h1>

        <button className="toggle-btn" onClick={toggleForm}>
          {isFormOpen ? 'Ocultar Formulario' : 'Añadir nuevo contacto'}
        </button>

        <Formulario 
          isFormOpen={isFormOpen} 
          handleSubmit={handleSubmit} 
          handleChange={handleChange} 
          formData={formData} 
        />

        <h2 className="mt-4">Usuarios Registrados</h2>
        <TablaUsuarios userList={userList} />

        <MensajeExito successMessage={successMessage} fadeOut={fadeOut} />
      </header>
    </div>
  );
}

export default App;
