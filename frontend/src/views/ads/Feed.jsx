import React, { useEffect } from 'react'
import { View, ModalRoot, ScreenSpinner } from '@vkontakte/vkui'
import MainPanel from './panels/Main'
import FiltersModal from './modals/Filters'
import useScrollLock from '../../utils/lockScroll'
import useAdverts from '../../api/useAdverts'

export default function AdsView({ id }) {
    const { unlockScroll } = useScrollLock()
    const [activePanel] = React.useState('main')
    const [activeModal, setActiveModal] = React.useState(null)
    const [popout, setPopout] = React.useState(null)
    const { isLoading, data: adverts } = useAdverts()

    const closeModal = () => setActiveModal(null)
    const closePopout = () => {
        unlockScroll()
        setPopout(null)
    }
    const applyFilters = (e, data) => {
        e.preventDefault()
        console.log(data)
        closeModal()
    }

    useEffect(() => {
        if (isLoading) {
            setPopout(<ScreenSpinner />)
        }
        if (!isLoading) {
            setPopout(null)
        }
    }, [isLoading])

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={closeModal}>
            <FiltersModal id="filters" applyFilters={applyFilters} closeModal={closeModal} />
        </ModalRoot>
    )

    return (
        <View id={id} activePanel={activePanel} modal={modal} popout={popout}>
            <MainPanel
                id="main"
                category="Все объявления"
                cardsInfo={
                    adverts &&
                    adverts.map((ad) => {
                        return {
                            id: ad.id,
                            title: ad.title,
                            description: ad.description,
                            cost: ad.cost,
                            image: ad.images,
                            bargain: ad.bargain,
                        }
                    })
                }
                onSearchClick={() => setActiveModal('filters')}
                setPopout={setPopout}
                closePopout={closePopout}
            />
        </View>
    )
}
