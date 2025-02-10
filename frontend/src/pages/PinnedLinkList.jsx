import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Toast from "../components/Toast";
import LinkItem from "../components/LinkItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCircleInfo, faClock, faFolder, faHomeAlt, faHouse, faLink, faPlus, faThumbTack } from "@fortawesome/free-solid-svg-icons";

function PinnedLinkList() {
    const [pinnedLinks, setPinnedLinks] = useState([]);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        getPinnedLinks();
    }, [])

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    const getPinnedLinks = () => {
        api.get("/api/links/pinned/")
        .then((res) => res.data)
        .then((data) => {
            setPinnedLinks(data); 
            console.log(data);
        })
        .catch((err) => alert(err));
    }

    const deleteLink = (id) => {
        api.delete(`/api/links/${id}/delete/`).then((res) => {
            if (res.status === 204) {
                showToast("Link Deleted", "success");
            } else  {
                showToast("Failed to delete link", "error");
            }
            getPinnedLinks()
        }).catch((error) => showToast(error.message, "error"));
    }   

    const pinLink = (id) => {
        api.patch(`/api/links/${id}/pin/`)
            .then((res) => {
                if (res.status === 200) {
                    showToast("Link Pinned", "success");
                    getPinnedLinks();
                } else {
                    showToast("Failed to pin link", "error");
                }
            })
            .catch((error) => showToast(error.message, "error"));
    };

    return (
        <div className="drawer md:drawer-open">
            <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col h-screen">

                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <main className="bg-base-100 flex-1 overflow-y-auto">
                    <div className="p-8">
                        {/* <!-- Section Header --> */}
                        <div className="flex flex-row justify-between items-center mb-5">
                            {/* <!-- Title with Icon --> */}
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faThumbTack} className="text-2xl" />
                                <div className="text-left">
                                    <p className="text-2xl font-bold">Pinned</p>
                                    <p className="text-sm text-gray-500">Your pinned Links</p>
                                </div>
                            </div>                        
                        </div>
                        
                    
                        {/* <!-- Grid --> */}
                        {pinnedLinks && pinnedLinks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {pinnedLinks.map(link => <LinkItem link={link} onDelete={deleteLink} onPin={pinLink} key={link.id} />)}
                            </div>
                            ) : (
                            <div className="flex flex-col items-center justify-center text-center">
                                <FontAwesomeIcon icon={faThumbTack} className="text-9xl mb-2" />
                                <h2 className="text-2xl">Pin Your Favorite Links Here!</h2>
                                <p className="">You can Pin your favorite Links by clicking on the three dots on each Link and clicking Pin to Dashboard.</p>
                            </div>
                        )}
                    </div> 
                </main>
            </div>
            <Sidebar />
        </div>
    )
}

export default PinnedLinkList