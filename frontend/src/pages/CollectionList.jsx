import { useState, useEffect } from "react";
import api from "../api";
import Navbar from "../components/Navbar";
import Collection from "../components/Collection";
import Sidebar from "../components/Sidebar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faCircleInfo, faClock, faFolder, faHomeAlt, faHouse, faLink, faPlus, faThumbTack } from "@fortawesome/free-solid-svg-icons";

function CollectionList() {
    const [collections, setCollections] = useState([]);


    useEffect(() => {
        getCollections();
    }, [])

    const getCollections = () => {
        api.get("/api/collections/")
        .then((res) => res.data)
        .then((data) => {
            setCollections(data); 
            console.log(data)
        })
        .catch((err) => alert(err));  
    }

    const handleCollectionCreated = (newCollection) => {
        setCollections((prevCollections) => [...prevCollections, newCollection]);
    };

    const deleteCollection = (id) => {
        api.delete(`/api/collections/${id}/delete/`).then((res) => {
            if (res.status === 204) alert("Collection Deleted")
            else alert("Failed to delete collection")
            getCollections()
        }).catch((error) => alert(error))
    }



    return (
        <div className="drawer md:drawer-open">
            <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col h-screen">

                {/* Navbar */}
                <Navbar onCollectionCreated={handleCollectionCreated} />

                {/* Main Content */}
                <main className="bg-base-100 flex-1 overflow-y-auto">
                    <div className="p-8">
                        {/* <!-- Section Header --> */}
                        <div className="flex flex-row justify-between items-center mb-5">
                            {/* <!-- Title with Icon --> */}
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faFolder} className="text-2xl" />
                                <div className="text-left">
                                    <p className="text-2xl font-bold">Collections</p>
                                    <p className="text-sm text-gray-500">Collections you own</p>
                                </div>
                            </div>
                        </div>
                        
                    
                        {/* <!-- Grid --> */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {collections.map(collection => <Collection collection={collection} onDelete={deleteCollection} key={collection.id} />)}
                        </div>
                    </div> 
                </main>
            </div>
            {/* Sidebar */}
            <Sidebar />
        </div>
    )

}

export default CollectionList