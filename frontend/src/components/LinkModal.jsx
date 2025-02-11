import React from "react";
import { useState, useEffect } from "react";
import api from "../api";

function LinkModal({ onLinkCreated, onLinkUpdated, link, method }) {
    const [linkURLs, setLinkURLs] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState("");

    const modalName = method === "update" ? "EditLinkModal" : method === "create" ? "NewLinkModal" : "NewLinkModal";
    const formName = method === "update" ? "editLinkForm" : method === "create" ? "newLinkForm" : "newLinkForm";
    const modalTitle = method === "update" ? "Edit Link" : method === "create" ? "Create New Link " : "Create New Link";
    const modalButton = method === "update" ? "Edit Link" : method === "create" ? "Create Link " : "Create Link";

    useEffect(() => {
        getCollections();
    }, [])

    useEffect(() => {
        if (link) {
            setTitle(link.title || "");
            setLinkURLs(link.url || "");
            setDescription(link.description || "");
            setSelectedCollection(link.collection || "");
        }
    }, [link]);

    const getCollections = () => {
        api.get("/api/collections/")
        .then((res) => res.data)
        .then((data) => {setCollections(data); console.log(data)})
        .catch((err) => alert(err));  
    }

    const updateLink = async () => {
        if (!link) return;

        try {
            const res = await api.patch(`/api/links/${link.id}/update/`, {
                url: linkURLs,
                title,
                description,
                collection: selectedCollection,
            });

            if (res.status === 200) {
                alert("Link updated successfully");
                if (onLinkUpdated) {
                    onLinkUpdated(res.data);
                }
            }
        } catch (error) {
            alert("Failed to update link");
        }
    };

    const createLink = (e) => {
        // e.preventDefault();
        api.post("/api/links/", { url: linkURLs, title, description, collection: selectedCollection })
            .then((res) => {
                if (res.status === 201) {
                    alert("Link Created");
                    if (onLinkCreated) {
                        onLinkCreated(res.data); // Pass new link data to parent
                    }
                } else {
                    alert("Failed to create link");
                }
            })
            .catch((error) => alert(error));
    };

    const handleFormSubmit = (e) => {
        if (method === "update") {
            e.preventDefault();
            updateLink();
            const dialog = document.getElementById('EditLinkModal');
            dialog.close();
        } else {
            e.preventDefault();
            createLink();
            const dialog = document.getElementById('NewLinkModal');
            dialog.close();
            setLinkURLs("");
            setTitle("");
            setDescription("");
            setSelectedCollection("");
        }
    }

    const handleClose = () => {
        if (method === "update") {
            const dialog = document.getElementById('EditLinkModal');
            dialog.close();
        } else {
            const dialog = document.getElementById('NewLinkModal');
            dialog.close();
            setLinkURLs("");
            setTitle("");
            setDescription("");
            setSelectedCollection("");
        }
    }


    useEffect(() => {
        // Attach event listener to reset form on modal hide
        const modalElement = document.getElementById("EditLinkModal");
        const handleHidden = () => resetForm();

        modalElement.addEventListener("hidden.bs.modal", handleHidden);

        // Cleanup event listener on component unmount
        return () => {
            modalElement.removeEventListener("hidden.bs.modal", handleHidden);
        };
    }, []);

    useEffect(() => {
        // Attach event listener to reset form on modal hide
        const modalElement = document.getElementById("NewLinkModal");
        const handleHidden = () => resetForm();

        modalElement.addEventListener("hidden.bs.modal", handleHidden);

        // Cleanup event listener on component unmount
        return () => {
            modalElement.removeEventListener("hidden.bs.modal", handleHidden);
        };
    }, []);

    return (
        <dialog id={modalName} className="modal">
            <div className="modal-box">
                <h3 className="text-xl font-bold">{modalTitle}</h3>
                <form id={formName} onSubmit={handleFormSubmit} autoComplete="off">
                    <label className="form-control my-4 w-full">
                    <div className="label">
                        <span className="label-text">Title</span>
                    </div>
                    <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Type here" className="input input-bordered w-full" />
                    <div className="label">
                        <span className="label-text">Link</span>
                    </div>
                    <input type="text" placeholder="e.g http://example.com/" id="link-url" name="link-url" required onChange={(e) => setLinkURLs(e.target.value)} value={linkURLs} className="input input-bordered w-full" />

                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea className="textarea textarea-bordered h-24 resize-none" id="description" name="description" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Notes, thoughts, etc."></textarea>

                    <div className="label">
                        <span className="label-text">Collection</span>
                    </div>
                    <select aria-label="Collection Selector" value={selectedCollection} onChange={(e) => setSelectedCollection(e.target.value)} className="select select-bordered">
                        {collections.map((collection) => (
                            <option key={collection.id} value={collection.id}>
                                {collection.title}
                            </option>
                        ))}
                    </select>
                    </label>
                </form>

                <div className="modal-action">
                <form method="dialog">
                    <button className="btn mr-3" onClick={handleClose}>Close</button>
                    <button className="btn btn-primary" type="submit" value="Submit" form={formName}>{modalButton}</button>
                </form>
                </div>
            </div>
        </dialog>
    ) 

}

export default LinkModal