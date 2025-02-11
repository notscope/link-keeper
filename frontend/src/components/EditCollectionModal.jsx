import {React, useState, useEffect} from "react";
import api from "../api";

function EditCollectionModal({ onCollectionUpdated, collection }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")

    useEffect(() => {
        if (collection) {
            setTitle(collection.title || "");
            setDescription(collection.description || "");
        }
    }, [collection]);

    const updateCollection = async () => {
        if (!collection) return;

        try {
            const res = await api.patch(`/api/collections/${collection.id}/update/`, {
                title,
                description,
            });

            if (res.status === 200) {
                alert("Collection updated successfully");
                if (onCollectionUpdated) {
                    onCollectionUpdated(res.data);
                }
            }
        } catch (error) {
            alert("Failed to update collection")
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        updateCollection();
        const dialog = document.getElementById('EditCollectionModal');
        dialog.close();
    };

    const handleClose = () => {
        const dialog = document.getElementById('EditCollectionModal');
        dialog.close();
    };

    return (
        <dialog id="EditCollectionModal" className="modal">
            <div className="modal-box">
                <form id="editCollectionForm" onSubmit={handleFormSubmit} autoComplete="off">
                    <h3 className="text-xl font-bold">Edit Collection</h3>
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
                    <button className="btn btn-primary" type="submit" value="Submit" form="editCollectionForm">Edit Collection</button>
                </form>
                </div>
            </div>
        </dialog>
    )

}

export default EditCollectionModal