'use client'

import { useState } from "react";

import styles from "./page.module.css";

import { SettingsMenu } from "./components/settings/settings";
import { ButtonContainer } from "./components/button-container/buttonContainer";
import { Overlay } from "./components/overlay/overlay";
import { Popup } from "./components/popup/popup";
import { Map } from "./components/map/map";

import { initArray } from './scripts/mapArray';
import { settings } from "./templates/templates";

type Cell = number | string


export default function Home() {
  const [selectedSettings, setSelectedSettings] = useState<number | null>(null)
  const [isOpen, setPopUpIsOpen] = useState<boolean>(false)
  const [map, setMap] = useState<Cell[][]>([[]])
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleSettingsChange = (id: number) => {
    setSelectedSettings(id)
  }

  const openPopup = () => {
    setPopUpIsOpen(true)
  }

  const closePopup = () => {
    setPopUpIsOpen(false)
  }

  const handleClickStart = () => {
    if (selectedSettings !== null) {
      var arr: Cell[][] = initArray(selectedSettings)
      setIsVisible(true)
      console.log(arr)
      setMap([])
      setMap(arr)
    } else {
      alert('Выберите настройки игры')
    }

  }

  return (
    <main className={styles.main}>
      <SettingsMenu handleSettingsChange={handleSettingsChange} />
      <ButtonContainer onClickPopUp={openPopup} onClickStart={handleClickStart} />
      <Map map={map} isVisible={isVisible} />

      <Overlay isOpened={isOpen} closePopup={closePopup} />
      <Popup isOpened={isOpen} closePopup={closePopup}></Popup>
    </main>
  );
}
