import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
    const nav = useNavigate()
    const lbatman = JSON.parse(localStorage.getItem('LoggedBatman'))

    return (
        <div className="navbar" style={{ display: "flex", justifyContent: "center", backgroundColor: "black", color: "wheat", border: "1px solid wheat", width: "100%", position: "fixed", top: "0%", alignItems: "center", minHeight: "10%", height: "11%" }}>

            <h2 onClick={() => nav('/home')} style={{ position: "fixed" }}>🦇Batman🦇</h2>

            <div onClick={() => nav(`/myprofile/${localStorage.getItem('Id')}`)} className="batmandetails" style={{ display: "flex", marginLeft: "80%", alignItems: "center", flexDirection: "column" }}>

                <img src={lbatman[0].DP} alt="" style={{ width: "25px", borderRadius: "15px", height: "70%" }} />
                <h3 style={{ fontSize: "11px" }}>{lbatman[0].Name}</h3>

            </div>

        </div>

    )
}