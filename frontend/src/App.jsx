import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import '../src/main.css'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import CollectionDetail from "./pages/CollectionDetail";
import CollectionList from "./pages/CollectionList";
import LinkList from "./pages/LinkList";
import PinnedLinkList from "./pages/PinnedLinkList"


function Logout() {
  localStorage.clear()
  return <Navigate to={"/login"} />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/collections/:id" element={<ProtectedRoute><CollectionDetail /></ProtectedRoute>} />
        <Route path="/collections" element={<ProtectedRoute><CollectionList /></ProtectedRoute>}  />
        <Route path="/links" element={<ProtectedRoute><LinkList /></ProtectedRoute>} />
        <Route path="/pinned" element={<ProtectedRoute><PinnedLinkList /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
