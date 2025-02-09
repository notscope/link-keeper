import NewLinkModal from "./NewLinkModal"
import NewCollectionModal from "./NewCollectionModal"
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api";

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
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <form className="d-flex" role="search">
                            <div className="input-group">
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-primary" type="submit"><i className="bi bi-search"></i></button>
                            </div>
                        </form>
                    </li>
                </ul>
                <div className="dropdown me-4">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="10,20">
                        <i className="bi bi-plus-lg"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><button type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#NewLinkModal">New Link</button></li>
                        <li><button type="button" className="dropdown-item" data-bs-toggle="modal" data-bs-target="#NewCollectionModal">New Collection</button></li>
                    </ul>
                </div>
                <NewLinkModal onLinkCreated={onLinkCreated} />
                <NewCollectionModal onCollectionCreated={onCollectionCreated} />
                <div className="dropdown">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="30,20">{currentUser || "User"}</a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="/logout">Log Out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        </nav>
    )
}

export default Navbar