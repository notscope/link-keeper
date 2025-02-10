import { React, useState, useEffect } from "react";
import api from "../api";

function NewCollectionModal({ onCollectionCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")

    const handleFormSubmit = (e) => {
        e.preventDefault();
        createCollection();
        const dialog = document.getElementById('NewCollectionModal');
        dialog.close();
        setTitle("");
        setDescription("");
    }

    const handleClose = () => {
        const dialog = document.getElementById('NewLinkModal');
        dialog.close();
        setTitle("");
        setDescription("");
    }

    const createCollection = async () => {
        try {
            // Fetch existing collections
            const res = await api.get("/api/collections/");
            const existingCollections = res.data;
    
            // Check if a collection with the same title already exists
            const isDuplicate = existingCollections.some(collection => collection.title.toLowerCase() === title.toLowerCase());
    
            if (isDuplicate) {
                alert("A collection with this name already exists!");
                return;
            }
    
            // If no duplicate, proceed with creation
            const response = await api.post("/api/collections/", { title, description });
    
            if (response.status === 201) {
                alert("Collection Created");
                if (onCollectionCreated) {
                    onCollectionCreated(response.data);
                }
            } else {
                alert("Failed to create collection");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };
    

    useEffect(() => {
        const modalElement = document.getElementById("NewCollectionModal");
        const handleHidden = () => resetForm();

        modalElement.addEventListener("hidden.bs.modal", handleHidden)

        return () => {
            modalElement.removeEventListener("hidden.bs.modal", handleHidden)
        }
    }, [])


    return (
        <dialog id="NewCollectionModal" className="modal">
            <div className="modal-box">
                <form id="newCollectionForm" onSubmit={handleFormSubmit} autoComplete="off">
                    <h3 className="text-xl font-bold">Create a New Collection</h3>
                    <label className="form-control my-4 w-full">
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    <input id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title}  type="text" placeholder="e.g. Example Collection" className="input input-bordered w-full" />
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    <textarea id="description" name="description" onChange={(e) => setDescription(e.target.value)} value={description} className="textarea textarea-bordered h-24 resize-none" placeholder="The purpose of this Collection..."></textarea>
                    </label>
                </form>
                <div className="modal-action">
                <form method="dialog">
                    {/* <!-- if there is a button in form, it will close the modal --> */}
                    <button className="btn mr-3" onClick={handleClose}>Close</button>
                    <button className="btn btn-primary" type="submit" value="Submit" form="newCollectionForm">Create Collection</button>
                </form>
                </div>
            </div>
        </dialog>
    )
}

export default NewCollectionModal