import React from 'react'
import home from "../icon/home.svg"
import { Outlet, Link } from "react-router-dom";

export default function Chat() {
  return (
    <div style={{fontFamily:"cursive",fontSize:"20px",display:"flex",justifyContent:"center",alignItems:"center" }}>
    <Link to="/">   <img src={home} alt="" className="imgslide" /></Link>Chat Very Soon
</div>
  )
}
