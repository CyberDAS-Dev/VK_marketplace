import React, { useEffect } from 'react'
import { View, ModalRoot, ScreenSpinner } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import MainPanel from './panels/Main'
import FiltersModal from './modals/Filters'
import useScrollLock from '../../utils/lockScroll'
import Ads from '../../store/AdsStore'

const AdsView = observer(({ id }) => {
    const { unlockScroll } = useScrollLock()
    const [activePanel] = React.useState('main')
    const [activeModal, setActiveModal] = React.useState(null)
    const [popout, setPopout] = React.useState(null)
    const closeModal = React.useCallback(() => setActiveModal(null), [])
    const closePopout = React.useCallback(() => {
        unlockScroll()
        setPopout(null)
    }, [unlockScroll])
    const applyFilters = React.useCallback(
        (e, data) => {
            e.preventDefault()
            console.log(data)
            Ads.applyFilters(data)
            closeModal()
        },
        [closeModal]
    )

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={closeModal}>
            <FiltersModal id="filters" applyFilters={applyFilters} closeModal={closeModal} />
        </ModalRoot>
    )

    return (
        <View id={id} activePanel={activePanel} modal={modal} popout={popout}>
            <MainPanel
                id="main"
                category={Ads.filters.category}
                onSearchClick={() => setActiveModal('filters')}
                setPopout={setPopout}
                closePopout={closePopout}
            />
        </View>
    )
})

export default AdsView
