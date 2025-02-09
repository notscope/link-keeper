import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

function Sidebar() {
    const location = useLocation();
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
        setCollections((prevCollections) => [newCollection, ...prevCollections]);
    };

    return (
        <div className="flex-shrink-0 p-3 bg-light" style={{width: "310px", height: "100dvh", overflowY: "auto", overscrollBehaviorY: "none" }}>
            <div className="d-grid gap-2">
                <a className={`btn text-start ${location.pathname === "/" ? "btn-primary" : "btn-light"}`} href="/" role="button">
                    <i className="bi bi-house-door me-2"></i>Home
                </a>
                <a className={`btn text-start ${location.pathname === "/links" ? "btn-primary" : "btn-light"}`} href="/links" role="button">
                    <i className="bi bi-link-45deg me-2"></i>All Links
                </a>
                <a className={`btn text-start ${location.pathname === "/collections" ? "btn-primary" : "btn-light"}`} href="/collections" role="button">
                    <i className="bi bi-folder me-2"></i>All Collections
                </a>
            </div>
            <hr />
            <div className="d-grid">
                <p className="m-0">Collections</p>
                {/* <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-folder me-2"></i>Health and Wellness</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-folder me-2"></i>Research</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-folder me-2"></i>Essay</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-folder me-2"></i>Personal Finance</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-folder me-2"></i>Productivity</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-folder me-2"></i>Recipes</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-folder me-2"></i>Project Alpha</a> */}
                {collections.map((collection) => (
                    <a 
                        href={`/collections/${collection.id}`} // Adjust the URL as per your routing
                        className="btn btn-light text-start btn-sm"
                        key={collection.id}
                    >
                        <i className="bi bi-folder me-2"></i>
                        {collection.title}
                    </a>
                ))}
            </div>
            <hr />
            <div className="d-grid">
                <p className="m-0">Tags</p>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-hash"></i>fitness</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-hash"></i>life hacks</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-hash"></i>Productivity</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-hash"></i>science</a>
                <a href="#" className="btn btn-light text-start btn-sm" type="button"><i className="bi bi-hash"></i>technology</a>
            </div>  
        </div>
    );
}

export default Sidebar;
