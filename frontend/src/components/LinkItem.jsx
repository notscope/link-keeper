import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faFolder, faLink, faThumbTack, faThumbtackSlash, faTrash } from "@fortawesome/free-solid-svg-icons";

function LinkItem({link, onDelete, onPin}) {
    const formattedDate = new Date(link.date_created).toLocaleDateString("en-US")

    return (
        <div className="card card-compact bg-neutral shadow-xl">
            <div className="card-body">
                <h2 className="truncate text-lg font-bold">{link.title}</h2>
                <a href={`${link.url}`} target="_blank" rel="noopener noreferrer" className="truncate"><FontAwesomeIcon icon={faLink} className="mr-1" />{link.url}</a>
                <div className="flex flex-row gap-5">
                    <Link to={`/collections/${link.collection}`}><FontAwesomeIcon icon={faFolder} className="mr-1" />{link.collection_title}</Link>
                    <div><FontAwesomeIcon icon={faCalendar} className="mr-1" />{formattedDate}</div>
                </div>
                <div className="card-actions justify-end">
                    <div className="flex gap-2">
                        <button onClick={() => onDelete(link.id)} className="btn btn-error btn-sm"><FontAwesomeIcon icon={faTrash} /></button>
                        {link.pinned ? (
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