import React from 'react'
import { Group, Panel, PanelHeader, PanelHeaderBack, List } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import MyAdsList from '@/views/profile/components/MyAdsList'
import MyAds from '../store/MyAdsStore'

const MyAdsPanel = observer(function MyAdsPanel({ id, backToMain }) {
    const [myAds] = React.useState(() => new MyAds())

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={backToMain} />}>
                Мои объявления
            </PanelHeader>
            <Group>
                <List>
                    <MyAdsList myAds={myAds} />
                </List>
            </Group>
        </Panel>
    )
})

export default MyAdsPanel
