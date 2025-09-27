import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../api/profileApi";

export default function DashboardProfile() {
  const [about, setAbout] = useState("");
  const [alamat, setAlamat] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [contact, setContact] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getProfile()
      .then(data => {
        console.log(data);
        setAbout(data[0]?.aboutWO || "");
        setAlamat(data[0]?.alamatWO || "");
        setDeskripsi(data[0]?.deskripsiWO || "");
        setContact(data[0]?.kontakWO || "");
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "about") setAbout(value);
    if (name === "alamat") setAlamat(value);
    if (name === "deskripsi") setDeskripsi(value);
    if (name === "contact") setContact(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await updateProfile({ aboutWO: about, alamatWO: alamat, deskripsiWO: deskripsi, kontakWO: contact });
      setSuccess("Profil berhasil diperbarui!");
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center py-10 text-green-700">Memuat data profil...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl border-2 border-green-400">
      <h2 className="text-2xl font-extrabold mb-6 text-green-700 text-center tracking-wide font-serif">Edit Profile Website</h2>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
      {!editMode ? (
        <div className="space-y-6">
          <div>
            <span className="block text-green-700 font-semibold mb-1">Tentang WO:</span>
            <span className="block text-green-900 bg-green-50 rounded-lg p-2 font-serif">{about}</span>
          </div>
          <div>
            <span className="block text-green-700 font-semibold mb-1">Alamat WO:</span>
            <span className="block text-green-900 bg-green-50 rounded-lg p-2 font-serif">{alamat}</span>
          </div>
          <div>
            <span className="block text-green-700 font-semibold mb-1">Deskripsi WO:</span>
            <span className="block text-green-900 bg-green-50 rounded-lg p-2 font-serif">{deskripsi}</span>
          </div>
          <div>
            <span className="block text-green-700 font-semibold mb-1">Kontak WO:</span>
            <span className="block text-green-900 bg-green-50 rounded-lg p-2 font-serif">{contact}</span>
          </div>
          <button
            className="mt-6 w-full py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-bold shadow hover:from-green-600 hover:to-green-800 transition font-serif text-lg border-2 border-green-200"
            onClick={() => setEditMode(true)}
          >Edit Profil</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-green-700 font-semibold mb-1" htmlFor="about">Tentang WO:</label>
            <input
              type="text"
              id="about"
              name="about"
              value={about}
              onChange={handleChange}
              className="border-2 border-green-400 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-700 placeholder-green-300 font-serif"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 font-semibold mb-1" htmlFor="alamat">Alamat WO:</label>
            <input
              type="text"
              id="alamat"
              name="alamat"
              value={alamat}
              onChange={handleChange}
              className="border-2 border-green-400 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-700 placeholder-green-300 font-serif"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 font-semibold mb-1" htmlFor="deskripsi">Deskripsi WO:</label>
            <input
              type="text"
              id="deskripsi"
              name="deskripsi"
              value={deskripsi}
              onChange={handleChange}
              className="border-2 border-green-400 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-700 placeholder-green-300 font-serif"
              required
            />
          </div>
          <div>
            <label className="block text-green-700 font-semibold mb-1" htmlFor="contact">Kontak WO:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={contact}
              onChange={handleChange}
              className="border-2 border-green-400 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-300 bg-white text-green-700 placeholder-green-300 font-serif"
              required
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-bold shadow hover:from-green-600 hover:to-green-800 transition font-serif text-lg border-2 border-green-200"
            >Simpan</button>
            <button
              type="button"
              className="flex-1 py-2 rounded-xl bg-gray-200 text-green-700 font-bold shadow hover:bg-gray-300 transition font-serif text-lg border-2 border-green-200"
              onClick={() => setEditMode(false)}
            >Batal</button>
          </div>
        </form>
      )}
    </div>
  );
}
