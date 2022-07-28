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
import Ads from '@/store/AdsStore'

const FiltersModal = ({ id, applyFilters, closeModal }) => {
    const [type, setType] = React.useState(Ads.filters.type)
    const [sort, setSort] = React.useState(Ads.filters.sort)
    const [category, setCategory] = React.useState(Ads.filters.category)
    const [cost, setCost] = React.useState(Ads.filters.cost)
    const [onlyPhoto, toggleOnlyPhoto] = React.useState(Ads.filters.onlyPhoto)
    const [dontShowBargain, toggleDontShowBargain] = React.useState(Ads.filters.dontShowBargain) // инверс к апи
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
                        applyFilters(e, {
                            type,
                            sort,
                            category,
                            cost,
                            onlyPhoto,
                            dontShowBargain,
                        })
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
                            name="sort"
                            value={sort}
                            onChange={(e) => setSort(e.currentTarget.value)}
                            options={[
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
                                    value: 'all',
                                    label: 'Любая',
                                },
                                {
                                    value: 'misc',
                                    label: 'Бытовые товары',
                                },
                                {
                                    value: 'food',
                                    label: 'Еда',
                                },
                                {
                                    value: 'clothes',
                                    label: 'Одежда',
                                },
                                {
                                    value: 'books',
                                    label: 'Книги',
                                },
                                {
                                    value: 'electronics',
                                    label: 'Электроника',
                                },
                                {
                                    value: 'household',
                                    label: 'Бытовая техника',
                                },
                                {
                                    value: 'furniture',
                                    label: 'Мебель',
                                },
                            ]}
                        />
                    </FormItem>
                    <FormLayoutGroup mode="horizontal">
                        <FormItem bottom="От" top="Цена">
                            <Input
                                value={cost[0]}
                                onChange={(e) => setCost([e.currentTarget.value, cost[1]])}
                            />
                        </FormItem>
                        <FormItem bottom="До" top="&#xfeff;">
                            <Input
                                value={cost[1]}
                                onChange={(e) => setCost([cost[0], e.currentTarget.value])}
                            />
                        </FormItem>
                    </FormLayoutGroup>
                    <FormItem>
                        <Checkbox checked={onlyPhoto} onChange={() => toggleOnlyPhoto(!onlyPhoto)}>
                            Только с фото
                        </Checkbox>
                    </FormItem>
                    <FormItem>
                        <Checkbox
                            checked={dontShowBargain}
                            onChange={() => toggleDontShowBargain(!dontShowBargain)}
                        >
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

export default FiltersModal
