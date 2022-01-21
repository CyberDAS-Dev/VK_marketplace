import React from 'react'
import {
    View,
    Panel,
    PanelHeader,
    Group,
    Search,
    CardGrid,
    ContentCard,
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    FormLayout,
    FormItem,
    Select,
    Button,
    RangeSlider,
    Checkbox,
} from '@vkontakte/vkui'
import { Icon24Filter, Icon24Dismiss } from '@vkontakte/icons'
import MainPanel from './panels/Main'
import logo from '../../images/logo.svg'

export default function AdsView({ id }) {
    const [activePanel, setActivePanel] = React.useState('main')
    const [activeModal, setActiveModal] = React.useState(null)
    const [type, setType] = React.useState('all')
    const [sortType, setSortType] = React.useState('new')
    const [category, setCategory] = React.useState(0)
    const [price, setPrice] = React.useState([0, 2000])
    const [onlyPhoto, toggleOnlyPhoto] = React.useState(true)

    const closeModal = () => setActiveModal(null)
    const applyFilters = (e) => {
        e.preventDefault()
        console.log(type)
        console.log(sortType)
        console.log(category)
        console.log(price)
        console.log(onlyPhoto)
        closeModal()
    }

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={closeModal}>
            <ModalPage
                id="categories"
                header={
                    <ModalPageHeader
                        right={
                            <PanelHeaderButton onClick={closeModal}>
                                <Icon24Dismiss />
                            </PanelHeaderButton>
                        }
                    >
                        Фильтры
                    </ModalPageHeader>
                }
                onClose={closeModal}
            >
                <Group>
                    <FormLayout onSubmit={applyFilters}>
                        <FormItem top="Тип объявлений">
                            <Select
                                placeholder="Выберите тип"
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.currentTarget.value)}
                                options={[
                                    {
                                        value: 'all',
                                        label: 'Все',
                                    },
                                    {
                                        value: 'sell',
                                        label: 'Продажа',
                                    },
                                    {
                                        value: 'buy',
                                        label: 'Покупка',
                                    },
                                    {
                                        value: 'service',
                                        label: 'Услуги',
                                    },
                                ]}
                            />
                        </FormItem>
                        <FormItem top="Сортировка">
                            <Select
                                placeholder="Выберите сортировку"
                                name="sortType"
                                value={sortType}
                                onChange={(e) => setSortType(e.currentTarget.value)}
                                options={[
                                    {
                                        value: 'new',
                                        label: 'Сначала новые',
                                    },
                                    {
                                        value: 'old',
                                        label: 'Сначала старые',
                                    },
                                    {
                                        value: 'cheap',
                                        label: 'Сначала дешевые',
                                    },
                                    {
                                        value: 'expensive',
                                        label: 'Сначала дорогие',
                                    },
                                ]}
                            />
                        </FormItem>
                        <FormItem top="Категория">
                            <Select
                                placeholder="Выберите категорию"
                                name="category"
                                value={category}
                                onChange={(e) => setCategory(e.currentTarget.value)}
                                options={[
                                    {
                                        value: '0',
                                        label: 'Любая',
                                    },
                                    {
                                        value: '1',
                                        label: 'Бытовые товары',
                                    },
                                    {
                                        value: '2',
                                        label: 'Еда',
                                    },
                                    {
                                        value: '3',
                                        label: 'Одежда',
                                    },
                                    {
                                        value: '4',
                                        label: 'Книги',
                                    },
                                    {
                                        value: '5',
                                        label: 'Электроника',
                                    },
                                    {
                                        value: '6',
                                        label: 'Бытовая техника',
                                    },
                                    {
                                        value: '7',
                                        label: 'Мебель',
                                    },
                                ]}
                            />
                        </FormItem>
                        <FormItem top="Цена" bottom={`От ${price[0]} до ${price[1]}`}>
                            <RangeSlider
                                min={0}
                                max={2000}
                                step={10}
                                onChange={(e) => setPrice(e)}
                                value={[...price]}
                            />
                        </FormItem>
                        <FormItem>
                            <Checkbox
                                checked={onlyPhoto}
                                onChange={() => toggleOnlyPhoto(!onlyPhoto)}
                            >
                                Только с фото
                            </Checkbox>
                        </FormItem>
                        <FormItem>
                            <Button type="submit" size="l" stretched>
                                Применить
                            </Button>
                        </FormItem>
                    </FormLayout>
                </Group>
            </ModalPage>
        </ModalRoot>
    )

    return (
        <View id={id} activePanel={activePanel} modal={modal}>
            <MainPanel
                id="main"
                cardsInfo={[
                    {
                        id: '1',
                        title: 'abc',
                        description: `Продам:
                            Пальто (s) — 1000 р. Надевалось два раза.
                            Платья (м) на фото 2-4 практически новые — по 700 рублей.
                            Остальные платья — по 500 рублей:`,
                        cost: 200,
                        image: [
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop',
                        ],
                    },
                    {
                        id: '2',
                        title: 'abc',
                        description: `Продам:
                            Пальто (s) — 1000 р. Надевалось два раза.
                            Платья (м) на фото 2-4 практически новые — по 700 рублей.
                            Остальные платья — по 500 рублей:`,
                        cost: 200,
                        image: [
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop',
                        ],
                    },
                ]}
                onSearchClick={() => setActiveModal('categories')}
            />
        </View>
    )
}
