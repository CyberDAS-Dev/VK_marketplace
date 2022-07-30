import React from 'react'
import { Group, Panel, PanelHeader, PanelHeaderBack, Div, Text, Link } from '@vkontakte/vkui'
import bigLogo from '@/views/profile/images/biglogo.png'
import { observer } from 'mobx-react-lite'

const AboutPanel = observer(function AboutPanel({ id, backToMain }) {
    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={backToMain} />}>О приложении</PanelHeader>
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
                        Если вы мечтали разрабатывать приложения и делать мир лучше, но что-то вас
                        останавливало, то у вас появился шанс - присоединяйтесь к нашему проекту на{' '}
                        <Link href="https://github.com/CyberDAS-Dev">Github</Link>.
                    </Text>
                </Div>
            </Group>
        </Panel>
    )
})

export default AboutPanel
