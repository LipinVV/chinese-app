import React from "react";
import './landing.scss'
import {Link} from "react-router-dom";


export const Landing = () => {


    return (
        <div className='landing'>
            <h1 className='landing-header'>Welcome to the Chinese learning platform!</h1>
            <div className='landing-news'>
                <div className='landing-date'>05.09.2021</div>
                Released parts:
                <Link className='landing-link' to='/dictionary'>Dictionary</Link>
                and
                <div><Link className='landing-link'  to='/practice'>Practice</Link>: audio-word/ audio-matching/ word-definition/ definition-word/ board game</div>
                <div>Recommended  resource: <a className='landing-link'  href='https://www.chinesepod.com/home'>Chinese Pod</a></div>
                <div>And this one: <a className='landing-link'  href='https://vk.com/kit_up'>KitUp</a></div>
            </div>
        </div>
    )
}