import React, { useEffect, useState } from 'react';
import { tabSudoku, SudokuCopy, SudokuInit } from './sudoku5';
import Message, { Pause, Winner } from '../components/MyComponent';

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
    const [chance, setChance] = useState(3)
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

    const testValue2 = (lig, col, tabValue) => {
        let out = false
        for (let i = 0; i < tabValue.length; i++) {
            if (tabValue[i].lig == lig && tabValue[i].col == col && gridCopy[lig][col] != grid[lig][col]) {
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
                    if (falseValue.length >= chance) {
                        setMessage("Partie terminer")
                    }
                }
                if (falseValue.length >= chance) {
                    setIsActive(!isActive)
                }
            }
        }
    }

    const moreLuck = () => {
        setChance(chance + 1)
        handlePause()
    }

    return (
        <div className='h-screen bg-bgColor flex items-center justify-center'>
            <div className="text-center text-colorTable flex justify-center dis2:h-full" style={{ fontWeight: '400' }}>
                <div className='dis2:w-[450px] bg-white py-3 w-screen'>
                    <div className="flex justify-around mb-10">
                        <div className="text-center font-bold text-xl">
                            <p>Sudoku<span className='font-bold text-blue-500'>.</span>com</p>
                        </div>
                        {/* <div className="flex justify-end">
                            <button className='bg-transparent border-none text-blue-500 dis:text-xs'>Thème</button>
                            <button className='bg-transparent border-none text-blue-500 dis:text-xs'>Paramètre</button>
                        </div> */}
                    </div>
                    <div className="flex justify-around text-sm mb-5 dis:text-xs">
                        <div className="">
                            <p className="text-xs">Difficulté</p>
                            <p className='font-bold'>Par défaut</p>
                        </div>
                        <div className="">
                            <p className="text-xs">Erreurs</p>
                            <p className='font-bold'>{falseValue.length}/{chance}</p>
                        </div>
                        <div className="">
                            <p className="text-xs">Score</p>
                            <p className='font-bold'>{score}</p>
                        </div>
                        <div className="">
                            <p className="text-xs">Temps</p>
                            <p className='font-bold'>{Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</p>
                        </div>
                        <div className="flex items-center">
                            <button onClick={toggle} className='border-none p-2 rounded-2xl'><i className='fa fa-pause'></i></button>
                        </div>
                    </div>
                    <Pause Time={time} Pause={pause} click={handlePause} newPartie={newGame} />
                    <Message error={falseValue.length} click={newGame} luck={moreLuck} display={falseValue.length >= chance ? "block" : "none"} />
                    <Winner time={time} score={score} click={newGame} display={message == "Bravo !!!" ? "block" : "none"} />
                    <div className="flex justify-center">
                        <div className='border border-solid border-2'>
                            {gridCopy.map((ligne, ligIndex) => (
                                <div key={ligIndex} className="flex">
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
                                                className={`
                                                    ${colIndex == 2 || colIndex == 5 ? "border-r-2 border-r-black" : ""}
                                                    ${ligIndex == 2 || ligIndex == 5 ? "border-b-2 border-b-black" : ""}
                                                    text-xl opacity-80 w-[30px] h-[30px] dis:w-[22px] dis:h-[22px] bg-bgTable outline-none text-center border border-solid border-borderTable hover:bg-bgHover focus:outline
                                                    ${valueTest && focus ? "bg-selectValue" : (col || lig) && focus ? "bg-selectLigCol" : ""} 
                                                    ${testValue(ligIndex, colIndex, trueValue) ? "text-userInput" : ""}
                                                    ${testValue2(ligIndex, colIndex, falseValue) ? "text-wrongInput" : ""}
                                                `}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between mt-20">
                        {
                            button.map((buttonValue, index) => {
                                lastNumber(index, buttonValue)
                                return (
                                    <button
                                        key={index}
                                        className='border-none bg-transparent text-blue-500 text-xl p-2'
                                        onClick={() => addValue(selectValue.lig, selectValue.col, buttonValue)}
                                    >
                                        {buttonValue}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayGame2