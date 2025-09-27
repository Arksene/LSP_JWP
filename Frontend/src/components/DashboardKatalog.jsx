import { useState, useEffect } from "react";
import { getAllKatalog, createKatalog, deleteKatalog, updateKatalog } from "../api/katalogApi";

export default function DashboardKatalog() {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    getAllKatalog().then(data => setItems(data)).catch(() => setItems([]));
  }, []);

  const handleEdit = async (item) => {
    setEditId(item.id);
    setNama(item.namaKatalog ?? "");
    setHarga(item.harga ?? "");
    setDeskripsi(item.deskripsi ?? "");
  };

  const handleDelete = async (id) => {
    setItems(items.filter(item => item.id !== id));
    console.log(items)
    await deleteKatalog(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nama") setNama(value);
    if (name === "harga") setHarga(value);
    if (name === "deskripsi") setDeskripsi(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId !== null) {
      await updateKatalog(editId, { namaKatalog:nama, harga, deskripsi });
      const data = await getAllKatalog();
      setItems(data);
      setEditId(null);
    } else {
      const newKatalog = { namaKatalog: nama, harga: Number(harga), deskripsi };
      await createKatalog(newKatalog);
      const data = await getAllKatalog();
      setItems(data);
    }
    setNama("");
    setHarga("");
    setDeskripsi("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl border-2 border-green-400">
      <h2 className="text-2xl font-extrabold mb-6 text-green-700 text-center tracking-wide font-serif">Tambah Katalog</h2>
      <form onSubmit={handleSubmit} className="mb-8 bg-green-50 rounded-2xl shadow p-6 border border-green-100">
        <div className="flex flex-col md:flex-row gap-6 mb-4">
          <div className="flex-1">
            <label className="font-semibold text-green-700 font-serif">Nama Barang:</label>
            <input
              type="text"
              name="nama"
              placeholder="Nama Barang"
              value={nama}
              onChange={handleChange}
              className="border-2 border-green-400 p-2 rounded-lg w-full mb-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-700 placeholder-green-300 font-serif"
              required
            />
          </div>
          <div className="flex-1">
            <label className="font-semibold text-green-700 font-serif">Harga:</label>
            <input
              type="number"
              name="harga"
              placeholder="Harga"
              value={harga}
              onChange={handleChange}
              className="border-2 border-green-400 p-2 rounded-lg w-full mb-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-700 placeholder-green-300 font-serif"
              required
            />
          </div>
        </div>
        <label className="font-semibold text-green-700 font-serif">Deskripsi:</label>
        <textarea
          name="deskripsi"
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={handleChange}
          className="border-2 border-green-400 p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-700 placeholder-green-300 font-serif"
          required
        />
        <button type="submit" className="bg-gradient-to-br from-green-400 to-green-900 text-white px-6 py-2 rounded-xl font-bold w-full shadow hover:from-green-500 hover:to-green-700 transition-all duration-200 font-serif">
          {editId !== null ? "Update" : "Tambah"}
        </button>
      </form>
      <div className="mb-6 bg-green-700 w-full h-1" > </div>
      <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-700 text-center tracking-wide font-serif">Edit / Hapus Katalog</h2>
        <table className="w-full border rounded-xl overflow-hidden text-sm shadow bg-green-50 text-green-700 font-serif">
          <thead className="bg-green-700 text-green-200">
            <tr>
              <th className="border px-4 py-2">Nama</th>
              <th className="border px-4 py-2">Harga</th>
              <th className="border px-4 py-2">Deskripsi</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="hover:bg-green-200 transition">
                <td className="border px-4 py-2 font-semibold text-green-800">{item.namaKatalog}</td>
                <td className="border px-4 py-2 text-green-700 font-bold">Rp. {item.harga}</td>
                <td className="border px-4 py-2 text-green-700">{item.deskripsi}</td>
                <td className="border px-4 py-2 flex gap-2 justify-center">
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg font-semibold shadow transition font-serif" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-lg font-semibold shadow transition font-serif" onClick={() => handleDelete(item.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
