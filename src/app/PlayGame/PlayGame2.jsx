import React, { useEffect, useState } from 'react';
import { tabSudoku, SudokuCopy, SudokuInit } from '../back/sudoku5';
import './PlayGame.css'
import Message, { Parametre, Pause, Winner } from '../../components/sudokuComponent';

const PlayGame2 = () => {
    const [grid, setGrid] = useState(tabSudoku())
    const [gridCopy, setGridCopy] = useState(SudokuCopy(grid))
    const [focus, setFocus] = useState(false)
    const [selectValue, setSelectValue] = useState({ value: null, lig: null, col: null })
    const [button, setButton] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [trueValue, setTrueValue] = useState([])
    const [falseValue, setFalseValue] = useState([])
    const [message, setMessage] = useState('')
    const [score, setScore] = useState(0)

    const [time, setTime] = useState(0)
    const [isActive, setIsActive] = useState(true)
    const [pause, setPause] = useState('none')

    const handlePause = () => {
        setIsActive(!isActive)
        setPause('none')
    }
    const toggle = () => {
        setIsActive(!isActive)
        setPause('block')
    }

    useEffect(() => {
        let interval = null
        if (isActive) {
            interval = setInterval(() => {
                setTime((second) => second + 1)
            }, 1000)
        } else if (!isActive && time !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive, time])

    const newGame = () => {
        SudokuInit()
        setGrid(tabSudoku())
        setGridCopy(SudokuCopy(tabSudoku()))
        setButton([1, 2, 3, 4, 5, 6, 7, 8, 9])
        setSelectValue({ value: null, lig: null, col: null })
        setTrueValue([])
        setMessage('')
        setFalseValue([])
        setTime(0)
        setFocus(false)
        setScore(0)
        setIsActive(!isActive)
        setPause('none')
    }

    // supprime les boutons de chiffres si le chiffre est complet
    const lastNumber = (index, number) => {
        let nombre = 0
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (gridCopy[i][j] == number && gridCopy[i][j] == grid[i][j]) {
                    nombre++
                }
            }
        }
        if (nombre >= 9) {
            let tab = button
            tab[index] = undefined
            setButton(tab)
        }
    }

    const testWin = () => {
        let nombre = 0
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (gridCopy[i][j] == grid[i][j]) {
                    nombre++
                }
            }
        }
        if (nombre >= 81) {
            setMessage("Bravo !!!")
            setIsActive(!isActive)
        }
    }

    const addTrueValue = (tabValue) => {
        let element = {
            lig: selectValue.lig,
            col: selectValue.col,
        }
        let tab = tabValue
        tab.push(element)
        setTrueValue(tab)
    }

    const addFalseValue = (value, tabValue) => {
        let element = {
            lig: selectValue.lig,
            col: selectValue.col,
            value: value
        }
        let tab = tabValue
        tab.push(element)
        setFalseValue(tab)
    }

    const testValue = (lig, col, tabValue) => {
        let out = false
        for (let i = 0; i < tabValue.length; i++) {
            if (tabValue[i].lig == lig && tabValue[i].col == col) {
                out = true
            }
        }
        return out
    }

    const handleFocus = () => {
        setFocus(true)
    }

    const handleClick = (value, ligIndex, colIndex) => {
        handleFocus()
        setSelectValue({ value: value, lig: ligIndex, col: colIndex })
    }

    const addValue = (lig, col, value) => {
        if (lig != null) {
            if (selectValue.value == '' || value == grid[lig][col] || gridCopy[lig][col] != grid[lig][col]) {
                handleClick(value, lig, col)
                let newGridCopy = gridCopy
                newGridCopy[lig][col] = value
                if (value == grid[lig][col]) {
                    testWin()
                    setScore(score + 100)
                    addTrueValue(trueValue)
                    setGridCopy(newGridCopy)
                } else {
                    setScore(score - 10)
                    addFalseValue(value, falseValue)
                    if (falseValue.length >= 3) {
                        setMessage("Partie terminer")
                    }
                }
                if (falseValue.length >= 3) {
                    setIsActive(!isActive)
                }
            }
        }
    }

    return (
        <>
            <div className="container2">
                <Parametre />
                <div className="features">
                    <div className="overlay" style={{ display: pause, zIndex: 500 }} onClick={handlePause}></div>
                    <Pause newPartie={newGame} Time={time} Pause={pause} click={handlePause} />
                    <div className="props">
                        <p>Difficulté</p>
                        <p style={{ fontWeight: 700 }}>Par défaut</p>
                    </div>
                    <div className="props">
                        <p>Erreurs </p>
                        <p style={{ fontWeight: 700 }}> {falseValue.length}/3</p>
                    </div>
                    <div className="props">
                        <p>Score</p>
                        <p style={{ fontWeight: 700 }}>{score}</p>
                    </div>
                    <div className="btnPause">
                        <div className="props">
                            <p>Temps</p>
                            <p style={{ fontWeight: 700 }}>{Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</p>
                        </div>
                        <button onClick={() => toggle()}><i className='fa fa-pause' style={{ fontWeight: 400, padding: "2px", fontSize: "15px" }}></i></button>
                    </div>
                    <Message style={{ display: falseValue.length >= 3 ? 'block' : 'none', zIndex: 1000 }} newGame={newGame} />
                    <Winner score={score} time={time} style={{ display: message == "Bravo !!!" ? 'block' : 'none', zIndex: 1000 }} newGame={newGame} />
                </div>
                <div className="tableau">
                    {gridCopy.map((ligne, ligIndex) => (
                        <div key={ligIndex} className="sudoku-row">
                            {ligne.map((value, colIndex) => {
                                let valueTest = value == selectValue.value && value !== ''
                                let lig = ligIndex == selectValue.lig
                                let col = colIndex == selectValue.col
                                return (
                                    <input
                                        readOnly
                                        key={colIndex}
                                        type="text"
                                        value={value}
                                        onBlur={handleFocus}
                                        onClick={() => handleClick(value, ligIndex, colIndex)}
                                        className={`btnSudoku ${valueTest && focus ? "selectValue" :
                                            (col || lig) && focus ? "select-lig-col" : ""} 
                                        ${testValue(ligIndex, colIndex, trueValue) ? "userInput" : ""}
                                        ${testValue(ligIndex, colIndex, falseValue) ? "wrongInput" : ""}`}
                                    />
                                )
                            })}
                        </div>
                    ))}
                </div>
                {message}
                <div className="nombre">
                    {
                        button.map((buttonValue, index) => {
                            lastNumber(index, buttonValue)
                            return (
                                <button
                                    key={index}
                                    onClick={() => addValue(selectValue.lig, selectValue.col, buttonValue)}
                                >
                                    {buttonValue}
                                </button>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PlayGame2