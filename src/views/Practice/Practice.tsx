import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './practice.scss';

export const Practice = ({setMenuIsOpen} : any) => {
    const [textOfTheFirstPractice, setTextOfTheFirstPractice] = useState(false);
    const [textOfTheSecondPractice, setTextOfTheSecondPractice] = useState(false);
    const [textOfTheThirdPractice, setTextOfTheThirdPractice] = useState(false);
    const [textOfTheFourthPractice, setTextOfTheFourthPractice] = useState(false);
    const [textOfTheFifthPractice, setTextOfTheFifthPractice] = useState(false);
    const [textOfTheSixthPractice, setTextOfTheSixthPractice] = useState(false);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const reportWindowSize = () => {
            setWidth(window.innerWidth)
        }
        window.onresize = reportWindowSize;
        window.addEventListener('resize', reportWindowSize);
    }, [])

    return (
        <div className='practice'>
            <div className='practice__navigation'>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                            setTextOfTheFirstPractice(true);
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                            setTextOfTheFirstPractice(false);
                    }}
                    className='practice__navigation-link' to='/practice/definition-word'>
                    <span className='practice__navigation-title'>{!textOfTheFirstPractice ? 'Definition-Word' : `Match a definition with it's character`}</span></Link>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                            setTextOfTheSecondPractice(true);
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                        setTextOfTheSecondPractice(false);
                    }} className='practice__navigation-link' to='/practice/word-definition'><span
                    className='practice__navigation-title'>{!textOfTheSecondPractice ? 'Word-Definition' : `Match a character with it's definition`}</span> </Link>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                            setTextOfTheThirdPractice(true);
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                            setTextOfTheThirdPractice(false);
                    }} className='practice__navigation-link' to='/practice/board-game'><span
                    className='practice__navigation-title'>{!textOfTheThirdPractice ? 'Board game' : 'Find all correct pairs of word and pinyin'}</span></Link>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                            setTextOfTheFourthPractice(true);
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                            setTextOfTheFourthPractice(false);
                    }} className='practice__navigation-link' to='/practice/audio-matching'><span
                    className='practice__navigation-title'>{!textOfTheFourthPractice ? 'Audio-word' : 'Play an audio and choose the right answer'}</span></Link>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                            setTextOfTheFifthPractice(true);
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                            setTextOfTheFifthPractice(false);
                    }} className='practice__navigation-link' to='/practice/audio-definition'><span
                    className='practice__navigation-title'>{!textOfTheFifthPractice ? 'Audio-definition' : 'Play an audio and choose the right answer'}</span></Link>
                <Link
                    onClick={() => setMenuIsOpen(true)}
                    onMouseEnter={() => {
                        if(width > 1023)
                            setTextOfTheSixthPractice(true);
                    }}
                    onMouseLeave={() => {
                        if(width > 1023)
                            setTextOfTheSixthPractice(false);
                    }} className='practice__navigation-link' to='/practice/memory-game'><span
                    className='practice__navigation-title'>{!textOfTheSixthPractice ? 'Memory game' : 'Find all correct pairs'}</span></Link>
            </div>
        </div>
    )
}