import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import CollectionModal from "./CollectionModal";

function Collection({ collection, onDelete }) {
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [currentCollection, setCurrentCollection] = useState(collection);
    
    // ✅ Use ref to access the modal and open it
    const modalRef = useRef(null);

    const formattedDate = new Date(collection.date_created).toLocaleDateString("en-US");

    const handleEditClick = () => {
        setSelectedCollection(collection); // ✅ Set the correct collection
    
        // ✅ Open the modal
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const handleCollectionUpdate = (updatedCollection) => {
        setCurrentCollection(updatedCollection);
    };

    return (
        <div className="card card-compact bg-neutral shadow-xl">
            <div className="card-body">
                <Link to={`/collections/${collection.id}`} className="card-title">
                    {currentCollection.title}
                </Link>
                <div className="">
                    <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                    {formattedDate}
                </div>

                {/* ✅ The modal is always rendered but only updates when `selectedCollection` changes */}
                <CollectionModal
                    ref={modalRef}
                    collection={selectedCollection}
                    onCollectionUpdated={handleCollectionUpdate}
                    method="update"
                />

                <div className="card-actions justify-end">
                    {collection.title !== "Unorganized" ? (
                        <>
                            <button onClick={() => onDelete(collection.id)} className="btn btn-error btn-sm">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button onClick={handleEditClick} className="btn btn-primary btn-sm">
                                <FontAwesomeIcon icon={faPen} />
                            </button>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Collection;
