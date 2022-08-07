import React from 'react'
import { View, ModalRoot } from '@vkontakte/vkui'
import CategoriesModal from '@/views/addNew/modals/Categories'
import MainPanel from '@/views/addNew/panels/Main'
import { observer } from 'mobx-react-lite'
import EditAdPanel from '@/shared/components/EditAd'
import AddNew from './store/AddNewStore'

const AddNewView = observer(function AddNewView({ id }) {
    const [activeModal, setActiveModal] = React.useState(null)
    const [activePanel, setActivePanel] = React.useState('main')
    const [addNew] = React.useState(() => new AddNew())

    const closeModal = React.useCallback(() => setActiveModal(null), [])
    const backToMain = React.useCallback(() => setActivePanel('main'), [])

    const selectCategory = React.useCallback(
        (category) => {
            addNew.applyProps({ category })
            setActiveModal(null)
            setActivePanel('add')
        },
        [addNew]
    )
    const selectType = React.useCallback(
        (type) => {
            addNew.applyProps({ type })
            setActiveModal('categories')
        },
        [addNew]
    )

    const submitAd = React.useCallback(
        (props) => {
            addNew.applyProps(props)
            addNew.submitAd()
            backToMain()
        },
        [addNew, backToMain]
    )

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={closeModal}>
            <CategoriesModal
                id="categories"
                selectCategory={selectCategory}
                closeModal={closeModal}
            />
        </ModalRoot>
    )

    return (
        <View id={id} activePanel={activePanel} modal={modal}>
            <MainPanel id="main" selectType={selectType} />
            <EditAdPanel id="add" backToMain={backToMain} submitAd={submitAd} />
        </View>
    )
})

export default AddNewView
