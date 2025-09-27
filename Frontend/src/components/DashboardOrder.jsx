import { useEffect, useState } from "react";
import { getAllOrder, updateOrder } from "../api/orderApi";

export default function DashboardOrder() {
  const [orders, setOrders] = useState([]);
  const [openDetailIndex, setOpenDetailIndex] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    getAllOrder()
      .then(data => {
        console.log(data);
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const toggleDetail = idx => {
    setOpenDetailIndex(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
    setSuccess("");
    setError("");
  };

  const handleApprove = async (orderId) => {
    setApproving(true);
    setError("");
    setSuccess("");
    try {
      await updateOrder(orderId, { status: "approve" });
      setSuccess("Order berhasil di-approve!");
      const data = await getAllOrder();
      setOrders(data);
      setOpenDetailIndex({}); // tutup semua detail setelah approve
    } catch (err) {
      setError(err.message);
    }
    setApproving(false);
  };

  if (loading) return <div className="text-center py-10 text-green-700">Memuat data order...</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-3xl shadow-2xl border-2 border-green-400">
      <h2 className="text-2xl font-extrabold mb-6 text-green-700 text-center tracking-wide font-serif">Order Masuk</h2>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
      <div className="space-y-4">
        {orders.length === 0 && <div className="text-center text-green-700">Belum ada order masuk.</div>}
        {orders.map((order, idx) => {
          const isOpen = openDetailIndex[idx];
          return (
            <div key={order.id} className="border border-green-200 rounded-xl bg-green-50 overflow-hidden">
              <div className="p-4 hover:bg-green-100 transition-colors flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-green-900">{order.nama}</span>
                  <span className="text-xs text-green-600">{order.tanggal ? new Date(order.tanggal).toLocaleDateString() : ''}</span>
                  <span className="text-xs text-green-600">Status: {order.status}</span>
                </div>
                <button
                  className="ml-4 p-2 hover:bg-green-200 rounded-lg transition-colors"
                  onClick={() => toggleDetail(idx)}
                >
                  {isOpen ? "▲" : "▼"}
                </button>
              </div>
              {/* Detail Card */}
              {isOpen && (
                <div className="border-t border-green-200 bg-white p-4">
                  <div className="space-y-2">
                    <div><span className="font-semibold">Nama:</span> {order.nama}</div>
                    <div><span className="font-semibold">Email:</span> {order.email}</div>
                    <div><span className="font-semibold">No. Telepon:</span> {order.nomorTelepon}</div>
                    <div><span className="font-semibold">Alamat:</span> {order.alamat}</div>
                    <div><span className="font-semibold">Katalog:</span> {order.pilihanKatalog}</div>
                    <div><span className="font-semibold">Status:</span> {order.status}</div>
                    <div><span className="font-semibold">Tanggal:</span> {order.tanggal ? new Date(order.tanggal).toLocaleDateString() : ''}</div>
                    <div><span className="font-semibold">Dibuat:</span> {order.created_at ? new Date(order.created_at).toLocaleString() : ''}</div>
                    <div><span className="font-semibold">Diupdate:</span> {order.updated_at ? new Date(order.updated_at).toLocaleString() : ''}</div>
                  </div>
                  <button
                    className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-700 text-white font-bold shadow hover:from-green-600 hover:to-green-800 transition font-serif text-lg border-2 border-green-200"
                    onClick={() => handleApprove(order.id)}
                    disabled={approving || order.status.toLowerCase() === "approve"}
                  >
                    {order.status.toLowerCase() === "approve" ? "Sudah Di-approve" : (approving ? "Memproses..." : "Approve Order")}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
