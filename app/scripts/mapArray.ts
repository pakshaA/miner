import { settings } from "../templates/templates";

type Cell = number | string

export const initArray = (id : number) : Cell[][] => {
    let board: Cell[][];
    const setting = settings[id];
    let placed_mines: number = 0;
    const MAX_PLACED_MINES: number = setting.mines;
    const W: number = setting.size.w;
    const H: number = setting.size.h;
    
    board = Array.from({length: H}, ()=> Array(W).fill(0));
    console.log(board)
    for (let i: number = 0; i < H; i++) {
        for (let j: number = 0; j < W; j++) {
            board[i][j] = 0;
        }
    }
    while (placed_mines < MAX_PLACED_MINES) {
        let row: number = Math.floor(Math.random() * H);
        let col: number = Math.floor(Math.random() * W);

        if (board[row][col] !== 'x') {
            board[row][col] = 'x';
            placed_mines += 1;
        }
        
    }
    makeAdjacentCells(board, W, H);
    return board;
}

const makeAdjacentCells = (board : Cell[][], W : number, H : number) : void => {
    function incrementAdjacent(x: number, y: number) : void {
        for (let i: number = Math.max(0, x - 1); i < Math.min(x + 2 >= H ? H : x + 2 , H); i++) {
            for (let j: number = Math.max(0, y - 1); j < Math.min(y + 2 >= W ? W : y + 2 , W); j++) {
                if (board[i][j] !== 'x') {
                    board[i][j] = (board[i][j] as number) + 1
                }
            }
        }
    }

    for (let i: number = 0; i < H; i++) {
        for (let j: number = 0; j < W; j++) {
            if (board[i][j] === 'x') {
                incrementAdjacent(i, j)
            }
        }
    }
}