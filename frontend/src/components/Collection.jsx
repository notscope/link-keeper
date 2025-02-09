import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Collection({collection, onDelete}) {
    const formattedDate = new Date(collection.date_created).toLocaleDateString("en-US")

    return (
        <div className="card card-compact bg-neutral shadow-xl">
            <div className="card-body">
                <Link to={`/collections/${collection.id}`} className="card-title">{collection.title}</Link>
                <div className=""><FontAwesomeIcon icon={faCalendar} className="mr-1" />{formattedDate}</div>
                <div className="card-actions justify-end">
                {collection.title !== "Unorganized" 
                    ? (<button onClick={() => onDelete(collection.id)} className="btn btn-error btn-sm"><FontAwesomeIcon icon={faTrash} /></button>) 
                    : (<div></div>)
                }
                </div>
            </div>
        </div>
    )
}

export default Collection