import style from './radioButton.module.css'
import { lvlsDescr } from '../../templates/templates'


interface radioProps {
    id: number,
    group: string,
    text: string,
    onChange: (event: React.ChangeEvent) => void
}

export const RadioButton = (props : radioProps) => {
    return (
        <div className={style['radio-wrapper']}>
            <input
                type='radio'
                value={props.id}
                name={props.group}
                id={`settingsId${props.id}`}
                onChange={props.onChange}
            />
            <label htmlFor={`settingsId${props.id}`}>{props.text}</label>
            <div>{lvlsDescr[props.id].text_size}</div>
            <div>{lvlsDescr[props.id].text_mines}</div>

        </div>
    )
}