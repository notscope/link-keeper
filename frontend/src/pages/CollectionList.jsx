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
        api.delete(`/api/collections/delete/${id}/`).then((res) => {
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
                        
                            {/* <!-- View All Button --> */}
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
        // <div className="container-fluid">
        //     <div className="row">
        //         <Sidebar />
        //         <div className="col p-0">
        //             <Navbar onCollectionCreated={handleCollectionCreated} />
        //             <div className="container-fluid mt-2">
        //                 <h2>All Collections</h2>
        //                 {collections.map(collection => <Collection collection={collection} onDelete={deleteCollection} key={collection.id} />)}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )

}

export default CollectionList

    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("")


    // const createCollection = (e) => {
    //     e.preventDefault()
    //     api.post("/api/collections/", { title, description }).then((res) => {
    //         if (res.status === 201) alert("Collection Created")
    //         else alert("Failed to create collection")
    //         getCollections()
    //     }).catch((error) => alert(error))

    // }

{/* <div>
<h2>Create New Collection</h2>
<form onSubmit={createCollection}>
    <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input 
            type="text"
            className="form-control" 
            id="title"
            name="title"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />
    </div>
    <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input 
            type="text"
            className="form-control" 
            id="description"
            name="description"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
        />
    </div>
    <input className="btn btn-primary" type="submit" value="Submit"></input>            
</form>
</div> */}