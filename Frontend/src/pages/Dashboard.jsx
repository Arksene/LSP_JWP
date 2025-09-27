import Sidebar from "../components/Sidebar";
import { useState } from "react";
import DashboardKatalog from "../components/DashboardKatalog";
import DashboardProfile from "../components/DashboardProfile";
import DashboardOrder from "../components/DashboardOrder";

export default function Dashboard() {
    const [currentPath, setCurrentPath] = useState("katalog");
    
    return (
        <>
            <Sidebar currentPath={currentPath} setCurrentPath={setCurrentPath} />
            <div className="ml-56 pt-20">
                {currentPath === "katalog" && (
                    <div>
                        <DashboardKatalog />
                    </div>
                    )}
                {currentPath === "profil" && (
                    <div>
                        <DashboardProfile />
                    </div>
                )}
                {currentPath === "order" && (
                    <div>
                        <DashboardOrder />
                    </div>
                )}
            </div>
        </>
    );
}