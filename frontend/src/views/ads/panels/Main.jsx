import React from 'react'
import { Panel, PanelHeader, Group, Search, CardGrid, Spinner, Placeholder } from '@vkontakte/vkui'
import { Icon24Filter, Icon56ErrorOutline } from '@vkontakte/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import logo from '../../../images/logo.svg'
import AdCard from '../components/AdCard'
import useScrollLock from '../../../utils/lockScroll'
import PhotoPopout from '../popouts/MaximizePhoto'

export default function MainPanel({
    id,
    category,
    cardsInfo,
    onSearchClick,
    setPopout,
    closePopout,
    fetchNextAdverts,
    hasNextPage,
    isError,
}) {
    const { lockScroll } = useScrollLock()

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

    return (
        <Panel id={id}>
            <PanelHeader left={<img src={logo} alt="" />}>{category}</PanelHeader>
            <Group>
                <Search
                    after={null}
                    placeholder="Поиск"
                    icon={<Icon24Filter />}
                    onIconClick={() => onSearchClick()}
                />
                {cardsInfo && (
                    <InfiniteScroll
                        dataLength={cardsInfo.length}
                        next={fetchNextAdverts}
                        hasMore={hasNextPage}
                        loader={
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Spinner size="regular" style={{ margin: '20px 0' }} />
                            </div>
                        }
                    >
                        <CardGrid size="l">
                            {cardsInfo.map((ad) => {
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
                    </InfiniteScroll>
                )}
                {isError && (
                    <Placeholder icon={<Icon56ErrorOutline />} header="Ошибка">
                        Не удалось получить список объявлений, попробуйте еще раз.
                    </Placeholder>
                )}
            </Group>
        </Panel>
    )
}
