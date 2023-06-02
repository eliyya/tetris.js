import { SHAPES, COLORS, shape, board } from './variables.js'

export function getRandomShape() {
    return structuredClone({
        ...getRandom(SHAPES),
        color: getRandom(COLORS),
    })
}

export function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)]
}

function joinArrys(arr1: any[][], arr2: any[][]): any[][] {
    return arr1.map((row, i) => row.concat(arr2[i]))
}

export const getDisplaay = (score: number, next: shape, storage: shape | null) => [
    ['TETRIS'],
    ['  by'],
    ['eliyya'],
    [''],
    ['SCORE:'],
    [score],
    [''],
    ['NEXT:'],
    [...next.shape[0][0]],
    [...(next.shape[0][1] ?? [''])],
    [...(next.shape[0][2] ?? [''])],
    [...(next.shape[0][3] ?? [''])],
    [''],
    ['STORAGE:'],
    [...(storage?.shape[0][0] ?? [''])],
    [...(storage?.shape[0][1] ?? [''])],
    [...(storage?.shape[0][2] ?? [''])],
    [...(storage?.shape[0][3] ?? [''])],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]

export function transformBoard(board: board, score: number, nextShape: shape, storageShape: shape | null) {
    let formtBoard = '██'.repeat(12) + '\n'
    const display = getDisplaay(score, nextShape, storageShape)
    const r = {
        0: '  ',
        1: '██',
    }
    for (let y = 0; y < board.length; y++) {
        formtBoard += '██'
        for (let x = 0; x < board[y].length; x++) {
            formtBoard += r[board[y][x]]
            if (x === 9) formtBoard += '██  '
        }
        // @ts-ignore
        formtBoard += display[y].map(d => (y === 5 ? d : r[d] ?? d)).join('')
        formtBoard += '\n'
    }
    formtBoard += '██'.repeat(12) + '\n'
    return formtBoard
}

export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function renderBoard(board: board, score: number, nextShape: shape, storageShape: shape | null) {
    console.clear()
    console.log(transformBoard(board, score, nextShape, storageShape))
}

export function drawShape(shape: shape, board: board) {
    for (let y = 0; y < shape.shape[shape.position % 4].length; y++)
        for (let x = 0; x < shape.shape[shape.position % 4][y].length; x++)
            if (shape.shape[shape.position % 4][y][x]) board[y + shape.y][x + shape.x] = 1
}

export function clearShape(shape: shape, board: board) {
    for (let y = 0; y < shape.shape[shape.position % 4].length; y++)
        for (let x = 0; x < shape.shape[shape.position % 4][y].length; x++)
            if (shape.shape[shape.position % 4][y][x]) board[y + shape.y][x + shape.x] = 0
}

export function canDown(shape: shape, board: board) {
    board = structuredClone(board)
    clearShape(shape, board)
    for (let y = 0; y < shape.shape[shape.position % 4].length; y++)
        for (let x = 0; x < shape.shape[shape.position % 4][y].length; x++)
            if (shape.shape[shape.position % 4][y][x])
                if (!board[y + shape.y + 1] || board[y + shape.y + 1][x + shape.x] !== 0) return false
    return true
}

export function tryDown(shape: shape, board: board) {
    if (!canDown(shape, board)) return false
    clearShape(shape, board)
    shape.y++
    drawShape(shape, board)
    return true
}

export function canLeft(shape: shape, board: board) {
    board = structuredClone(board)
    clearShape(shape, board)
    for (let y = 0; y < shape.shape[shape.position % 4].length; y++)
        for (let x = 0; x < shape.shape[shape.position % 4][y].length; x++)
            if (shape.shape[shape.position % 4][y][x]) if (board[y + shape.y][x + shape.x - 1] !== 0) return false
    return true
}

export function tryLeft(shape: shape, board: board) {
    if (!canLeft(shape, board)) return false
    clearShape(shape, board)
    shape.x--
    drawShape(shape, board)
    return true
}

export function canRight(shape: shape, board: board) {
    board = structuredClone(board)
    clearShape(shape, board)
    for (let y = 0; y < shape.shape[shape.position % 4].length; y++)
        for (let x = 0; x < shape.shape[shape.position % 4][y].length; x++)
            if (shape.shape[shape.position % 4][y][x]) if (board[y + shape.y][x + shape.x + 1] !== 0) return false
    return true
}

export function tryRight(shape: shape, board: board) {
    if (!canRight(shape, board)) return false
    clearShape(shape, board)
    shape.x++
    drawShape(shape, board)
    return true
}

export function breackLines(board: board) {
    let lines = 0
    for (let y = board.length - 1; y >= 0; y--) {
        if (board[y].every(v => v)) {
            lines++
            board.splice(y, 1)
        } else if (board[y].every(v => !v)) break
    }
    for (let i = lines; i; i--) board.unshift(new Array(10).fill(0))
    return lines
}

export function canRotate(shape: shape, board: board) {
    board = structuredClone(board)
    shape = structuredClone(shape)
    clearShape(shape, board)
    shape.position++
    for (let y = 0; y < shape.shape[shape.position % 4].length; y++)
        for (let x = 0; x < shape.shape[shape.position % 4][y].length; x++)
            if (shape.shape[shape.position % 4][y][x]) if (board[y + shape.y][x + shape.x] !== 0) return false
    return true
}

export function tryRotate(shape: shape, board: board) {
    if (!canRotate(shape, board)) return false
    clearShape(shape, board)
    shape.position++
    drawShape(shape, board)
    return true
}

// // TETRIS
// console.log(`
// ██████  ██████  ██████  ████    ██████    ████
//   ██    ██        ██    ██  ██    ██    ██
//   ██    ████      ██    ████      ██    ██████
//   ██    ██        ██    ██  ██    ██        ██
//   ██    ██████    ██    ██  ██  ██████  ████
// `)
