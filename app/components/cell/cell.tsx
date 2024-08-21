import style from './cell.module.css';
import React from 'react';

interface CellProps {
    id: string;
    value: string;
    isClicked: boolean;
    onCellClick: (id: string) => void;
}

export const Cell = (props: CellProps) => {
    const onClickOpenCell = () => {
        props.onCellClick(props.id);
    };

    return (
        <button
            className={`${style['cell']} ${props.isClicked ? style['clicked'] : style['not-clicked']}`}
            id={props.id}
            value={props.value}
            onClick={onClickOpenCell}
        >
            {props.value}
        </button>
    );
}