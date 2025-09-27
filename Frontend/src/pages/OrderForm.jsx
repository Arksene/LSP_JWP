import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createOrder } from "../api/orderApi";
import { confirmAlert, alertSuccess } from "../lib/alerts";

export default function OrderForm({ katalog }) {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [nama, setNama] = useState("");
  const [pilihanKatalog, setPilihanKatalog] = useState(location.state?.paket || "");
  const [idKatalog, setIdKatalog] = useState(location.state?.idKatalog || "");
  const [alamat, setAlamat] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [status] = useState("Pending");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const confirmed = await confirmAlert("Apakah data yang Anda masukkan sudah benar?");
    if (confirmed.isConfirmed) {
      setLoading(false);
      try {
        // Gabung tanggal dan jam jadi ISO-8601
        let isoTanggal = "";
        if (tanggal && jam) {
          isoTanggal = `${tanggal}T${jam}:00.000Z`;
        } else if (tanggal) {
          isoTanggal = `${tanggal}T00:00:00.000Z`;
        }
        const orderData = {
          email,
          tanggal: isoTanggal,
          nama,
          pilihanKatalog,
          idKatalog,
          alamat,
          nomorTelepon,
          status,
        };
        await createOrder(orderData);
        alertSuccess("Order berhasil dikirim!, Cek email secara berkala!");
        setEmail(""); setTanggal(""); setJam(""); setNama(""); setPilihanKatalog(""); setIdKatalog(""); setAlamat(""); setNomorTelepon("");
        navigate("/");
        } catch (err) {
        setError("Gagal mengirim order. Silakan coba lagi.");
        }
    }else {
        setLoading(false);
    }

    setLoading(false);
  };

  return (
    <section className="w-full flex justify-center py-12 px-4 bg-white">
      <form className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-4 border border-gray-100" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-yellow-600 mb-2">Formulir Pemesanan</h2>
        <button className="self-start py-2 px-6 bg-yellow-400 text-white hover:bg-yellow-500 rounded-2xl" type="button" onClick={() => navigate("/")}>﹤ Kembali</button>
        <input type="email" className="border rounded px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="text" className="border rounded px-3 py-2" placeholder="Nama Lengkap" value={nama} onChange={e => setNama(e.target.value)} required />
        <input type="text" className="border rounded px-3 py-2" placeholder="Alamat" value={alamat} onChange={e => setAlamat(e.target.value)} required />
        <input type="text" className="border rounded px-3 py-2" placeholder="Nomor Telepon" value={nomorTelepon} onChange={e => setNomorTelepon(e.target.value)} required />
        <input type="text" className="border rounded px-3 py-2" placeholder="Paket Pilihan" value={pilihanKatalog} onChange={e => setPilihanKatalog(e.target.value)} required />
        <input type="text" className="border rounded px-3 py-2" placeholder="ID Katalog" value={idKatalog} onChange={e => setIdKatalog(e.target.value)} required />
        <div className="flex gap-2">
          <input type="date" className="border rounded px-3 py-2 w-1/2" value={tanggal} onChange={e => setTanggal(e.target.value)} required />
          <input type="time" className="border rounded px-3 py-2 w-1/2" value={jam} onChange={e => setJam(e.target.value)} required />
        </div>
        <input type="hidden" value={status} />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="px-6 py-2 bg-yellow-400 text-white font-semibold rounded-full shadow hover:bg-yellow-500 transition-all duration-200" disabled={loading}>
          {loading ? "Mengirim..." : "Kirim Pesanan"}
        </button>
      </form>
    </section>
  );
}
