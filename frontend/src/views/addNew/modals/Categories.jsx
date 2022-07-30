import React from 'react'
import { Group, ModalPage, ModalPageHeader, PanelHeaderButton, SimpleCell } from '@vkontakte/vkui'
import {
    Icon24Dismiss,
    Icon28AppleOutline,
    Icon28ArmchairOutline,
    Icon28BookOutline,
    Icon28CoffeeSteamOutline,
    Icon28HangerOutline,
    Icon28LaptopOutline,
    Icon28WasherOutline,
} from '@vkontakte/icons'
import { observer } from 'mobx-react-lite'

const CategoriesModal = observer(function CategoriesModal({ id, closeModal, selectCategory }) {
    return (
        <ModalPage
            id={id}
            settlingHeight={100}
            header={
                <ModalPageHeader
                    right={
                        <PanelHeaderButton onClick={closeModal}>
                            <Icon24Dismiss />
                        </PanelHeaderButton>
                    }
                >
                    Категория
                </ModalPageHeader>
            }
            onClose={closeModal}
        >
            {/* // TODO сделать автогенерацию категорий? добавить везде описание (или удалить) */}
            <Group>
                <SimpleCell
                    onClick={() => selectCategory('misc')}
                    before={<Icon28CoffeeSteamOutline />}
                    description="Будильники, графины, бумага и т. д."
                >
                    Бытовые товары
                </SimpleCell>
                <SimpleCell onClick={() => selectCategory('food')} before={<Icon28AppleOutline />}>
                    Еда
                </SimpleCell>
                <SimpleCell
                    onClick={() => selectCategory('clothes')}
                    before={<Icon28HangerOutline />}
                >
                    Одежда
                </SimpleCell>
                <SimpleCell onClick={() => selectCategory('books')} before={<Icon28BookOutline />}>
                    Книги
                </SimpleCell>
                <SimpleCell
                    onClick={() => selectCategory('electronics')}
                    before={<Icon28LaptopOutline />}
                >
                    Электроника
                </SimpleCell>
                <SimpleCell
                    onClick={() => selectCategory('household')}
                    before={<Icon28WasherOutline />}
                >
                    Бытовая техника
                </SimpleCell>
                <SimpleCell
                    onClick={() => selectCategory('furniture')}
                    before={<Icon28ArmchairOutline />}
                >
                    Мебель
                </SimpleCell>
            </Group>
        </ModalPage>
    )
})

export default CategoriesModal
