import React, { useState } from 'react'

function SignIn({ setIsAuthenticated }) {
    const [credentials, setCredentials] = useState({ email: "admin@shiva.com", password: "" });
    const [loginError, setLoginError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = credentials;
      
        // Login simple, podés cambiarlo a una API real después
        if (email === "admin@shiva.com" && password === "14640318") {
          setIsAuthenticated(true);
          setLoginError("");
        } else {
          setLoginError("Credenciales incorrectas");
        }
      };

    return (
        <div>
<form
    onSubmit={handleLogin}
    className="flex flex-col gap-4 p-8 border rounded-lg shadow max-w-sm mx-auto mt-10"
  >
    <h2 className="text-xl font-bold text-center">Iniciar sesión</h2>
{/* 
    <input
      type="email"
      placeholder="Email"
      value={credentials.email}
      onChange={(e) =>
        setCredentials({ ...credentials, email: e.target.value })
      }
      className="w-full px-4 py-2 border border-gray-300 rounded-md"
      required
    /> */}

    <input
      type="password"
      placeholder="Contraseña"
      value={credentials.password}
      onChange={(e) =>
        setCredentials({ ...credentials, password: e.target.value })
      }
      className="w-full px-4 py-2 border border-gray-300 rounded-md"
      required
    />

    <button
      type="submit"
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Ingresar
    </button>

    {loginError && <p className="text-red-600 text-center">{loginError}</p>}
  </form>

        </div>
    )
}

export default SignIn