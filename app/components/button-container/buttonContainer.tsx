import { MouseEventHandler } from 'react';
import style from './buttonContainer.module.css'

interface ButtonProps {
    onClickPopUp: MouseEventHandler<HTMLButtonElement>;
    onClickStart: MouseEventHandler<HTMLButtonElement>;
}

export const ButtonContainer = (props : ButtonProps) => {
    return (
        <div className={style['button-container']}>
            <button className={`${style.button} ${style['button-rules']}`} onClick={props.onClickPopUp}>Правила</button>   
            <button className={`${style.button} ${style['button-start']}`} onClick={props.onClickStart}>Начать игру</button> 
        </div>  
    )
}