interface Size {
    w: number;
    h: number;
}

interface Setting {
    id: number;
    size: Size;
    mines: number;
    text: string;
}

interface LevelDescription {
    id: number;
    text_size: string;
    text_mines: string;
}

export const settings: Setting[] = [
    { id: 0, size: { w: 9, h: 9 }, mines: 10, text: 'Новичок' },
    { id: 1, size: { w: 16, h: 16 }, mines: 40, text: 'Любитель' },
    { id: 2, size: { w: 30, h: 15 }, mines: 99, text: 'Профессионал' },
];

export const lvlsDescr: LevelDescription[] = settings.map(setting => ({
    id: setting.id,
    text_size: `Размер карты: ${setting.size.w}x${setting.size.h}\n`,
    text_mines: `Количество мин: ${setting.mines}`
}));