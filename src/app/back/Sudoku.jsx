import React, { Component } from 'react';
import { tabSudoku, SudokuCopy } from './sudoku5';
import './PlayGame.css'

class Sudoku extends Component {
    grid = tabSudoku()
    constructor(props) {
        super(props)
        this.state = {
            gridCopy: SudokuCopy(this.grid),
            focus: false,
            selectValue: { value: null, lig: null, col: null },
            button: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            trueValue: [],
            falseValue: [],
            win: ''
        }
    }

    // supprime les boutons de chiffres si le chiffre est complet
    lastNumber = (index, number) => {
        let nombre = 0
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.gridCopy[i][j] == number && this.state.gridCopy[i][j] == this.grid[i][j]) {
                    nombre++
                }
            }
        }
        if (nombre >= 9) {
            let tab = this.state.button
            tab[index] = undefined
            this.setState({ button: tab })
        }
    }

    testWin = () => {
        let nombre = 0
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.state.gridCopy[i][j] == this.grid[i][j]) {
                    nombre++
                }
            }
        }
        if (nombre >= 81) {
            this.setState({ win: "Bravo !!!" })
        }
    }

    addTrueValue = (tabValue) => {
        let element = {
            lig: this.state.selectValue.lig,
            col: this.state.selectValue.col,
        }
        let tab = tabValue
        tab.push(element)
        this.setState({ trueValue: tab })
    }

    addFalseValue = (value, tabValue) => {
        let element = {
            lig: this.state.selectValue.lig,
            col: this.state.selectValue.col,
            value: value
        }
        let tab = tabValue
        tab.push(element)
        this.setState({ falseValue: tab })
    }

    testValue = (lig, col, tabValue) => {
        let out = false
        for (let i = 0; i < tabValue.length; i++) {
            if (tabValue[i].lig == lig && tabValue[i].col == col) {
                out = true
            }
        }
        return out
    }

    handleFocus = () => {
        this.setState({ focus: true })
    }

    handleClick = (value, ligIndex, colIndex) => {
        this.handleFocus()
        this.setState({ selectValue: { value: value, lig: ligIndex, col: colIndex } })
    }

    addValue = (lig, col, value) => {
        if (this.state.selectValue.value == '' || value == this.grid[lig][col] || this.state.gridCopy[lig][col] != this.grid[lig][col]) {
            this.handleClick(value, lig, col)
            let newGridCopy = this.state.gridCopy
            newGridCopy[lig][col] = value
            if (value == this.grid[lig][col]) {
                this.testWin()
                this.addTrueValue(this.state.trueValue)
                this.setState({ gridCopy: newGridCopy })
            } else {
                this.addFalseValue(value, this.state.falseValue)
            }
        }
    }

    render() {
        return (
            <>
                <div className="tableau">
                    {this.state.gridCopy.map((ligne, ligIndex) => (
                        <div key={ligIndex} className="sudoku-row">
                            {ligne.map((value, colIndex) => {
                                let valueTest = value == this.state.selectValue.value && value !== ''
                                let lig = ligIndex == this.state.selectValue.lig
                                let col = colIndex == this.state.selectValue.col
                                return (
                                    <input
                                        readOnly
                                        key={colIndex}
                                        type="text"
                                        value={value}
                                        onBlur={this.handleFocus}
                                        onClick={() => this.handleClick(value, ligIndex, colIndex)}
                                        className={`btnSudoku ${valueTest && this.state.focus ? "selectValue" :
                                            (col || lig) && this.state.focus ? "select-lig-col" : ""} 
                                            ${this.testValue(ligIndex, colIndex, this.state.trueValue) ? "userInput" : ""}
                                            ${this.testValue(ligIndex, colIndex, this.state.falseValue) ? "wrongInput" : ""}`}
                                    />
                                )
                            })}
                        </div>
                    ))}
                </div>
                {this.state.win}
                <div className="nombre">
                    {
                        this.state.button.map((buttonValue, index) => {
                            this.lastNumber(index, buttonValue)
                            return (
                                <button
                                    key={index}
                                    onClick={() => this.addValue(this.state.selectValue.lig, this.state.selectValue.col, buttonValue)}
                                >
                                    {buttonValue}
                                </button>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}

export default Sudoku