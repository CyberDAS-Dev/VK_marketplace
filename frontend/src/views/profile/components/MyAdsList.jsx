import React from 'react'
import { SimpleCell, Spinner } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import InfiniteScroll from '@cyberdas/react-infinite-scroll-component'
import { Icon28ChevronUpOutline, Icon28RefreshOutline } from '@vkontakte/icons'
import baseTheme from '@vkontakte/vkui-tokens/themes/vkBase/cssVars/theme'

const MyAdsList = observer(function MyAdsList({ myAds }) {
    return (
        myAds.ads && (
            <InfiniteScroll
                dataLength={myAds.ads.length}
                next={() => myAds.fetchNextAdverts()}
                hasMore={myAds.hasMore}
                pullDownToRefresh
                refreshFunction={() => myAds.refresh()}
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
                {myAds.ads.map((ad) => {
                    return (
                        <SimpleCell key={ad.id} expandable description={ad.description}>
                            {ad.title}
                        </SimpleCell>
                    )
                })}
                {myAds.isLoading && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Spinner size="regular" style={{ margin: '20px 0' }} />
                    </div>
                )}
            </InfiniteScroll>
        )
    )
})

export default MyAdsList
