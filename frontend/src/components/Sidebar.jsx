import { useLocation, Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faHomeAlt, faLink, faThumbTack } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    const location = useLocation();

    return (
        <div className="drawer-side">
            <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
            <div className="w-64 bg-base-200 p-2 h-screen">
                <ul className="menu w-full">
                    <li><Link to="/" className={`text-lg font-semibold mb-2 ${location.pathname === "/" ? "active" : ""}`}><FontAwesomeIcon icon={faHomeAlt} className="mr-2" />Home</Link></li>
                    <li><Link to="/links" className={`text-lg font-semibold mb-2 ${location.pathname === "/links" ? "active" : ""}`}><FontAwesomeIcon icon={faLink} className="mr-2" />All Links</Link></li>
                    <li><Link to="/collections" className={`text-lg font-semibold mb-2 ${location.pathname === "/collections" ? "active" : ""}`}><FontAwesomeIcon icon={faFolder} className="mr-2" />Collections</Link></li>
                    <li><Link to="/pinned" className={`text-lg font-semibold ${location.pathname === "/pinned" ? "active" : ""}`}><FontAwesomeIcon icon={faThumbTack} className="mr-2" />Pinned</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
