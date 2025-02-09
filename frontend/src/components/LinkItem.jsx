import React from "react";
import { Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCableCar, faCalendar, faChevronRight, faCircleInfo, faClock, faFolder, faHomeAlt, faHouse, faLink, faPlus, faThumbTack, faThumbtackSlash, faThumbTackSlash, faTrash } from "@fortawesome/free-solid-svg-icons";

function LinkItem({link, onDelete, onPin}) {

    const formattedDate = new Date(link.date_created).toLocaleDateString("en-US")

    return (
        <div className="card card-compact bg-neutral shadow-xl">
            {/* <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoe" /></figure> */}
            <div className="card-body">
                <h2 className="truncate text-lg font-bold">{link.title}</h2>
                <a href={`${link.url}`} target="_blank" rel="noopener noreferrer" className="truncate"><FontAwesomeIcon icon={faLink} className="mr-1" />{link.url}</a>
                <div className="flex flex-row gap-5">
                    <Link to={`/collections/${link.collection}`}><FontAwesomeIcon icon={faFolder} className="mr-1" />{link.collection_title}</Link>
                    <div><FontAwesomeIcon icon={faCalendar} className="mr-1" />{formattedDate}</div>
                </div>
                <div className="card-actions justify-end">
                    
                    {/* <span><FontAwesomeIcon icon={faFolder} className="mr-2" />{link.collection_title}</span>
                    <span><FontAwesomeIcon icon={faCalendar} className="mr-2" />{formattedDate}</span> */}
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
        // <div className="card" style={{ width: "22rem" }}>
        //     <svg className="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Image cap" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em"></text></svg>
        //     <div className="card-body">
        //         <h6 className="card-title text-truncate">{link.title}</h6>
        //         <p className="card-text text-truncate">
        //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-link-45deg" viewBox="0 0 16 16">
        //                 <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
        //                 <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
        //             </svg>
        //             <a href={`${link.url}`} className="text-decoration-none text-body-tertiary">{link.url}</a>
        //         </p>
        //         <button className="btn btn-primary" onClick={() => onDelete(link.id)}>Delete</button>
        //     </div>
        //     <div className="card-footer d-flex justify-content-between text-body-secondary">
        //         <span>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-folder" viewBox="0 0 16 16">
        //                 <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
        //             </svg>
        //             <a href={`/collections/${link.collection}`} className="text-decoration-none text-body-secondary">{link.collection_title}</a>
        //         </span>
        //         <span>
        //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
        //                 <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
        //                 <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
        //             </svg>
        //             {formattedDate}
        //         </span>
        //     </div>
        // </div>
    )
}

export default LinkItem