import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica de validación de usuario
    if (username === "iphonecase" && password === "15promax") {
      onLogin(true); // Si las credenciales son correctas, actualiza el estado de autenticación
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-80'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className='mb-4'>
            <label className='block mb-1'>Usuario</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-1'>Contraseña</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded'
              required
            />
          </div>
          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
          <button
            type='submit'
            className='w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600'
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
