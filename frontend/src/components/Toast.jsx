import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Hide the toast after 3 seconds
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast toast-center z-[9999]">
            <div className={`alert alert-${type}`}>
                <span>{message}</span>
            </div>
        </div>
    );
};

export default Toast;
