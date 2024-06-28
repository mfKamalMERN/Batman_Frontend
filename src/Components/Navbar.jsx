import { useNavigate } from "react-router-dom"

export const Navbar = () => {
    const nav = useNavigate()

    return (
        <div className="navbar" style={{ display: "flex", justifyContent: "center", backgroundColor: "black", color: "wheat", border: "1px solid wheat", width: "100%" }}>

            <h1 onClick={() => nav('/home')}>🦇Batman🦇</h1>

        </div>

    )
}