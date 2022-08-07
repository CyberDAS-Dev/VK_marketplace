import React from 'react'
import { View, ModalRoot, ScreenSpinner } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import { autorun } from 'mobx'
import MainPanel from '@/views/ads/panels/Main'
import FiltersModal from '@/views/ads/modals/Filters'
import useScrollLock from '@/utils/lockScroll'
import Ads from '@/store/AdsStore'

const AdsView = observer(function AdsView({ id }) {
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
            Ads.applyFilters(data)
            closeModal()
        },
        [closeModal]
    )

    React.useEffect(
        () =>
            autorun(() => {
                if (Ads.isPulled || Ads.isPrefetching) {
                    setPopout(<ScreenSpinner />)
                } else if (Ads.isError) {
                    setPopout(<ScreenSpinner state="error" />)
                    setTimeout(() => setPopout(null), 1000)
                } else {
                    setPopout(null)
                }
            }),
        []
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
                onSearchClick={() => setActiveModal('filters')}
                setPopout={setPopout}
                closePopout={closePopout}
            />
        </View>
    )
})

export default AdsView
