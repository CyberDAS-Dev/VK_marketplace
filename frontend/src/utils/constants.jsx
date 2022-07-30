import {
    Icon28AppleOutline,
    Icon28ArmchairOutline,
    Icon28BookOutline,
    Icon28CoffeeSteamOutline,
    Icon28HangerOutline,
    Icon28LaptopOutline,
    Icon28WasherOutline,
} from '@vkontakte/icons'
import React from 'react'

const CATEGORIES = [
    {
        title: 'Бытовые товары',
        id: 'misc',
        description: 'Будильники, графины, бумага и т. д.',
        icon: <Icon28CoffeeSteamOutline />,
    },
    {
        title: 'Еда',
        id: 'food',
        icon: <Icon28AppleOutline />,
    },
    {
        title: 'Одежда',
        id: 'clothes',
        icon: <Icon28HangerOutline />,
    },
    {
        title: 'Книги',
        id: 'books',
        icon: <Icon28BookOutline />,
    },
    {
        title: 'Электроника',
        id: 'electronics',
        icon: <Icon28LaptopOutline />,
    },
    {
        title: 'Бытовая техника',
        id: 'household',
        icon: <Icon28WasherOutline />,
    },
    {
        title: 'Мебель',
        id: 'furniture',
        icon: <Icon28ArmchairOutline />,
    },
]

export default CATEGORIES
