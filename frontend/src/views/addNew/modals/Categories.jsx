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

export default function CategoriesModal({ id, closeModal, switchToAdd }) {
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
            <Group>
                <SimpleCell
                    onClick={switchToAdd}
                    before={<Icon28CoffeeSteamOutline />}
                    description="Будильники, графины, бумага и т. д."
                >
                    Бытовые товары
                </SimpleCell>
                <SimpleCell before={<Icon28AppleOutline />}>Еда</SimpleCell>
                <SimpleCell before={<Icon28HangerOutline />}>Одежда</SimpleCell>
                <SimpleCell before={<Icon28BookOutline />}>Книги</SimpleCell>
                <SimpleCell before={<Icon28LaptopOutline />}>Электроника</SimpleCell>
                <SimpleCell before={<Icon28WasherOutline />}>Бытовая техника</SimpleCell>
                <SimpleCell before={<Icon28ArmchairOutline />}>Мебель</SimpleCell>
            </Group>
        </ModalPage>
    )
}
