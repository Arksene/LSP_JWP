import React, { useState } from "react";

export default function Sidebar({currentPath, setCurrentPath}) {
  const [open, setOpen] = useState(false);

  return (
    <>
  <nav className="bg-green-700 text-green-50 w-full h-14 flex items-center p-4 top-0 left-0 z-40 fixed shadow-lg">
        <button
          className="md:hidden p-2 rounded bg-gray-800 mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Sidebar"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="5" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
            <rect y="17" width="24" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-bold md:ml-56  ">DASHBOARD ADMIN</h1>
        </div>
      </nav>

      <aside
        className={`h-screen w-56 bg-green-50 border-r-2 border-r-green-400 text-green-900 shadow-xl flex flex-col fixed left-0 top-0 z-30 pt-12 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-4">
            <li>
              <button
                className={`w-full text-left block px-3 py-2 rounded-xl font-serif text-lg transition border-2 ${currentPath === "profil" ? "bg-white text-green-700 border-green-300 shadow-lg" : "bg-green-700 text-white hover:bg-green-300 hover:text-green-700 border-green-100"}`}
                onClick={() => setCurrentPath("profil")}
              >Profil</button>
            </li>
            <li>
              <button
                className={`w-full text-left block px-3 py-2 rounded-xl font-serif text-lg transition border-2 ${currentPath === "katalog" ? "bg-white text-green-700 border-green-300 shadow-lg" : "bg-green-700 text-white hover:bg-green-200 hover:text-green-700 border-green-100"}`}
                onClick={() => setCurrentPath("katalog")}
              >Katalog</button>
            </li>
            <li>
              <button
                className={`w-full text-left block px-3 py-2 rounded-xl font-serif text-lg transition border-2 ${currentPath === "order" ? "bg-white text-green-700 border-green-300 shadow-lg" : "bg-green-700 text-white hover:bg-green-300 hover:text-green-700 border-green-100"}`}
                onClick={() => setCurrentPath("order")}
              >Order</button>
            </li>
          </ul>
        </nav>
        <div className="px-4 pb-6 mt-auto">
          <button
            className="w-full py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-bold shadow hover:from-green-600 hover:to-green-800 transition font-serif text-lg border-2 border-green-200"
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
          >Logout</button>
        </div>
      </aside>
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
