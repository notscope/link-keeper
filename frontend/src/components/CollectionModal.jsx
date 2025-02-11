import React, { useState, useEffect, forwardRef } from "react";
import api from "../api";

// ✅ Use `forwardRef` to allow accessing the modal
const CollectionModal = forwardRef(({ onCollectionUpdated, collection, method }, ref) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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
                ref.current.close(); // ✅ Close modal after update
            }
        } catch (error) {
            alert("Failed to update Collection");
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (method === "update") {
            updateCollection();
        }
    };

    return (
        <dialog ref={ref} id="EditCollectionModal" className="modal">
            <div className="modal-box">
                <h3 className="text-xl font-bold">Edit Collection</h3>
                <form onSubmit={handleFormSubmit} autoComplete="off">
                    <label className="form-control my-4 w-full">
                        <div className="label">
                            <span className="label-text">Name</span>
                        </div>
                        <input
                            required
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            type="text"
                            placeholder="e.g. Example Collection"
                            className="input input-bordered w-full"
                        />
                        <div className="label">
                            <span className="label-text">Description</span>
                        </div>
                        <textarea
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className="textarea textarea-bordered h-24 resize-none"
                            placeholder="The purpose of this Collection..."
                        ></textarea>
                    </label>
                </form>
                <div className="modal-action">
                    <button className="btn" onClick={() => ref.current.close()}>Close</button>
                    <button className="btn btn-primary" type="submit" onClick={handleFormSubmit}>
                        Save Changes
                    </button>
                </div>
            </div>
        </dialog>
    );
});

export default CollectionModal;
