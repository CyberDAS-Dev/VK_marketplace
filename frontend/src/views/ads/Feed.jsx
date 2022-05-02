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
    const { isFetching, data: adverts, fetchNextAdverts, hasNextPage } = useAdverts()
    const closeModal = React.useCallback(() => setActiveModal(null), [])
    const closePopout = React.useCallback(() => {
        unlockScroll()
        setPopout(null)
    }, [unlockScroll])
    const applyFilters = React.useCallback(
        (e, data) => {
            e.preventDefault()
            console.log(data)
            closeModal()
        },
        [closeModal]
    )

    useEffect(() => {
        if (isFetching) {
            setPopout(<ScreenSpinner />)
        }
        if (!isFetching) {
            setPopout(null)
        }
    }, [isFetching])

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
                    [].concat(
                        ...adverts.pages.map((group) => {
                            return group.map((ad) => {
                                return {
                                    id: ad.id,
                                    title: ad.title,
                                    description: ad.description,
                                    cost: ad.cost,
                                    bargain: ad.bargain,
                                    image: ad.images,
                                }
                            })
                        })
                    )
                }
                onSearchClick={() => setActiveModal('filters')}
                setPopout={setPopout}
                closePopout={closePopout}
                fetchNextAdverts={fetchNextAdverts}
                hasNextPage={hasNextPage}
            />
        </View>
    )
}
