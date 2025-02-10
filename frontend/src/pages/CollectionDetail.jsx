import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LinkItem from "../components/LinkItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChevronRight, faCircleInfo, faClock, faFolder, faHomeAlt, faHouse, faLink, faPlus, faThumbTack, faTrash } from "@fortawesome/free-solid-svg-icons";

function CollectionDetail() {
    const { id } = useParams();
    const [links, setLinks] = useState([]);  // Default to empty array
    const [title, setTitle] = useState("");   // State to store collection title
    const [description, setDescription] = useState("")


    useEffect(() => {
        getLinks();
    }, [id]); // Trigger getLinks when id changes

    const getLinks = () => {
        api.get(`/api/collections/${id}`)
        .then((res) => res.data)
        .then((data) => { 
            setLinks(data[0]?.links || []);  // Ensure links are set safely
            setTitle(data[0]?.title || "");   // Set collection title
            setDescription(data[0]?.description || "");
            console.log(data);
        })
        .catch((err) => alert(err));
    };

    const deleteLink = (id) => {
        api.delete(`/api/links/${id}/delete/`).then((res) => {
            if (res.status === 204) alert("Link Deleted")
            else alert("Failed to delete links")
            getLinks()
        }).catch((error) => alert(error))
    }

    const createLink = (e) => {
        e.preventDefault()
        api.post("/api/links/", { url: linkURLs, title, description }).then((res) => {
            if (res.status === 201) alert("Link Created")
            else alert("Failed to create link")
            getLinks()
        }).catch((error) => alert(error))

    }

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
                                <FontAwesomeIcon icon={faFolder} className="text-2xl" />
                                <div className="text-left">
                                    <p className="text-2xl font-bold">{title}</p>
                                    <p className="text-sm text-gray-500">{description}</p>
                                </div>
                            </div>
                        </div>
                        
                    
                        {/* <!-- Grid --> */}
                        {links && links.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {links.map(link => <LinkItem link={link} onDelete={deleteLink} key={link.id} />)}
                            </div>
                            ) : (
                            <div className="flex flex-col items-center justify-center">
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
    );
}

export default CollectionDetail;
