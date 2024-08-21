import { MouseEventHandler } from 'react';
import style from "./overlay.module.css";

interface overlayProps {
    isOpened: boolean,
    closePopup: MouseEventHandler<HTMLDivElement>;
}

export const Overlay = (props : overlayProps) => {
  return (
    <div
      className={`${style["overlay"]} ${props.isOpened && style["overlay_is-opened"]}`} 
      onClick={props.closePopup}
    ></div>
  );
};
