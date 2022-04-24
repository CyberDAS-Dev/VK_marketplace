import React from 'react'
import { View, ModalRoot } from '@vkontakte/vkui'
import MainPanel from './panels/Main'
import FiltersModal from './modals/Filters'
import useScrollLock from '../../utils/lockScroll'

export default function AdsView({ id }) {
    const { unlockScroll } = useScrollLock()
    const [activePanel] = React.useState('main')
    const [activeModal, setActiveModal] = React.useState(null)
    const [popout, setPopout] = React.useState(null)

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
                cardsInfo={[
                    {
                        id: '1',
                        title: 'Одежда',
                        description: `Продаю одежду!
                        -вельветовые узкие штаны с высокой талией, размер 32-34, 500 рублей
                        -белая свободная блузка с рисунком ручной работы, размер xs-m, 300 рублей
                        -бежевый пиджак в отличном состоянии, с подкладкой, 500 рублей ￼
                        -бордовый свитер с вязаными рукавами zara, тёплый, уютный! Размер подойдёт на xs-m, 900 рублей
                        
                        Если берёте несколько вещей, отдам дешевле!`,
                        cost: 'bargain',
                        image: [
                            'https://sun9-7.userapi.com/s/v1/if2/id4PAhQ-WaQSffRbegtluLTF0P8iFsxLamRSv__tvFtdwDHAtc8i5srkvRk0a0IKFRaksvlSfOaYEKBAbhpKIqac.jpg?size=2119x2160&quality=96&type=album',
                            'https://sun9-80.userapi.com/s/v1/if2/DtLLHN5R2MsExgCnSi_B2v-UN7ylpsKn73OwqjP6pR3PS1JRNDsELLjM8vhJlPYpfnl-drMZ9SS9ifyBha1KoirW.jpg?size=1620x2160&quality=96&type=album',
                            'https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
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
                setPopout={setPopout}
                closePopout={closePopout}
            />
        </View>
    )
}
