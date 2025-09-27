
import { useEffect, useState } from "react";
import { getProfile } from "../api/profileApi";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/navbar";
import About from "../components/About";
import Katalog from "../components/Katalog";
import Footer from "../components/Footer";

export default function LandingPage() {
    
    const [profil, setProfil] = useState(null);
    useEffect(() => {
        getProfile()
          .then(data => {
            setProfil(Array.isArray(data) ? data[0] : data);
          })
          .catch(() => setProfil(null));
    }, []);

    return (
        <div>
            <Navbar/>
            <HeroSection/>
            <About profil={profil}/>
            <Katalog/>
            <Footer profil={profil}/>
        </div>
    )
}