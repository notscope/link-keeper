import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faChevronRight, faCircleInfo, faClock, faFolder, faHomeAlt, faHouse, faLink, faPlus, faThumbTack, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    //     <div className="card" style={{ width: "24rem" }}>
    //     <div className="card-body">
    //         <a href={`/collections/${collection.id}`} className="card-title">{collection.title}</a>
    //         <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    //         <button className="btn btn-primary" onClick={() => onDelete(collection.id)}>Delete</button>
    //         <div className="d-flex justify-content-between text-body-secondary">
    //             <span>
    //                 <a href="#" className="text-decoration-none text-body-secondary">{collection.collection_title}</a>
    //             </span>
    //             <span>  
    //                 {formattedDate}
    //             </span>
    //         </div>
    //     </div>
    //   </div>
    )
}

export default Collection