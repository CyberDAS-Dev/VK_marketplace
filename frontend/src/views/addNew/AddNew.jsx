import React from 'react'
import { View, ModalRoot } from '@vkontakte/vkui'
import MainPanel from './panels/Main'
import AddPanel from './panels/Add'
import CategoriesModal from './modals/Categories'

export default function AddNewView({ id }) {
    const [activeModal, setActiveModal] = React.useState(null)
    const [activePanel, setActivePanel] = React.useState('main')
    const closeModal = () => setActiveModal(null)

    const switchToAdd = () => {
        setActiveModal(null)
        setActivePanel('add')
    }
    const backToMain = () => setActivePanel('main')
    const openCategories = () => setActiveModal('categories')

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={closeModal}>
            <CategoriesModal id="categories" switchToAdd={switchToAdd} closeModal={closeModal} />
        </ModalRoot>
    )

    return (
        <View id={id} activePanel={activePanel} modal={modal}>
            <MainPanel id="main" openCategories={openCategories} />
            <AddPanel id="add" backToMain={backToMain} />
        </View>
    )
}
