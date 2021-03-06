import React, {useEffect, useState} from "react";
import {wordCard} from "../../../interfaces/interfaces";
import {arrayShuffler} from "../../../services/arrayShuffler";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {incrementUserPoints} from "../../../state/userPoints/actions";
import {shuffleHandler} from "../../../services/arrayShuffler";
import {wordInterface} from "../../AdminSection/WordCreator/WordConstructor";
import {userInterface} from "../../../services/dataGetter";
import {server, userLoggedIn} from "../../../services/server";
import './boardGame.scss';

export const BoardGame = ({user, words, onGameFinish} : any) => {
    const dispatch = useDispatch();

    const [wordsForTheTask, setWordsForTheTask] = useState<wordCard[]>([]);
    const [finalArray, setFinalArray] = useState<wordCard[]>([]);

    useEffect(() => {
        if(words.length > 0) {
            setWordsForTheTask(arrayShuffler(words).slice(0, 9));
        }
    }, [words])

    const generateWords = () => {
        let modifiedArray = wordsForTheTask.map((word: wordInterface | any) => {
            return {...word, trans: !word.trans ? 'modified' : ''}
        })
        modifiedArray = [...wordsForTheTask, ...modifiedArray];
        const preparedFinalArray = shuffleHandler(modifiedArray).map((word: wordInterface, index: number) => ({...word, id: index + 1}))
        setFinalArray(preparedFinalArray)
    }

    const [firstChosenWord, setFirstChosenWord] = useState(false);
    const [secondChosenWord, setSecondChosenWord] = useState(false);
    const [globalCounter, setGlobalCounter] = useState(0);

    const [rightAnswer, setRightAnswer] = useState<boolean>(false);
    const [startTask, setStartTask] = useState(false);
    const [collectedPoints, setCollectedPoints] = useState(0);
    const [arrayToCompareChosenWords, setArrayToCompareChosenWords] = useState<string[]>([]);

    const logic = (evt: React.ChangeEvent<any>) => {
        const {value} = evt.target;
        setArrayToCompareChosenWords([...arrayToCompareChosenWords, value]);
        return arrayToCompareChosenWords;
    }

    const [matchedPair, setMatchedPair] = useState(false);

    const [completedPairs, setCompletedPairs]  = useState<any>([]);
    useEffect(() => {
        if (arrayToCompareChosenWords.length === 2 && arrayToCompareChosenWords[0] === arrayToCompareChosenWords[1]) {
            setMatchedPair(true);
            setRightAnswer(true);
            const toggled = finalArray.map((word: wordInterface) => {
                return {
                    ...word,
                    correct: word.word === arrayToCompareChosenWords[0] ? 'correct-pair' : word.correct
                }
            })
            setFinalArray(toggled);
            setCompletedPairs([...completedPairs, arrayToCompareChosenWords]);
            setCollectedPoints(collectedPoints + 1);
            setArrayToCompareChosenWords([]);
            setFirstChosenWord(false);
            setSecondChosenWord(false);
        }
        if (arrayToCompareChosenWords.length === 2 && arrayToCompareChosenWords[0] !== arrayToCompareChosenWords[1]) {
            setMatchedPair(false);
            const toggled = finalArray.map((word: wordInterface) => {
                return {
                    ...word,
                    correct: word.word === arrayToCompareChosenWords[0] ? 'incorrect-pair' : word.correct,
                }
            })
            setFinalArray(toggled);
            setCollectedPoints(collectedPoints);
            setArrayToCompareChosenWords([]);
            setFirstChosenWord(false);
            setSecondChosenWord(false);
        }
    }, [arrayToCompareChosenWords])
    const updateUserPoints = async () => {
        try {
            let {data: users}: any = await server
                .from('users')
            const chosenUser = users.find((person: userInterface) => person.nickname === user);
            const {data} = await server
                .from('users')
                .update([
                    {
                        globalPoints: chosenUser.globalPoints + collectedPoints,
                    }
                ])
                .match({nickname: user})
            console.log('user is updated =>', data);
        } catch (error) {
            console.error(error);
        }
    }

    const repeatHandler = async () => {
        setCollectedPoints(0)
        await updateUserPoints()
        onGameFinish()
        dispatch(incrementUserPoints(collectedPoints))
        generateWords();
        setMatchedPair(false);
        setArrayToCompareChosenWords([]);
        setGlobalCounter(0);
    }


    const collectedPointsHandler = async () => {
        await updateUserPoints()
        onGameFinish()
        dispatch(incrementUserPoints(collectedPoints))
    }

    return (
        <div className='board-game__global-wrapper'>
            <div className='board-game__task'>
                <div className='board-game__wrapper'>
                    <button
                        className='board-game__start'
                        hidden={finalArray.length > 0} type='button'
                        onClick={() => {
                            generateWords();
                            setMatchedPair(false);
                            setArrayToCompareChosenWords([]);
                            setStartTask(false);
                        }}>Start
                    </button>
                </div>
                {finalArray.length > 0 && <div className='board-game'>
                    {finalArray?.map((word: wordInterface | any) => {
                            return (
                                <div key={word.id}>
                                    <button
                                        value={word.word}
                                        style={{display: word.trans ? "none" : 'inherit'}}
                                        disabled={arrayToCompareChosenWords[0] === word.word && word.trans === undefined && firstChosenWord}
                                        onClick={(evt: React.ChangeEvent<any>) => {
                                            logic(evt);
                                            setFirstChosenWord(true);
                                            setGlobalCounter(globalCounter + 1);
                                        }}
                                        className={word.correct ? `board-answer ${word.correct}` : 'basic'}
                                    >
                                        {word.trans === undefined && word.word}
                                    </button>
                                    <button
                                        disabled={word.trans && arrayToCompareChosenWords[0] === word.word && secondChosenWord}
                                        key={word.word + word.pinyin}
                                        value={word.word}
                                        style={{display: !word.trans ? "none" : 'inherit'}}
                                        onClick={(evt: React.ChangeEvent<any>) => {
                                            logic(evt);
                                            setSecondChosenWord(true);
                                            setGlobalCounter(globalCounter + 1);
                                        }}
                                        className={word.correct ? `board-answer ${word.correct}` : 'basic'}
                                    >
                                        {word.trans !== undefined && word.pinyin}
                                    </button>
                                </div>
                            )
                        }
                    )}
                </div>}
            </div>
            {globalCounter === 18 &&
            <div className='board-game__winner-zone'>
                <Link
                    to='/practice'
                    className='board-game__exit'
                    onClick={collectedPointsHandler}
                >
                    To practice page
                </Link>
                <button
                    type='button'
                    className='board-game__restart'
                    onClick={repeatHandler}
                >
                    Repeat
                </button>
            </div>}
        </div>
    )
}
