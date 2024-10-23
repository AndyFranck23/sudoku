function CheckLine(lig) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < A.length; j++) {
            if (sudoku[lig][i] == A[j]) {
                A.splice(j, 1)
            }
            incrementation++
        }
    }
}

function CheckColumn(col) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < A.length; j++) {
            if (sudoku[i][col] == A[j]) {
                A.splice(j, 1)
            }
            incrementation++
        }
    }
}

function CheckGrid(yGrid, xGrid) {
    for (let i = yGrid * 3; i < yGrid * 3 + 3; i++) {
        for (let j = xGrid * 3; j < xGrid * 3 + 3; j++) {
            for (let k = 0; k < A.length; k++) {
                if (sudoku[i][j] == A[k]) {
                    A.splice(k, 1)
                }
                incrementation++
            }
        }
    }
}

function detectSudokuUndefined() {
    let out = false
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] == undefined) {
                out = true
                break
            }
            incrementation++
        }
    }
    return out
}

function sudokuCompletGrid(y, x) {
    for (let i = y * 3; i < y * 3 + 3; i++) {
        for (let j = x * 3; j < x * 3 + 3; j++) {
            CheckGrid(y, x)
            CheckLine(i)
            CheckColumn(j)
            let randNumber = A[Math.floor(Math.random() * (A.length))]
            sudoku[i][j] = randNumber
            A = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    }
}

let sudoku = Array(9).fill(null).map(() => Array(9).fill(''));

export const SudokuInit = () => {
    sudoku = Array(9).fill(null).map(() => Array(9).fill(''));
    A = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    erreur = true
}

let A = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let incrementation = 0
let erreur = true

export const tabSudoku = () => {
    while (erreur) {
        for (let lig = 0; lig < 3; lig++) {
            for (let col = 0; col < 3; col++) {
                sudokuCompletGrid(lig, col)
            }
        }
        erreur = detectSudokuUndefined()
        if (erreur) {
            sudoku = Array(9).fill(null).map(() => Array(9).fill(''));
        }
    }
    return sudoku
}

export const SudokuCopy = (tab) => {
    let sudoku2 = []
    for (let i = 0; i < 9; i++) {
        sudoku2[i] = []
        for (let j = 0; j < 9; j++) {
            sudoku2[i][j] = tab[i][j]
        }
    }
    let unknow = 30
    while (unknow != 0) {
        let randX = Math.floor(Math.random() * (9))
        let randY = Math.floor(Math.random() * (9))
        if (sudoku2[randY][randX] != '') {
            sudoku2[randY][randX] = ''
            unknow--
        }
    }
    return sudoku2
}

export function Line(tab, lig, value) {
    let out = false
    for (let i = 0; i < 9; i++) {
        if (tab[lig][i] == value) {
            out = true
        }
    }
    return out
}

export function Column(tab, col, value) {
    let out = false
    for (let i = 0; i < 9; i++) {
        if (tab[i][col] == value) {
            out = true
        }
    }
    return out
}

export function Grid(tab, yGrid, xGrid, value) {
    let out = false
    for (let i = yGrid * 3; i < yGrid * 3 + 3; i++) {
        for (let j = xGrid * 3; j < xGrid * 3 + 3; j++) {
            if (tab[i][j] == value) {
                out = true
            }
        }
    }
    return out
}

export const mistakeValue = (grid, row, col, value) => {
    let line = Line(grid, row, value)
    let column = Column(grid, col, value)
    let casee = Grid(grid, parseInt(row / 3), parseInt(col / 3), value)
    let out = true
    if (line || column || casee) {
        out = false
    }
    return out
}
