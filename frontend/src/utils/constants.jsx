import {
    Icon28AdvertisingOutline,
    Icon28AppleOutline,
    Icon28ArmchairOutline,
    Icon28BookOutline,
    Icon28CoffeeSteamOutline,
    Icon28HangerOutline,
    Icon28LaptopOutline,
    Icon28MoneyCircleOutline,
    Icon28ShoppingCartOutline,
    Icon28StorefrontOutline,
    Icon28WasherOutline,
} from '@vkontakte/icons'
import React from 'react'

export const CATEGORIES = [
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

export const SORT_TYPES = [
    {
        value: 'newer',
        label: 'Сначала новые',
    },
    {
        value: 'older',
        label: 'Сначала старые',
    },
    {
        value: 'cost-asc',
        label: 'Сначала дешевые',
    },
    {
        value: 'cost-desc',
        label: 'Сначала дорогие',
    },
]

export const TYPES = [
    { title: 'Продажа', id: 'sell', icon: <Icon28MoneyCircleOutline /> },
    { title: 'Покупка', id: 'buy', icon: <Icon28ShoppingCartOutline /> },
    { title: 'Услуги', id: 'service', icon: <Icon28StorefrontOutline /> },
    { title: 'Ищу мастера', id: 'performer', icon: <Icon28AdvertisingOutline /> },
]
