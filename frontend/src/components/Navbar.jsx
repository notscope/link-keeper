import NewLinkModal from "./NewLinkModal"
import NewCollectionModal from "./NewCollectionModal"
import { useState, useEffect } from "react";
import api from "../api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navbar({ onLinkCreated, onCollectionCreated }) {
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        getCurrentUser();
    }, [])

    const getCurrentUser = () => {
        api.get("/api/current-user/")
        .then((res) => res.data)
        .then((data) => {
            setCurrentUser(data.username);
            console.log(data);
        })
        .catch((err) => alert(err));
    }

    return (
        <div className="navbar bg-base-200 shadow-md px-4">
            <div className="navbar-start">
                <div className="md:hidden">
                    <label htmlFor="drawer-toggle" className="btn btn-squre btn-ghost" aria-label="Open sidebar">
                        <FontAwesomeIcon icon={faBars} />
                    </label>
                </div>

                {/* Logo */}
                <div className="">
                    <Link to="/" className="btn btn-ghost text-xl">MyApp</Link>
                </div>
            </div>

            {/* Button Dropdown */}
            <div className="navbar-end">
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li className="font-bold"><a onClick={()=>document.getElementById('NewLinkModal').showModal()}><FontAwesomeIcon icon={faPlus} />Link</a></li>
                        <NewLinkModal onLinkCreated={onLinkCreated} />
                        <li className="font-bold"><a onClick={()=>document.getElementById('NewCollectionModal').showModal()}><FontAwesomeIcon icon={faPlus} />Collection</a></li>
                        <NewCollectionModal onCollectionCreated={onCollectionCreated} />
                    </ul>
                </div>

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar placeholder" aria-haspopup="true" aria-expanded="false">
                        <div className="bg-neutral text-neutral-content w-10 rounded-full">
                            <span>D</span>
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a className="justify-between">Profile<span className="badge">New</span></a></li>
                        <li><a>Settings</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar