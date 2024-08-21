import { RadioButton } from "../radio-buttons/radioButton";

import { settings } from '../../templates/templates';
import style from './settings.module.css'

interface Settings {
    id: number | number,
    text: string,
}

interface settingsProps {
    handleSettingsChange: (id: number) => void;
}

export const SettingsMenu = (props: settingsProps) => {
    return (
        <div className={style['group-wrapper']}>
            {settings.map((setting: Settings) => (
                <RadioButton
                    key={setting.id}
                    group={'settings'}
                    id={setting.id}
                    text={setting.text}
                    onChange={() => props.handleSettingsChange(setting.id)}
                />
            ))}
        </div>
    )
}