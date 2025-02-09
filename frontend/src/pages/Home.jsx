import { useState, useEffect } from "react"
import api from "../api"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkItem from "../components/LinkItem";
import { Link } from "react-router-dom";

import { faChevronRight, faClock, faFolder, faHomeAlt, faHouse, faLink, faPlus, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import Toast from "../components/Toast";
import DummyCard from "../components/DummyCard"
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Stats from "../components/Stats";


function Home() {
    const [links, setLinks] = useState([]);
    const [collections, setCollections] = useState([]);
    const [pinnedLinks, setPinnedLinks] = useState([]);
    const [toast, setToast] = useState(null);

    const [stats, setStats] = useState({
        linkCount: null,
        pinnedLinkCount: null,
        collectionCount: null,
    });

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    useEffect(() => {
        getLinks();
        getPinnedLinks();
        updateStats();
    }, [])

    const handleLinkCreated = (newLink) => {
        setLinks((prevLinks) => [newLink, ...prevLinks]);
        updateStats();  // Update stats when a new link is created
    };

    const handleCollectionCreated = (newCollection) => {
        setCollections((prevCollections) => [newCollection, ...prevCollections]);
        updateStats();
    };

    const getLinks = () => {
        api.get("/api/links/recent")
        .then((res) => res.data)
        .then((data) => {
            setLinks(data); 
            console.log(data);
        })
        .catch((err) => alert(err));
    }
    

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
        api.delete(`/api/links/delete/${id}/`).then((res) => {
            if (res.status === 204) {
                showToast("Link Deleted", "success");
            } else  {
                showToast("Failed to delete link", "error");
            }
            getLinks()
            getPinnedLinks()
            updateStats();
        }).catch((error) => showToast(error.message, "error"));
    }   

    const pinLink = (id) => {
        api.patch(`/api/links/${id}/pin/`)
            .then((res) => {
                if (res.status === 200) {
                    showToast("Link Pinned", "success");
                    getLinks();
                    getPinnedLinks();
                    updateStats();  // Refresh stats when a link is pinned
                } else {
                    showToast("Failed to pin link", "error");
                }
            })
            .catch((error) => showToast(error.message, "error"));
    };

    const updateStats = () => {
        api.get("/api/links/count/")
            .then((res) => setStats((prev) => ({ ...prev, linkCount: res.data.linkCount })))
            .catch((err) => alert(err));

        api.get("/api/links/pinned/count/")
            .then((res) => setStats((prev) => ({ ...prev, pinnedLinkCount: res.data.pinnedLinkCount })))
            .catch((err) => alert(err));

        api.get("/api/collections/count/")
            .then((res) => setStats((prev) => ({ ...prev, collectionCount: res.data.collectionCount })))
            .catch((err) => alert(err));
    };

    return (
        <div className="drawer md:drawer-open">

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}


            <input id="drawer-toggle" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col h-screen">

                {/* Navbar */}
                <Navbar onLinkCreated={handleLinkCreated} onCollectionCreated={handleCollectionCreated} />

                {/* Main Content */}
                <main className="bg-base-100 flex-1 overflow-y-auto">
                    <div className="p-8">
                        <div className="flex flex-row justify-between items-center mb-5">
                            {/* <!-- Title with Icon --> */}
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faHouse} className="text-2xl" />
                                <div className="text-left">
                                    <p className="text-2xl font-bold">Dashboard</p>
                                    <p className="text-sm text-gray-500">A brief overview of your data</p>
                                </div>
                            </div>
                        </div>
                        
                        <Stats stats={stats} updateStats={updateStats} />
                        
                    </div> 
                    <div className="p-8">
                        {/* <!-- Section Header --> */}
                        <div className="flex flex-row justify-between items-center mb-5">
                            {/* <!-- Title with Icon --> */}
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon icon={faClock} className="text-2xl" />
                                <div className="text-left">
                                    <p className="text-2xl font-bold">Recent</p>
                                    <p className="text-sm text-gray-500">Recently added Links</p>
                                </div>
                            </div>
                        
                            {/* <!-- View All Button --> */}
                            <Link to="/links" className="btn btn-ghost mt-4 md:mt-0 flex items-center">
                                View All <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                            </Link>
                        </div>
                        
                    
                        {/* <!-- Grid --> */}
                        {links && links.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {links.map(link => <LinkItem link={link} onDelete={deleteLink} onPin={pinLink} key={link.id} />)}
                            </div>
                            ) : (
                            <div className="grid grid-cols-1">
                                <div className="card bg-neutral shadow-xl">
                                    <div className="card-body text-center">
                                        <FontAwesomeIcon icon={faClock} className="text-5xl mb-2" />
                                        <h2 className="text-2xl">View Your Recently Added Links Here!</h2>
                                        <p className="">This section will view your latest added Links across every Collections you have access to.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> 

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
                        
                            {/* <!-- View All Button --> */}
                            <Link to="/pinned" className="btn btn-ghost mt-4 md:mt-0 flex items-center">
                                View All <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                            </Link>
                        </div>
                        
                    
                        {/* <!-- Grid --> */}
                        {pinnedLinks && pinnedLinks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {pinnedLinks.map(link => <LinkItem link={link} onDelete={deleteLink} onPin={pinLink} key={link.id} />)}
                            </div>
                            ) : (
                            <div className="grid grid-cols-1">
                                <div className="card bg-neutral shadow-xl">
                                    <div className="card-body text-center">
                                        <FontAwesomeIcon icon={faThumbTack} className="text-5xl mb-2" />
                                        <h2 className="text-2xl">Pin Your Favorite Links Here!</h2>
                                        <p className="">You can Pin your favorite Links by clicking on the three dots on each Link and clicking Pin to Dashboard.</p>
                                    </div>
                                </div>
                            </div>
                        )}
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
        //             <Navbar />
        //             <div className="container-fluid mt-2">
        //                 <h2>Links</h2>
                        // {linkCount !== null ? ( // Ensure linkCount is not null
                        //     <p>Total links: {linkCount}</p>
                        // ) : (
                        //     <p>Loading...</p> // Display a loading message while fetching
                        // )}
                        // {collectionCount !== null ? ( // Ensure linkCount is not null
                        //     <p>Total Collection: {collectionCount}</p>
                        // ) : (
                        //     <p>Loading...</p> // Display a loading message while fetching
                        // )}
        //             </div>
        //         </div>
        //     </div>
        // </div>
    
    )
}

export default Home

{/* <div>
<h2>Create A note</h2>
<form onSubmit={createLink}>
    <div className="mb-3">
        <label htmlFor="link-url" className="form-label">Link</label>
        <input 
            type="text" 
            className="form-control" 
            id="link-url" 
            name="link-url" 
            required 
            onChange={(e) => setLinkURLs(e.target.value)}
            value={linkURLs}
        />
    </div>
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

// const [links, setLinks] = useState([]);

// useEffect(() => {
//     getLinks();
// }, [])

// const getLinks = () => {
//     api.get("/api/links/")
//     .then((res) => res.data)
//     .then((data) => {
//         setLinks(data); 
//         console.log(data);
//     })
//     .catch((err) => alert(err));
// }

// const handleLinkCreated = (newLink) => {
//     setLinks((prevLinks) => [newLink, ...prevLinks]);
// };

// const deleteLink = (id) => {
//     api.delete(`/api/links/delete/${id}/`).then((res) => {
//         if (res.status === 204) alert("Link Deleted")
//         else alert("Failed to delete links")
//         getLinks()
//     }).catch((error) => alert(error))
// }