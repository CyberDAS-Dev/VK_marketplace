import React from 'react'
import { View, ModalRoot } from '@vkontakte/vkui'
import MainPanel from './panels/Main'
import FiltersModal from './modals/Filters'

export default function AdsView({ id }) {
    const [activePanel] = React.useState('main')
    const [activeModal, setActiveModal] = React.useState(null)

    const closeModal = () => setActiveModal(null)
    const applyFilters = (e, data) => {
        e.preventDefault()
        console.log(data)
        closeModal()
    }

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={closeModal}>
            <FiltersModal id="filters" applyFilters={applyFilters} closeModal={closeModal} />
        </ModalRoot>
    )

    return (
        <View id={id} activePanel={activePanel} modal={modal}>
            <MainPanel
                id="main"
                cardsInfo={[
                    {
                        id: '1',
                        title: 'abc',
                        description: `Продам:
                            Пальто (s) — 1000 р. Надевалось два раза.
                            Платья (м) на фото 2-4 практически новые — по 700 рублей.
                            Остальные платья — по 500 рублей:`,
                        cost: 200,
                        image: [
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop',
                        ],
                    },
                    {
                        id: '1',
                        title: 'abc',
                        description: `Продам:
                            Пальто (s) — 1000 р. Надевалось два раза.
                            Платья (м) на фото 2-4 практически новые — по 700 рублей.
                            Остальные платья — по 500 рублей:`,
                        cost: 0,
                        image: [
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop',
                        ],
                    },
                    {
                        id: '1',
                        title: 'abc',
                        description: `Продам:
                            Пальто (s) — 1000 р. Надевалось два раза.
                            Платья (м) на фото 2-4 практически новые — по 700 рублей.
                            Остальные платья — по 500 рублей:`,
                        cost: 'bargain',
                        image: [
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop',
                        ],
                    },
                    {
                        id: '2',
                        title: 'abc',
                        description: `Продам:
                            Пальто (s) — 1000 р. Надевалось два раза.
                            Платья (м) на фото 2-4 практически новые — по 700 рублей.
                            Остальные платья — по 500 рублей:`,
                        cost: 200,
                        image: [
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop',
                        ],
                    },
                ]}
                onSearchClick={() => setActiveModal('filters')}
            />
        </View>
    )
}
