import React from 'react'
import {
    Group,
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    FormLayout,
    FormItem,
    Select,
    Button,
    Checkbox,
    FormLayoutGroup,
    Input,
} from '@vkontakte/vkui'
import { Icon24Dismiss } from '@vkontakte/icons'

export default function FiltersModal({ id, applyFilters, closeModal }) {
    const [type, setType] = React.useState('all')
    const [sortType, setSortType] = React.useState('new')
    const [category, setCategory] = React.useState(0)
    const [price, setPrice] = React.useState([0, 2000])
    const [onlyPhoto, toggleOnlyPhoto] = React.useState(false)
    const [withPrice, toggleWithPrice] = React.useState(false)

    return (
        <ModalPage
            id={id}
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
                <FormLayout
                    onSubmit={(e) =>
                        applyFilters(e, { type, sortType, category, price, onlyPhoto, withPrice })
                    }
                >
                    <FormItem top="Тип объявлений">
                        <Select
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
                    <FormLayoutGroup mode="horizontal">
                        <FormItem bottom="От" top="Цена">
                            <Input
                                value={price[0]}
                                onChange={(e) => setPrice([e.currentTarget.value, price[1]])}
                            />
                        </FormItem>
                        <FormItem bottom="До" top="&#xfeff;">
                            <Input
                                value={price[1]}
                                onChange={(e) => setPrice([price[0], e.currentTarget.value])}
                            />
                        </FormItem>
                    </FormLayoutGroup>
                    <FormItem>
                        <Checkbox checked={onlyPhoto} onChange={() => toggleOnlyPhoto(!onlyPhoto)}>
                            Только с фото
                        </Checkbox>
                    </FormItem>
                    <FormItem>
                        <Checkbox checked={withPrice} onChange={() => toggleWithPrice(!withPrice)}>
                            Только с ценой
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
    )
}
