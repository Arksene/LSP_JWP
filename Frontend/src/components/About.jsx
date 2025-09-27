export default function About({ profil }) {
    return (
        <section id="about" className="w-full flex justify-center py-12 px-4">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-gray-100">
                <h1 className="text-3xl font-extrabold text-yellow-400 mb-4 tracking-wide">Tentang Kami</h1>
                <div className="w-16 h-1 bg-yellow-200 rounded mb-6" />
                <p className="text-gray-700 text-lg leading-relaxed">
                    {profil?.aboutWO || profil?.deskripsiWO || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>
                <div className="mt-6 text-gray-500 text-sm">
                  {profil?.alamatWO && (<div><b>Alamat:</b> {profil.alamatWO}</div>)}
                  {profil?.kontakWO && (<div><b>Kontak:</b> {profil.kontakWO}</div>)}
                </div>
            </div>
        </section>
    )
}