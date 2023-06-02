import { createInterface } from 'node:readline'
import EventEmitter from 'node:events'

export const COLORS = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink']

export type shape = {
    shape: [
        [(0 | 1)[], (0 | 1)[], (0 | 1)[], (0 | 1)[]],
        [(0 | 1)[], (0 | 1)[], (0 | 1)[], (0 | 1)[]],
        [(0 | 1)[], (0 | 1)[], (0 | 1)[], (0 | 1)[]],
        [(0 | 1)[], (0 | 1)[], (0 | 1)[], (0 | 1)[]],
    ]
    color: string
    x: number
    y: number
    position: number
}

export const SHAPES: shape[] = [
    {
        shape: [
            [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 1, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ],
        ],
        color: 'red',
        x: 3,
        y: 0,
        position: 0,
    },
    {
        shape: [
            [
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
            ],
        ],
        color: 'green',
        x: 3,
        y: 0,
        position: 0,
    },
    {
        shape: [
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 0, 0],
                [0, 1, 1, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
            ],
        ],
        color: 'blue',
        x: 3,
        y: 0,
        position: 0,
    },
]

export type board = (0 | 1)[][]
export const BOARD: board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export interface TetrisEvents {
    frame: []
    keypress: [key: key]
}

interface Events extends EventEmitter {
    on<K extends keyof TetrisEvents>(event: K, listener: (...args: TetrisEvents[K]) => any): this
}

export const EVENTS = new EventEmitter() as Events

const rl = createInterface({ input: process.stdin, output: process.stdout })

// @ts-ignore
rl.input.on('keypress', (_, key) => EVENTS.emit('keypress', key))
// @ts-ignore
rl.input.setRawMode(true)
// @ts-ignore
rl.input.resume()

export type key = {
    sequence: string
    name: string
    ctrl: boolean
    meta: boolean
    shift: boolean
}
