import React from 'react'
import {
    Button,
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
import { observer } from 'mobx-react-lite'
import ImagesUpload from '../components/ImagesUpload'

const AddPanel = observer(function AddPanel({ id, backToMain, submitAd }) {
    const [images, setImages] = React.useState([])
    const [title, setTitle] = React.useState('')
    const [cost, setCost] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [bargain, toggleBargain] = React.useState(false)

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={backToMain} />}>
                Новое объявление
            </PanelHeader>
            <Group>
                <FormLayout
                    onSubmit={(e) => {
                        e.preventDefault()
                        submitAd({ title, cost, description, bargain, images })
                    }}
                >
                    <ImagesUpload images={images} setImages={setImages} />
                    <FormItem top="Название">
                        <Input
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}
                        />
                    </FormItem>
                    <FormLayoutGroup>
                        {bargain !== true && cost !== 0 && (
                            <FormItem top="Стоимость">
                                <Input value={cost} onChange={(e) => setCost(e.target.value)} />
                            </FormItem>
                        )}
                        {/* // TODO не знаю что надо сделать, но что-то точно надо */}
                        <FormItem
                            top="Название"
                            onChange={(e) => {
                                const value = Number(e.target.value)
                                if (value === 1) {
                                    toggleBargain(false)
                                    setCost('')
                                }
                                if (value === 2) {
                                    toggleBargain(true)
                                    setCost(0)
                                }
                                if (value === 3) {
                                    toggleBargain(false)
                                    setCost(0)
                                }
                            }}
                        >
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
                        <Textarea
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                        />
                    </FormItem>
                    <FormItem>
                        <Button type="submit" size="l" stretched>
                            Подать объявление
                        </Button>
                    </FormItem>
                </FormLayout>
            </Group>
        </Panel>
    )
})

export default AddPanel
