import React from 'react'
import { Group, Panel, PanelHeader, PanelHeaderBack, List } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import MyAdsList from '@/views/profile/components/MyAdsList'

const MyAdsPanel = observer(function MyAdsPanel({ myAds, id, setActivePanel, backToMain }) {
    const toEditAdPanel = () => {
        setActivePanel('editAd')
    }

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={backToMain} />}>
                Мои объявления
            </PanelHeader>
            <Group>
                <List>
                    <MyAdsList toEditAdPanel={toEditAdPanel} myAds={myAds} />
                </List>
            </Group>
        </Panel>
    )
})

export default MyAdsPanel
