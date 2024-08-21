import { Cell } from "../cell/cell";
import style from './map.module.css';
import React, { useState, useEffect } from 'react';
import { Overlay } from '../overlay/overlay';
import { EndPopUp } from "../endGamePopUp/endpopup";

type CellType = number | string;

interface MapProps {
    map: CellType[][];
    isVisible: boolean;
}

export const Map = (props: MapProps) => {
    const [clickedCells, setClickedCells] = useState<Set<string>>(new Set());
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [isGameEnd, setIsGameEnd] = useState<boolean>(false);
    const [isWin, setIsWin] = useState<boolean>(false);
    const [checkedMines, setCheckedMines] = useState<number>(0);

    useEffect(() => {
        if (isGameEnd) {
            if (isWin) {
                openPopup();
            }
        }
    }, [isGameEnd, isWin]);

    const onCellClick = (id: string) => {

        const [i, j] = id.split('_').map(Number);
        console.log(id, i, j, props.map[i][j], isGameEnd, isWin)
        if (!isGameEnd) {
            if (props.map[i][j] === 'x') {
                setIsGameEnd(true);
                revealAllMines();
                openPopup();
            } else {
                revealCells(i, j);
            }
        }
    };

    const revealAllMines = () => {
        const newClickedCells = new Set(clickedCells);
        props.map.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 'x') {
                    newClickedCells.add(`${i}_${j}`);
                }
            });
        });
        setClickedCells(newClickedCells);
        checkWin();
    };

    const closeEndPopUp = () => {
        closePopup();
        window.location.reload();
    };

    const openPopup = () => {
        setIsOpened(true);
    };

    const closePopup = () => {
        setIsOpened(false);
    };

    const revealCells = (i: number, j: number) => {
        const newClickedCells = new Set(clickedCells);
        let queue: [number, number][] = [[i, j]];

        while (queue.length > 0) {
            const [x, y] = queue.shift()!;

            if (newClickedCells.has(`${x}_${y}`)) continue;

            newClickedCells.add(`${x}_${y}`);

            if (typeof props.map[x][y] === 'number' && props.map[x][y] > 0) {
                continue;
            }

            const directions: [number, number][] = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];

            directions.forEach(([dx, dy]) => {
                const newX = x + dx;
                const newY = y + dy;

                if (newX >= 0 && newX < props.map.length && newY >= 0 && newY < props.map[0].length && !newClickedCells.has(`${newX}_${newY}`)) {
                    queue.push([newX, newY]);
                }
            });
        }

        setClickedCells(newClickedCells);
        console.log(clickedCells)
        checkWin();
    };

    const checkWin = () => {
        let nonMinesCount = 0;
        let revealedCount = 1;

        props.map.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell !== 'x') {
                    nonMinesCount++;
                    if (clickedCells.has(`${i}_${j}`)) {
                        revealedCount++;
                    }
                }
            });
        });
        console.log(nonMinesCount, revealedCount)
        if (nonMinesCount === revealedCount) {
            setIsWin(true);
            setIsGameEnd(true);
        }
    };

    const resetMap = () => {
        setClickedCells(new Set());
        setIsGameEnd(false);
        setIsWin(false);
    };

    useEffect(() => {
        resetMap();
    }, [props.map]);

    return (
        <div>
            {props.isVisible && (
                <div className={style['map-wrapper']}>
                    {props.map.map((row, i) => (
                        <div className={style['map-row']} key={i}>
                            {row.map((cell, j) => (
                                <Cell
                                    key={`${i}_${j}`}
                                    value={cell.toString()}
                                    id={`${i}_${j}`}
                                    isClicked={clickedCells.has(`${i}_${j}`)}
                                    onCellClick={onCellClick}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
            <Overlay isOpened={isOpened} closePopup={closePopup} />
            <EndPopUp isOpened={isOpened} isWin={isWin} closePopup={closeEndPopUp} />
        </div>
    );
};
