import {
    breackLines,
    canDown,
    clearShape,
    drawShape,
    getRandomShape,
    renderBoard,
    sleep,
    tryDown,
    tryLeft,
    tryRight,
    tryRotate,
} from './utils.js'
import { BOARD, EVENTS, shape } from './variables.js'

let actualShape = getRandomShape()
let nextShape = getRandomShape()
let storageShape: shape | null = null
let canStorage = true
let score = 0

EVENTS.on('keypress', key => {
    if (key.ctrl && key.name === 'c') process.exit()
    if (['left', 'a'].includes(key.name) && tryLeft(actualShape, BOARD))
        renderBoard(BOARD, score, nextShape, storageShape)
    else if (['right', 'd'].includes(key.name) && tryRight(actualShape, BOARD))
        renderBoard(BOARD, score, nextShape, storageShape)
    else if (['down', 's'].includes(key.name) && tryDown(actualShape, BOARD))
        renderBoard(BOARD, score, nextShape, storageShape)
    else if (['c'].includes(key.name)) {
        if (storageShape && canStorage) [actualShape, storageShape] = [storageShape, actualShape]
        else if (canStorage) [actualShape, storageShape, nextShape] = [nextShape, actualShape, getRandomShape()]
        canStorage = false
        renderBoard(BOARD, score, nextShape, storageShape)
    } else if (['space'].includes(key.name)) {
        while (tryDown(actualShape, BOARD));
        EVENTS.emit('frame', BOARD)
    } else if (['up', 'w', 'x'].includes(key.name) && tryRotate(actualShape, BOARD, 1))
        renderBoard(BOARD, score, nextShape, storageShape)
    else if (['z'].includes(key.name) && tryRotate(actualShape, BOARD, -1))
        renderBoard(BOARD, score, nextShape, storageShape)
    // else console.log(key)
})

EVENTS.on('frame', () => {
    if (canDown(actualShape, BOARD)) {
        clearShape(actualShape, BOARD)
        actualShape.y++
        drawShape(actualShape, BOARD)
    } else {
        score += breackLines(BOARD)
        ;[actualShape, nextShape, canStorage] = [nextShape, getRandomShape(), true]
        drawShape(actualShape, BOARD)
    }
    renderBoard(BOARD, score, nextShape, storageShape)
})

// first frame
console.clear()
drawShape(actualShape, BOARD)
renderBoard(BOARD, score, nextShape, storageShape)
await sleep(1000)

// Game loop
while (true) {
    EVENTS.emit('frame', BOARD)
    await sleep(1000)
}
