import React from 'react'
import {
    Group,
    Panel,
    PanelHeader,
    View,
    PanelHeaderBack,
    SimpleCell,
    Avatar,
    Div,
    Text,
    Link,
    List,
    Cell,
} from '@vkontakte/vkui'
import {
    Icon28DocumentOutline,
    Icon28HelpCircleOutline,
    Icon28InfoCircleOutline,
} from '@vkontakte/icons'
import logo from '../../images/logo.svg'
import avatar from './images/avatar.png'
import bigLogo from './images/biglogo.png'

// TEMP

export default function ProfileView({ id }) {
    const [activePanel, setActivePanel] = React.useState('main')
    // temp
    const [removeList, editRemoveList] = React.useState([
        ['Графин', '300 просмотров'],
        ['Чашка', '103 просмотра'],
        ['Ноутбук', '7000 просмотров'],
    ])

    return (
        <View id={id} activePanel={activePanel}>
            <Panel id="main">
                <PanelHeader left={<img src={logo} alt="" />}>Профиль</PanelHeader>
                <Group>
                    <SimpleCell
                        before={<Avatar src={avatar} size="84" />}
                        description="Санкт-Петербург"
                    >
                        Алексей Мазелюк
                    </SimpleCell>
                </Group>
                <Group>
                    <SimpleCell
                        before={<Icon28DocumentOutline />}
                        expandable
                        onClick={() => setActivePanel('my-ads')}
                    >
                        Мои объявления
                    </SimpleCell>
                </Group>
                <Group>
                    <SimpleCell
                        href="https://cyberdas.net/feedback"
                        before={<Icon28HelpCircleOutline />}
                        expandable
                    >
                        Помощь
                    </SimpleCell>
                    <SimpleCell
                        before={<Icon28InfoCircleOutline />}
                        expandable
                        onClick={() => setActivePanel('about')}
                    >
                        О приложении
                    </SimpleCell>
                </Group>
            </Panel>
            <Panel id="my-ads">
                <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('main')} />}>
                    Мои объявления
                </PanelHeader>
                <Group>
                    <List>
                        {removeList.map((el, i) => {
                            return (
                                <Cell key={el[0]} expandable removable description={el[1]}>
                                    {el[0]}
                                </Cell>
                            )
                        })}
                    </List>
                </Group>
            </Panel>
            <Panel id="about">
                <PanelHeader left={<PanelHeaderBack onClick={() => setActivePanel('main')} />}>
                    О приложении
                </PanelHeader>
                <Group>
                    <Div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={bigLogo} alt="" />
                    </Div>
                    <Div>
                        <Text weight="regular" style={{ marginBottom: 16 }}>
                            Барахолка CyberDAS - приложение, предназначенное для упрощения обмена и
                            мелкой торговли вещами в общежитиях, от создателей сайта{' '}
                            <Link href="https://cyberdas.net">CyberDAS</Link>.
                        </Text>
                        <Text weight="regular" style={{ marginBottom: 16 }}>
                            Если вы мечтали разрабатывать приложения и делать мир лучше, но что-то
                            вас останавливало, то у вас появился шанс - присоединяйтесь к нашему
                            проекту на <Link href="https://github.com/CyberDAS-Dev">Github</Link>.
                        </Text>
                    </Div>
                </Group>
            </Panel>
        </View>
    )
}
