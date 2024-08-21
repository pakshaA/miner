import Styles from "./Popup.module.css";
import { MouseEventHandler } from "react";

interface PopUpProps {
    isOpened: boolean;
    closePopup: MouseEventHandler<HTMLButtonElement>;
}

export const Popup = (props : PopUpProps) => {
    return (
        <div className={`${Styles["popup"]} ${props.isOpened && Styles["popup_is-opened"]}`}>
          <button className={Styles["close"]} onClick={props.closePopup}>
            <div>Закрыть</div>
          </button>
          <div className={Styles.content}>
                <h2>Правила</h2>
                <div>
                    В сапере очень простые правила. Игровое поле разделено на клетки, некоторые из которых заминированы. 
                    Для победы вам нужно открыть все клетки, не попадая на мины. В открытых клетках отображаются цифры,
                    каждая цифра — это количество мин в соседних клетках. С помощью этой информации можно определить,
                    в каких клетках содержатся мины. Предполагаемую клетку с миной можно пометить флажком с помощью правой кнопки мыши.
                </div>
            </div>
        </div>
      );
}