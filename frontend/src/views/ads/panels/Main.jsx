import React from 'react'
import { Panel, PanelHeader, Group, Search, CardGrid } from '@vkontakte/vkui'
import { Icon24Filter } from '@vkontakte/icons'
import logo from '../../../images/logo.svg'
import AdCard from '../components/AdCard'
import useScrollLock from '../../../utils/lockScroll'
import PhotoPopout from '../popouts/MaximizePhoto'

export default function MainPanel({ id, cardsInfo, onSearchClick, setPopout, closePopout }) {
    const { lockScroll } = useScrollLock()

    const maximizePhoto = (src, index) => {
        lockScroll()
        setPopout(<PhotoPopout src={src} index={index} closePopout={closePopout} />)
    }

    return (
        <Panel id={id}>
            <PanelHeader left={<img src={logo} alt="" />}>Бытовые товары</PanelHeader>
            <Group>
                <Search
                    after={null}
                    placeholder="Поиск"
                    icon={<Icon24Filter />}
                    onIconClick={() => onSearchClick()}
                />
                <CardGrid size="l">
                    {cardsInfo.map((el) => {
                        return <AdCard key={el.id} data={el} maximizePhoto={maximizePhoto} />
                    })}
                </CardGrid>
            </Group>
        </Panel>
    )
}
