import React from 'react'
import { Panel, PanelHeader, Group, Search, Placeholder } from '@vkontakte/vkui'
import { Icon24Filter, Icon56ErrorOutline } from '@vkontakte/icons'
import { observer } from 'mobx-react-lite'
import debounce from 'lodash.debounce'
import categoryDict from '@/utils/categoryDict'
import logo from '@/images/logo.svg'
import useScrollLock from '@/utils/lockScroll'
import PhotoPopout from '@/views/ads/popouts/MaximizePhoto'
import Ads from '@/store/AdsStore'
import InfiniteFeed from '@/views/ads/components/InfiniteFeed'

const MainPanel = observer(function MainPanel({ id, onSearchClick, setPopout, closePopout }) {
    const [search, setSearch] = React.useState(Ads.filters.search)
    const { lockScroll } = useScrollLock()

    const maximizePhoto = React.useCallback(
        (src, index) => {
            lockScroll()
            setPopout(<PhotoPopout src={src} index={index} closePopout={closePopout} />)
        },
        [closePopout, lockScroll, setPopout]
    )

    const onBuyButton = React.useCallback(() => {
        alert('Покупай')
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const applySearch = React.useCallback(
        debounce((value) => {
            Ads.applyFilters({ search: value })
        }, 500),
        []
    )

    return (
        <Panel id={id}>
            <PanelHeader left={<img src={logo} alt="" />}>
                {categoryDict(Ads.filters.category)}
            </PanelHeader>
            <Group>
                <Search
                    after={null}
                    placeholder="Поиск"
                    icon={<Icon24Filter />}
                    onIconClick={() => onSearchClick()}
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value)
                        applySearch(e.target.value)
                    }}
                />
                {Ads.ads && (
                    <InfiniteFeed
                        Ads={Ads}
                        maximizePhoto={maximizePhoto}
                        onBuyButton={onBuyButton}
                    />
                )}
                {Ads.isError && (
                    <Placeholder icon={<Icon56ErrorOutline />} header="Ошибка">
                        Не удалось получить список объявлений, попробуйте еще раз.
                    </Placeholder>
                )}
            </Group>
        </Panel>
    )
})

export default MainPanel
