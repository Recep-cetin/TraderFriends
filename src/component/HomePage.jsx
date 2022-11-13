import React from 'react'
import "../css/den.css"
import tr from "../image/traderClub.png"
import home from "../icon/new/hom.svg"
import chat from "../icon/new/chat.svg"
import terminal from "../icon/new/terminal.svg"
import vetor from "../icon/new/isi.svg"
import watch from "../icon/new/egt.svg"
import { Outlet, Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <div className='body'>

                <div className='top'>
                    <img src={tr} alt="" className='tr' />
                </div>
                <div className='cen'>
                    <img src={home} alt="" className='tralt' />
                    <Link to="/watch"> <img src={watch} alt="" className='tralt' /></Link>
                    <Link to="/terminal"> <img src={terminal} alt="" className='tralt' /></Link>
                    <Link to="/chat"> <img src={chat} alt="" className='tralt' /></Link>
                    <Link to="/vector"><img src={vetor} alt="" className='tralt' style={{ width: "200%", height: "200%" }} /></Link>
                </div>


                <div className='bot'>
                    Trader Club For People
                </div>
            </div>

        </>
    )
}

export default HomePage
