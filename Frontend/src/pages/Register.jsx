import { useState } from "react";
import { register } from "../api/loginApi";
import { alertError } from "../lib/alerts";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
    
    try {
      await register({ username, email, password });
      navigate("/admin");
    } catch (error) {
      alertError(error.message);
    }
  };

  return (
  <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-green-400 to-green-900">
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-3xl shadow-2xl w-[400px] border-2 border-green-600 transition-all duration-300 hover:scale-102"
        >
          <h2 className="text-3xl font-extrabold mb-6 text-green-700 text-center drop-shadow font-serif">Register</h2>
          <label className="block mb-2 font-semibold text-green-700 font-serif">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="border-2 border-green-600 p-2 mb-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition bg-white text-green-700 placeholder-green-300 font-serif"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <label className="block mb-2 font-semibold text-green-700 font-serif">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border-2 border-green-600 p-2 mb-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition bg-white text-green-700 placeholder-green-300 font-serif"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block mb-2 font-semibold text-green-700 font-serif">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border-2 border-green-600 p-2 mb-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition bg-white text-green-700 placeholder-green-300 font-serif"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="block mb-2 font-semibold text-green-700 font-serif">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="border-2 border-green-600 p-2 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition bg-white text-green-700 placeholder-green-300 font-serif"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-green-400 to-green-900 text-white font-bold py-2 w-full rounded-xl shadow-md transition-all duration-200 font-serif hover:from-green-500 hover:to-green-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-white text-sm font-serif">Sudah punya akun? <Link to="/admin" className="text-white font-semibold cursor-pointer hover:underline">Login</Link></p>
      </div>
    </div>
  );
}
