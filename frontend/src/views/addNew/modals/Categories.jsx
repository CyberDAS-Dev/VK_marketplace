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
import CATEGORIES from '@/utils/constants'
import CategoryCell from '../components/CategoryCell'

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
                {CATEGORIES.map((category) => {
                    return (
                        <CategoryCell
                            key={category.id}
                            category={category}
                            selectCategory={selectCategory}
                        />
                    )
                })}
            </Group>
        </ModalPage>
    )
})

export default CategoriesModal
