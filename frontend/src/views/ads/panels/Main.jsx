import React from 'react'
import { Panel, PanelHeader, Group, Search, CardGrid, Spinner, Placeholder } from '@vkontakte/vkui'
import { Icon24Filter, Icon56ErrorOutline } from '@vkontakte/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import { observer } from 'mobx-react-lite'
import debounce from 'lodash.debounce'
import logo from '../../../images/logo.svg'
import AdCard from '../components/AdCard'
import useScrollLock from '../../../utils/lockScroll'
import PhotoPopout from '../popouts/MaximizePhoto'
import Ads from '../../../store/AdsStore'
import categoryDict from '../../../utils/categoryDict'

const MainPanel = observer(({ id, onSearchClick, setPopout, closePopout }) => {
    const { lockScroll } = useScrollLock()
    const [search, setSearch] = React.useState(Ads.filters.search)

    const maximizePhoto = React.useCallback(
        (src, index) => {
            lockScroll()
            setPopout(<PhotoPopout src={src} index={index} closePopout={closePopout} />)
        },
        [closePopout, lockScroll, setPopout]
    )

    const onBuyButton = (e) => {
        alert('Покупай')
    }

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
                    <InfiniteScroll
                        dataLength={Ads.ads.length}
                        next={() => Ads.fetchNextAdverts()}
                        hasMore={Ads.hasMore}
                    >
                        <CardGrid size="l">
                            {Ads.ads.map((ad) => {
                                return (
                                    <AdCard
                                        key={ad.id}
                                        data={ad}
                                        maximizePhoto={maximizePhoto}
                                        onBuyButton={onBuyButton}
                                    />
                                )
                            })}
                        </CardGrid>
                        {Ads.isLoading && (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Spinner size="regular" style={{ margin: '20px 0' }} />
                            </div>
                        )}
                    </InfiniteScroll>
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
