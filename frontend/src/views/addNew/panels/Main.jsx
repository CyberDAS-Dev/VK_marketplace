import React from 'react'
import { Card, CardGrid, Group, Panel, PanelHeader, SimpleCell } from '@vkontakte/vkui'
import {
    Icon28AdvertisingOutline,
    Icon28MoneyCircleOutline,
    Icon28ShoppingCartOutline,
    Icon28StorefrontOutline,
} from '@vkontakte/icons'
import logo from '../../../images/logo.svg'

export default function MainPanel({ id, openCategories }) {
    return (
        <Panel id={id}>
            <PanelHeader left={<img src={logo} alt="" />}>Тип объявления</PanelHeader>
            <Group>
                <CardGrid size="l">
                    <Card mode="shadow" onClick={openCategories}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 96,
                            }}
                        >
                            <SimpleCell
                                hasActive={false}
                                hasHover={false}
                                before={<Icon28MoneyCircleOutline />}
                            >
                                Продажа
                            </SimpleCell>
                        </div>
                    </Card>
                    <Card mode="shadow">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 96,
                            }}
                            onClick={(e) => console.log(e)}
                        >
                            <SimpleCell
                                hasActive={false}
                                hasHover={false}
                                before={<Icon28ShoppingCartOutline />}
                            >
                                Покупка
                            </SimpleCell>
                        </div>
                    </Card>
                    <Card mode="shadow">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 96,
                            }}
                            onClick={(e) => console.log(e)}
                        >
                            <SimpleCell
                                hasActive={false}
                                hasHover={false}
                                before={<Icon28StorefrontOutline />}
                            >
                                Услуги
                            </SimpleCell>
                        </div>
                    </Card>
                    <Card mode="shadow">
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 96,
                            }}
                            onClick={(e) => console.log(e)}
                        >
                            <SimpleCell
                                hasActive={false}
                                hasHover={false}
                                before={<Icon28AdvertisingOutline />}
                            >
                                Ищу мастера
                            </SimpleCell>
                        </div>
                    </Card>
                </CardGrid>
            </Group>
        </Panel>
    )
}
