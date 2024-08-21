import style from './endpopup.module.css'

import { MouseEventHandler } from "react";

interface endPopupProps {
    isOpened: boolean;
    isWin: boolean;
    closePopup: MouseEventHandler<HTMLButtonElement>;
}

export const EndPopUp = (props: endPopupProps) => {
    return (
        <div className={`${style['popup']} ${props.isOpened && style['popup_is-opened']}`}>
            <h2>{props.isWin ? 'Вы выиграли!' : 'Вы проиграли!'}</h2>
            <button onClick={props.closePopup}>Начать новую игру</button>
        </div>

    )
}