import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEnvelope, faLock, faSignInAlt, faUser } from "@fortawesome/free-solid-svg-icons";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md shadow-2xl bg-gray-800 p-6 rounded-2xl text-white">
                <div className="text-center">
                    {name == "Login" ? (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
                            <p className="mb-6 text-gray-400">Sign in to continue</p>
                        </div>
                    ) : (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Welcome</h2>
                            <p className="mb-6 text-gray-400">Create a new account</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center bg-gray-700 p-2 rounded-md pl-4 focus-within:ring-2 focus-within:ring-blue-400">
                        <FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input input-bordered w-full bg-transparent text-white border-none pl-2 focus:outline-none" />
                    </div>
                    <div className="flex items-center bg-gray-700 p-2 rounded-md relative pl-4 focus-within:ring-2 focus-within:ring-blue-400">
                        <FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full bg-transparent text-white border-none pl-2 pr-10 focus:outline-none" />
                    </div>
                    <button className="btn btn-primary w-full" type="submit"><FontAwesomeIcon icon={faSignInAlt} className="mr-2"></FontAwesomeIcon>{name}</button>
                </div>
                {name == "Login" ? (
                    <p className="text-center text-sm text-gray-400 mt-4">
                        Don't have an account? <a href="/register" className="text-blue-400 hover:underline">Sign up</a>
                    </p>
                ) : (
                    <p className="text-center text-sm text-gray-400 mt-4">
                    Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
                    </p>
                )}
            </form>
        </div>
        // <div className="container mt-4 border">
        //     <form onSubmit={handleSubmit}>
        //         <h1>{name}</h1>
        //         <div className="mb-3">
        //             <label className="form-label">User Name</label>
        //             <input
        //                 className="form-control"
        //                 type="text"
        //                 value={username}
        //                 onChange={(e) => setUsername(e.target.value)}
        //             />
        //         </div>
        //         <div className="mb-3">
        //             <label className="form-label">Password</label>
        //             <input
        //                 className="form-control"
        //                 type="password"
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //             />
        //         </div>
        //         <button className="btn btn-primary" type="submit">{name}</button>
        //     </form>
        // </div>

    )
}

export default Form