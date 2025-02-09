import { useState, useEffect } from "react";
import api from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faLink, faThumbTack } from "@fortawesome/free-solid-svg-icons";


function Stats({ stats }) {
    const [linkCount, setLinkCount] = useState(null);
    const [pinnedLinkCount, setPinnedLinkCount] = useState(null);
    const [collectionCount, setCollectionCount] = useState(null);

    useEffect(() => {
        getLinkCount();
        getPinnedLinkCount();
        getCollectionCount();
    }, [])

    const getLinkCount = () => {
        api.get("/api/links/count/")
        .then((res) => res.data)
        .then((data) => {
            setLinkCount(data.linkCount);
            console.log(data);
        })
        .catch((err) => alert(err));
    }

    const getPinnedLinkCount = () => {
        api.get("/api/links/pinned/count/")
        .then((res) => res.data)
        .then((data) => {
            setPinnedLinkCount(data.pinnedLinkCount)
            console.log(data);
        })
        .catch((err) => alert(err));
    }

    const getCollectionCount = () => {
        api.get("/api/collections/count/")
        .then((res) => res.data)
        .then((data) => {
            setCollectionCount(data.collectionCount);
            console.log(data);
        })
        .catch((err) => alert(err));
    }

    return (
        <div className="stats bg-neutral stats-vertical flex flex-col sm:flex-row m:stats-horizontal shadow">
            <div className="stat">
            <div className="stat-figure text-primary">
                <FontAwesomeIcon icon={faLink} className="text-2xl" />
            </div>
            <div className="stat-title">Links</div>
            <div className="stat-value">
            {linkCount === null ? (
                <div className="h-10 w-20 bg-neutral-content skeleton"></div> // Skeleton for linkCount
            ) : (
                stats.linkCount
            )}
            </div>
            </div>
        
            <div className="stat">
                <div className="stat-figure text-primary">
                    <FontAwesomeIcon icon={faFolder} className="text-2xl" />
                </div>
            <div className="stat-title">Collections</div>
            <div className="stat-value">
            {collectionCount === null ? (
                <div className="h-10 w-20 bg-neutral-content skeleton"></div> // Skeleton for collectionCount
            ) : (
                stats.collectionCount
            )}
            </div>
            </div>
        
            <div className="stat">
                <div className="stat-figure text-primary">
                    <FontAwesomeIcon icon={faThumbTack} className="text-2xl" />
                </div>
                <div className="stat-title">Pinned</div>
                <div className="stat-value">
                {pinnedLinkCount === null ? (
                    <div className="mt-1 h-9 w-20 bg-neutral-content skeleton"></div> // Skeleton for pinnedLinkCount
                ) : (
                    stats.pinnedLinkCount
                )}
                </div>
            </div>
        </div>
    )
}

export default Stats