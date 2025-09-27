export default function HeroSection() {
    return (
            <div id="hero" className="bg-gradient-to-br from-white via-yellow-50 to-white min-h-[320px] pb-10 pt-24 px-4 md:px-6 shadow-xl flex flex-col md:flex-row items-center gap-4 md:gap-0">
            {/* Gambar di kiri */}
            <div className="flex-1 flex justify-end items-center pr-6 relative w-full md:w-auto mb-6 md:mb-0">
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <div className="w-[160px] h-[260px] md:w-[260px] md:h-[480px] rounded-2xl bg-yellow-100 opacity-20 blur-xl"></div>
                </div>
                <img src="https://www.joyweddingorganizer.com/wp-content/uploads/2019/10/Slider3_updated.jpg" alt="Hero" className="relative h-[240px] w-[160px] md:h-[440px] md:w-[400px] rounded-2xl shadow-2xl border-2 border-yellow-200 object-cover z-10 transition-all duration-300"/>
            </div>
            {/* Konten di samping gambar */}
                    <div className="flex-1 flex flex-col justify-center items-start text-left md:pl-0">
                                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-yellow-700 leading-tight drop-shadow-lg">
                                Selamat Datang di <span className="text-yellow-500">Jewepe Wedding</span>
                                </h1>
                                <p className="text-base md:text-lg text-gray-700 mb-6 font-light max-w-md">
                                Temukan kemudahan merancang pernikahan impian Anda bersama tim profesional dan paket terbaik. Layanan elegan, hasil memuaskan.
                                </p>
                                <button className="px-6 py-2 bg-yellow-100 border-2 border-yellow-300 text-yellow-700 font-semibold rounded-full shadow hover:bg-yellow-200 hover:border-yellow-400 transition-all duration-200 text-base backdrop-blur">
                                Mulai Sekarang
                                </button>
                        </div>
        </div>
    )
}