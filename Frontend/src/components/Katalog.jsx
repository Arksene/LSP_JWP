import {useState , useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { getAllKatalog } from "../api/katalogApi";

export default function Katalog() {
    const [katalogs, setKatalogs] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        getAllKatalog().then(data => setKatalogs(data)).catch(() => console.log("error"));
    }, []);

    const handleClick = (katalog) => {
        navigate('/order', { state: { paket: katalog.namaKatalog, idKatalog: katalog.id } });
    }

    return (
        <section id="katalog" className="w-full flex flex-col items-center py-12 px-4 bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100">
            <div className="max-w-6xl w-full">
                <h1 className="text-3xl font-extrabold text-yellow-400 mb-8 tracking-wide text-center">Katalog Paket</h1>
                <div className="w-20 h-1 bg-yellow-200 rounded mx-auto mb-10" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {katalogs.map(katalog => (
                        <div key={katalog.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col hover:border-yellow-300 hover:border-2 items-center hover:scale-105 transition-transform duration-300">
                            <img
                                src={katalog.gambar || "https://online.fliphtml5.com/cphkq/zyyt/files/large/2.webp?1613371702&1613371702"}
                                alt={katalog.namaKatalog}
                                className="w-full h-32 object-cover rounded-xl mb-4 border border-gray-300"
                            />
                            <h2 className="text-xl font-bold text-gray-800 mb-2">{katalog.namaKatalog}</h2>
                            <p className="text-gray-600 mb-2 text-center">{katalog.deskripsi}</p>
                            <p className="text-black font-semibold mb-4">Rp {katalog.harga}</p>
                            <button className="px-6 py-2 bg-yellow-400 text-black rounded-full shadow hover:bg-yellow-500 transition-colors duration-200" onClick={() => handleClick(katalog)}>Pesan Sekarang</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}