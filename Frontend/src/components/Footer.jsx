import Logo from '../assets/logo.png'

export default function Footer({ profil }) {
  return (
    <footer className="bg-white text-black pt-10 mt-10 border-yellow-300 border-t-2">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className='mb-10 col-span-2'>
                <img src={Logo} alt="Logo" className="h-12 mb-4"/>
                <p className="mt-2 text-base leading-relaxed">
                    {profil?.deskripsiWO || profil?.aboutWO || "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>
            </div>

            <div className='mb-10 col-span-1 justify-self-center'>
                <h3 className="font-semibold mb-2">Navigasi</h3>
                <ul className="space-y-1 mt-4"> 
                    <li><a href="#about" className="hover:underline">Tentang</a></li>
                    <li><a href="#services" className="hover:underline">Layanan</a></li>
                    <li><a href="#testimoni" className="hover:underline">Ulasan</a></li>
                </ul>
            </div>

            {/* Hubungi Kami */}
            <div className="col-span-1">
                <h3 className="font-semibold mb-2">Hubungi Kami</h3>
                <ul className="space-y-2 text-sm">
                    <li>📍 {profil?.alamatWO || "123 Lenteng, Jakarta, 2231"}</li>
                    <li>📞 {profil?.kontakWO || "+62 123 4567 890"}</li>
                    <li>✉️ {profil?.emailWO || "jewepeweddingt@gmail.com"}</li>
                </ul>
            </div>
        </div>

        {/* Copyright */}
        <div className="bg-yellow-500 text-white text-center py-3 mt-6">
            <div className="max-w-[1200px] mx-auto px-6">
                <p className="mb-2">©Copyright | All Rights Reserved</p>
            </div>
        </div>
    </footer>
  )
}

