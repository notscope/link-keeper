import { useState, useEffect } from "react";
import api from "../api";
import LinkItem from "../components/LinkItem";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import Toast from "../components/Toast";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCircleInfo, faClock, faFolder, faHomeAlt, faHouse, faInfo, faLink, faPlus, faThumbTack } from "@fortawesome/free-solid-svg-icons";

function LinkList() {
    const [links, setLinks] = useState([]);
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    useEffect(() => {
        getLinks();
    }, [])

    const getLinks = () => {
        api.get("/api/links/")
        .then((res) => res.data)
        .then((data) => {
            setLinks(data); 
            console.log(data);
        })
        .catch((err) => alert(err));
    }

    const handleLinkCreated = (newLink) => {
        setLinks((prevLinks) => [...prevLinks, newLink]);
    };

    const deleteLink = (id) => {
        api.delete(`/api/links/${id}/delete/`).then((res) => {
            if (res.status === 204) {
                showToast("Link Deleted", "success");
            } else  {
                showToast("Failed to delete link", "error");
            }
            getLinks()
        }).catch((error) => showToast(error.message, "error"));
    }
    
    return (

        <div className="drawer md:drawer-open">

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col h-screen">

                {/* Navbar */}
                <Navbar onLinkCreated={handleLinkCreated} />

                {/* Main Content */}
                <main className="bg-base-100 flex-1 overflow-y-auto">
                    <div className="p-8">
                        {/* <!-- Section Header --> */}
                        <div className="flex flex-row justify-between items-center mb-5">
                            {/* <!-- Title with Icon --> */}
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faLink} className="text-2xl" />
                                <div className="text-left">
                                    <p className="text-2xl font-bold">All Links</p>
                                    <p className="text-sm text-gray-500">Links from every Collection</p>
                                </div>
                            </div>
                        </div>
                        
                    
                        {/* <!-- Grid --> */}
                        {links && links.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {links.map(link => <LinkItem link={link} onDelete={deleteLink} key={link.id} />)}
                            </div>
                            ) : (
                            <div className="flex flex-col items-center justify-cente text-center">
                                <FontAwesomeIcon icon={faLink} className="text-9xl mb-2" />
                                <h2 className="text-2xl">You Haven't Created Any Links Yet</h2>
                                <p className="">Start your journey by creating a new Link!</p>
                            </div>
                        )}
                    </div> 
                </main>
            </div>
            {/* Sidebar */}
            <Sidebar />
        </div>
    )
}

export default LinkList