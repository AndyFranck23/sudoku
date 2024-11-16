import React, { useEffect, useState } from 'react';
import { tabSudoku, SudokuCopy, SudokuInit } from './sudoku5';
import Message, { Pause, Winner } from '../components/MyComponent';

const PlayGame2 = () => {
    const [grid, setGrid] = useState(tabSudoku())
    const [gridCopy, setGridCopy] = useState(SudokuCopy(grid))
    const [focus, setFocus] = useState(false)
    const [selectValue, setSelectValue] = useState({ value: null, lig: null, col: null })
    const [button, setButton] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
    const [valueType, setValueType] = useState([])
    const [message, setMessage] = useState('')
    const [score, setScore] = useState(0)
    const [chance, setChance] = useState(3)
    const [time, setTime] = useState(0)
    const [isActive, setIsActive] = useState(true)
    const [pause, setPause] = useState('none')
    const [falseValue, setFalseValue] = useState(0)
    const [position, setPosition] = useState(-1)


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
        setValueType([])
        setMessage('')
        setTime(0)
        setFocus(false)
        setScore(0)
        setIsActive(!isActive)
        setPause('none')
        setChance(3)
        setFalseValue(0)
        setPosition(-1)
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

    const addValueType = (tabValue, veriter, value) => {
        let element = {
            lig: selectValue.lig,
            col: selectValue.col,
            val: value,
            veriter: veriter,
        }
        let tab = tabValue
        tab.push(element)
        setValueType(tab)
        setPosition(position + 1)
    }

    const testValue = (lig, col, tabValue) => {
        let out = false
        for (let i = 0; i < tabValue.length; i++) {
            if (tabValue[i].lig == lig && tabValue[i].col == col && tabValue[i].veriter == true) {
                out = true
            }
        }
        return out
    }

    const testValue2 = (lig, col, tabValue) => {
        let out = false
        for (let i = 0; i < tabValue.length; i++) {
            if (tabValue[i].lig == lig && tabValue[i].col == col && gridCopy[lig][col] != grid[lig][col] && tabValue[i].veriter == false) {
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
        if (lig != null && value != undefined) {
            if (selectValue.value == '' || value == grid[lig][col] || gridCopy[lig][col] != grid[lig][col]) {
                handleClick(value, lig, col)
                let newGridCopy = gridCopy
                newGridCopy[lig][col] = value
                if (value == grid[lig][col]) {
                    testWin()
                    setScore(score + 100)
                    addValueType(valueType, true, value)
                    setGridCopy(newGridCopy)
                } else {
                    setScore(score - 10)
                    addValueType(valueType, false, value)
                    setFalseValue(falseValue + 1)
                    if (falseValue >= chance - 1) {
                        setIsActive(!isActive)
                        setMessage("Partie terminer")
                    }
                }
            }
        }
    }

    const moreLuck = () => {
        setChance(chance + 1)
        handlePause()
    }

    const btnRetour = () => {
        if (position >= 0) {
            let lig = valueType[position].lig
            let col = valueType[position].col
            let ver = valueType[position].veriter
            if (ver == true) {
                setScore(score - 100)
            } else {
                setScore(score + 10)
            }
            let newGridCopy = gridCopy
            if (position > 0 && lig == valueType[position - 1].lig && col == valueType[position - 1].col) {
                newGridCopy[lig][col] = valueType[position - 1].val
            } else {
                newGridCopy[lig][col] = ''
            }
            setGridCopy(newGridCopy)
            setPosition(position - 1)
            let tb = button
            tb[valueType[position].val - 1] = valueType[position].val
            setButton(tb)
            let tab = valueType
            tab.pop()
            setValueType(tab)
        }
    }

    return (
        <div className='h-screen bg-bgColor flex items-center justify-center'>
            <div className="shadow-xl text-center text-colorTable flex justify-center dis2:h-full" style={{ fontWeight: '400' }}>
                <div className='dis2:w-[450px] bg-white py-3 w-screen'>
                    <div className="flex justify-around mb-5">
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
                            <p className='font-bold'>{falseValue}/{chance}</p>
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
                    <Message error={falseValue} click={newGame} luck={moreLuck} display={falseValue >= chance ? "block" : "none"} />
                    <Winner time={time} score={score} click={newGame} display={message == "Bravo !!!" ? "block" : "none"} />
                    <div className="flex justify-center">
                        <div className='border border-solid border-2'>
                            {gridCopy.map((ligne, ligIndex) => (
                                <div key={ligIndex} className="flex">
                                    {ligne.map((value, colIndex) => {
                                        let lig = ligIndex == selectValue.lig
                                        let col = colIndex == selectValue.col
                                        let caseX = colIndex >= (parseInt(selectValue.col / 3) * 3) && colIndex < ((parseInt(selectValue.col / 3) * 3) + 3)
                                        let caseY = ligIndex >= (parseInt(selectValue.lig / 3) * 3) && ligIndex < ((parseInt(selectValue.lig / 3) * 3) + 3)
                                        let valueTest = value == selectValue.value && value !== '' && (col && lig) == false
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
                                                    text-2xl opacity-80 w-[31px] h-[31px] dis:w-[22px] dis:h-[22px] outline-none text-center border border-solid border-borderTable focus:outline
                                                    ${(col && lig) && focus ? "bg-blue-300" : valueTest && focus ? "bg-selectValue" : ((caseX && caseY) || (col || lig)) && focus ? "bg-selectLigCol" : ""} 
                                                    ${testValue(ligIndex, colIndex, valueType) ? "text-blue-500" : ""}
                                                    ${testValue2(ligIndex, colIndex, valueType) ? "text-wrongInput" : ""}
                                                `}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-around items-center dis:my-7 my-5">
                        <div className="p-0 m-0">
                            <button onClick={btnRetour} className='border-none bg-transparent text-colorTable'>
                                <img src="./icons64.png" className='h-[30px] w-[30px] opacity-75' /><br />
                                <p className='font-bold text-colorTable text-xs ps:text-sm' >Annuler</p>
                            </button>
                        </div>
                        {/* <div className="">
                            <button onClick={btnRetour}>Effacer</button>
                        </div>
                        <div className="">
                            <button onClick={btnRetour}>Note</button>
                        </div>
                        <div className="">
                            <button onClick={btnRetour}>Indice</button>
                        </div> */}
                    </div>
                    <div className="flex justify-between">
                        {
                            button.map((buttonValue, index) => {
                                lastNumber(index, buttonValue)
                                return (
                                    <button
                                        key={index}
                                        className='border-none bg-transparent text-blue-500 text-2xl px-2'
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