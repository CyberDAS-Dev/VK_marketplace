import React from 'react'
import { observer } from 'mobx-react-lite'
import {
    Button,
    ButtonGroup,
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
import ImagesUpload from '@/views/addNew/components/ImagesUpload'
import { autorun } from 'mobx'

const EditAdPanel = observer(function EditAdPanel({ id, myAds, backToMain }) {
    const [title, setTitle] = React.useState(myAds.currentAd.title)
    const [images, setImages] = React.useState(myAds.currentAd.images)
    const [cost, setCost] = React.useState(myAds.currentAd.cost)
    const [description, setDescription] = React.useState(myAds.currentAd.description)
    const [bargain, toggleBargain] = React.useState(myAds.currentAd.bargain)
    const [radio, setRadio] = React.useState(1)

    React.useEffect(
        () =>
            autorun(() => {
                if (myAds.currentAd.bargain === true) {
                    setRadio(2)
                }
                if (myAds.currentAd.cost === 0 && myAds.currentAd.bargain === false) {
                    setRadio(3)
                }
                if (myAds.currentAd.cost && myAds.currentAd.bargain === false) {
                    setRadio(1)
                }
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    )

    const onRadioChange = (radioVal, costVal, bargainVal) => {
        setRadio(radioVal)
        toggleBargain(bargainVal)
        setCost(costVal)
    }

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={backToMain} />}>
                Новое объявление
            </PanelHeader>
            <Group>
                <FormLayout
                    onSubmit={async (e) => {
                        e.preventDefault()
                        const isError = await myAds.submitAd({
                            title,
                            cost,
                            description,
                            bargain,
                            images,
                        })
                        if (!isError) backToMain()
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
                        <FormItem top="Название">
                            <Radio
                                name="price"
                                value="1"
                                onChange={() => onRadioChange(1, '', false)}
                                checked={radio === 1}
                            >
                                За деньги
                            </Radio>
                            <Radio
                                name="price"
                                value="2"
                                onChange={() => onRadioChange(2, 0, true)}
                                checked={radio === 2}
                            >
                                Договорная
                            </Radio>
                            <Radio
                                name="price"
                                value="3"
                                onChange={() => onRadioChange(3, 0, false)}
                                checked={radio === 3}
                            >
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
                        <ButtonGroup mode="horizontal" gap="m" stretched>
                            <Button
                                appearance="negative"
                                onClick={async () => {
                                    const isError = await myAds.deleteAd(myAds.currentAd.id)
                                    if (!isError) backToMain()
                                }}
                                size="l"
                                stretched
                            >
                                Удалить
                            </Button>
                            <Button type="submit" size="l" stretched>
                                Изменить
                            </Button>
                        </ButtonGroup>
                    </FormItem>
                </FormLayout>
            </Group>
        </Panel>
    )
})

export default EditAdPanel
