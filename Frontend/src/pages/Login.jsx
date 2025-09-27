import { use, useState } from "react";
import { login } from "../api/loginApi";
import { alertError, alertSuccess } from "../lib/alerts";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      if (response && response.token) {
        localStorage.setItem('token', response.token);
      }
      alertSuccess("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error.message)
      alertError(error.message);
    }
  }


  return (
  <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-green-400 to-green-900">
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-3xl shadow-2xl w-80 border-4 border-green-600 transition-all duration-300 hover:scale-102"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-green-700 text-center drop-shadow font-serif">Login</h2>
          <label className="block mb-2 font-semibold text-green-700 font-serif">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="border-2 border-green-600 p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition bg-white text-green-700 placeholder-green-300 font-serif"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <label className="block mb-2 font-semibold text-green-700 font-serif">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-green-600 p-2 mb-6 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition bg-white text-green-700 placeholder-green-300 font-serif"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-green-400 to-green-900 text-white font-bold py-2 w-full rounded-xl shadow-md transition-all duration-200 font-serif hover:from-green-500 hover:to-green-700"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-white text-sm font-serif">Belum punya akun? <Link to="/admin/register" className="text-white font-semibold cursor-pointer hover:underline">Daftar</Link></p>
      </div>
    </div>
  );
}