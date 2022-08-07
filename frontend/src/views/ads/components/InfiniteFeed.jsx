import { Icon28ChevronUpOutline, Icon28RefreshOutline } from '@vkontakte/icons'
import { CardGrid, Spinner } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'
import InfiniteScroll from '@cyberdas/react-infinite-scroll-component'
import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme'
import AdCard from './AdCard'

const InfiniteFeed = observer(function InfiniteFeed({ Ads, maximizePhoto, onBuyButton }) {
    return (
        <InfiniteScroll
            dataLength={Ads.ads.length}
            next={() => Ads.fetchNextAdverts()}
            hasMore={Ads.hasMore}
            pullDownToRefresh
            refreshFunction={() => Ads.refresh()}
            pullDownToRefreshThresholdY={100}
            pullDownToRefreshThresholdX={20}
            pullDownSafeZone={20}
            pullDownToRefreshContent={
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Icon28ChevronUpOutline
                        style={{ marginBottom: '10px' }}
                        fill={baseTheme.colorIconAccent.normal.value}
                    />
                </div>
            }
            releaseToRefreshContent={
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icon28RefreshOutline
                        style={{ marginBottom: '10px' }}
                        fill={baseTheme.colorIconAccent.normal.value}
                    />
                </div>
            }
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
    )
})

export default InfiniteFeed
