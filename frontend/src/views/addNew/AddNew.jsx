/* eslint-disable react/no-this-in-sfc */
import React from 'react'
import { View, ModalRoot } from '@vkontakte/vkui'
import CategoriesModal from '@/views/addNew/modals/Categories'
import MainPanel from '@/views/addNew/panels/Main'
import AddPanel from '@/views/addNew/panels/Add'
import { observer } from 'mobx-react-lite'
import { injectStores } from '@mobx-devtools/tools'
import AddNew from './store/AddNewStore'

const AddNewView = observer(function AddNewView({ id }) {
    const [activeModal, setActiveModal] = React.useState(null)
    const [activePanel, setActivePanel] = React.useState('main')
    const [addNew] = React.useState(() => new AddNew())

    injectStores({ addNew })

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
            console.log(props)
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
            <AddPanel id="add" backToMain={backToMain} submitAd={submitAd} />
        </View>
    )
})

export default AddNewView
