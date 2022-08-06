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
import { useForm, Controller } from 'react-hook-form'

const EditAdPanel = observer(function EditAdPanel({
    id,
    deleteAd,
    currentAd,
    backToMain,
    submitAd,
}) {
    const [images, setImages] = React.useState(currentAd?.images ?? [])
    const [radio, setRadio] = React.useState(1)
    const { handleSubmit, watch, control, setValue } = useForm({
        mode: 'all',
        defaultValues: {
            title: currentAd?.title ?? '',
            cost: currentAd?.cost ?? '',
            description: currentAd?.description ?? '',
            bargain: currentAd?.bargain ?? '',
        },
    })

    const [cost, bargain] = watch(['cost', 'bargain'])

    React.useEffect(() => {
        if (bargain === true) {
            setRadio(2)
        }
        if (cost === 0) {
            setRadio(3)
        }
        if (cost > 0 && bargain === false) {
            setRadio(1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onRadioChange = (radioVal, costVal, bargainVal) => {
        setRadio(radioVal)
        setValue('bargain', bargainVal)
        setValue('cost', costVal)
    }

    const getStatus = React.useMemo(
        () =>
            ({ invalid }) => {
                return invalid ? 'error' : 'valid'
            },
        []
    )

    const onSubmit = (data) => submitAd({ ...data, images })

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack onClick={backToMain} />}>
                Новое объявление
            </PanelHeader>
            <Group>
                <FormLayout onSubmit={handleSubmit(onSubmit)}>
                    <ImagesUpload images={images} setImages={setImages} />
                    <Controller
                        name="title"
                        rules={{ required: true, minLength: 2, maxLength: 15 }}
                        control={control}
                        render={({ field, fieldState }) => (
                            <FormItem top="Название" status={getStatus(fieldState)}>
                                <Input placeholder="Введите название" {...field} />
                            </FormItem>
                        )}
                    />
                    <FormLayoutGroup>
                        {bargain !== true && cost !== 0 && (
                            <Controller
                                name="cost"
                                rules={{ required: true, min: 0 }}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <FormItem top="Стоимость" status={getStatus(fieldState)}>
                                        <Input
                                            type="number"
                                            placeholder="Введите стоимость"
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormItem>
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
                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: true, min: 0 }}
                        render={({ field, fieldState }) => (
                            <FormItem top="Описание" status={getStatus(fieldState)}>
                                <Textarea placeholder="Введите описание" {...field} />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <ButtonGroup mode="horizontal" gap="m" stretched>
                            {deleteAd && (
                                <Button appearance="negative" onClick={deleteAd} size="l" stretched>
                                    Удалить
                                </Button>
                            )}

                            <Button type="submit" size="l" stretched>
                                {deleteAd ? 'Изменить' : 'Подать объявление'}
                            </Button>
                        </ButtonGroup>
                    </FormItem>
                </FormLayout>
            </Group>
        </Panel>
    )
})

export default EditAdPanel
