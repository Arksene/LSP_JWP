import logo from '../assets/Logo.png'

export default function Navbar() {
    // Fungsi scroll smooth ke id
    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className="fixed bg-white shadow-xl w-full h-12  justify-between flex sm:px-4 rounded z-999">
            <img src={logo} className="h-10 my-auto" alt="Logo"/>
            <ul className="flex gap-4 text-sm mr-8 items-center">
                <li className="text-yellow-600 hover:text-black cursor-pointer"><a onClick={() => scrollToId('hero')}>Home</a></li>
                <li className="text-yellow-600 hover:text-black cursor-pointer"><a onClick={() => scrollToId('about')}>About</a></li>
                <li className="text-yellow-600 hover:text-black cursor-pointer"><a onClick={() => scrollToId('katalog')}>Katalog</a></li>
            </ul>
        </nav>
    )
}
