import { Outlet, Link } from "react-router-dom";
import React from 'react'
import home from "../icon/home.svg"

export default function Vector() {
    return (
        <div style={{fontFamily:"cursive",fontSize:"20px",display:"flex",justifyContent:"center",alignItems:"center" }}>
            <Link to="/">   <img src={home} alt="" className="imgslide" /></Link>Vector Very Soon
        </div>
    )
}
