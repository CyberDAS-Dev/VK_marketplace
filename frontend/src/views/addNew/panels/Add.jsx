import React from 'react'
import {
    Button,
    Card,
    CardScroll,
    FormItem,
    FormLayout,
    FormLayoutGroup,
    Group,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Radio,
    Textarea,
} from '@vkontakte/vkui'
import { Icon32CameraOutline } from '@vkontakte/icons'

export default function AddPanel({ id, backToMain }) {
    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={backToMain} />}>
                Новое объявление
            </PanelHeader>
            <Group>
                <FormLayout>
                    <CardScroll size="s">
                        <Card>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '96px',
                                    color: '#99A2AD',
                                }}
                            >
                                <Icon32CameraOutline />
                            </div>
                        </Card>
                        <Card>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '96px',
                                    color: '#99A2AD',
                                }}
                            >
                                <Icon32CameraOutline />
                            </div>
                        </Card>
                        <Card>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '96px',
                                    color: '#99A2AD',
                                }}
                            >
                                <Icon32CameraOutline />
                            </div>
                        </Card>
                        <Card>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '96px',
                                    color: '#99A2AD',
                                }}
                            >
                                <Icon32CameraOutline />
                            </div>
                        </Card>
                        <Card>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '96px',
                                    color: '#99A2AD',
                                }}
                            >
                                <Icon32CameraOutline />
                            </div>
                        </Card>
                        <Card>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '96px',
                                    color: '#99A2AD',
                                }}
                            >
                                <Icon32CameraOutline />
                            </div>
                        </Card>
                    </CardScroll>
                    <FormItem top="Название">
                        <Input />
                    </FormItem>
                    <FormLayoutGroup>
                        <FormItem top="Стоимость">
                            <Input />
                        </FormItem>
                        <FormItem top="Название">
                            <Radio name="price" value="1" defaultChecked>
                                За деньги
                            </Radio>
                            <Radio name="price" value="2">
                                Договорная
                            </Radio>
                            <Radio name="price" value="3">
                                Бесплатно
                            </Radio>
                        </FormItem>
                    </FormLayoutGroup>
                    <FormItem top="Описание">
                        <Textarea />
                    </FormItem>
                </FormLayout>
                <FormItem>
                    <Button type="submit" size="l" stretched>
                        Подать объявление
                    </Button>
                </FormItem>
            </Group>
        </Panel>
    )
}
