import { React, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFolder, faLink, faPen, faPencil, faThumbTack, faThumbtackSlash, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditLinkModal from "./EditLinkModal";

function LinkItem({link, onDelete, onPin}) {
    const [selectedLink, setSelectedLink] = useState(null);
    const [currentLink, setCurrentLink] = useState(link); // Store the latest version of the link

    const formattedDate = new Date(currentLink.date_created).toLocaleDateString("en-US")


    const handleEditClick = () => {
        setSelectedLink(currentLink); // Set the selected link
        document.getElementById("EditLinkModal").showModal(); // Open the modal
    };

    // Update the link when changes are saved in the modal
    const handleLinkUpdate = (updatedLink) => {
        setCurrentLink(updatedLink); // Update the link state
    };

    return (
        <div className="card card-compact bg-neutral shadow-xl">
            <div className="card-body">
                <h2 className="truncate text-lg font-bold">{currentLink.title}</h2>
                <a href={`${currentLink.url}`} target="_blank" rel="noopener noreferrer" className="truncate"><FontAwesomeIcon icon={faLink} className="mr-1" />{currentLink.url}</a>
                <div className="flex flex-row gap-5">
                    <Link to={`/collections/${currentLink.collection}`}><FontAwesomeIcon icon={faFolder} className="mr-1" />{currentLink.collection_title}</Link>
                    <div><FontAwesomeIcon icon={faCalendar} className="mr-1" />{formattedDate}</div>
                </div>
                <div className="card-actions justify-end">
                    <div className="flex gap-2">
                        <button onClick={() => onDelete(link.id)} className="btn btn-error btn-sm"><FontAwesomeIcon icon={faTrash} /></button>
                        <button onClick={handleEditClick} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faPen} /></button>
                        <EditLinkModal link={selectedLink} onLinkUpdated={handleLinkUpdate} />
                        {currentLink.pinned ? (
                            <button onClick={() => onPin(link.id)} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faThumbtackSlash} /></button>
                        ) : (
                            <button onClick={() => onPin(link.id)} className="btn btn-primary btn-sm"><FontAwesomeIcon icon={faThumbTack} /></button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LinkItem