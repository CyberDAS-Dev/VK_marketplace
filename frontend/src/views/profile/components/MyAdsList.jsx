import React from 'react'
import { SimpleCell, Spinner } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import InfiniteScroll from '@cyberdas/react-infinite-scroll-component'

const MyAdsList = observer(function MyAdsList({ myAds }) {
    return (
        myAds.ads && (
            <InfiniteScroll
                dataLength={myAds.ads.length}
                next={() => myAds.fetchNextAdverts()}
                hasMore={myAds.hasMore}
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
