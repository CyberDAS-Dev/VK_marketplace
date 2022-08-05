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
import { useForm, Controller, useWatch } from 'react-hook-form'
import ImagesUpload from '../components/ImagesUpload'

const AddPanel = observer(function AddPanel({ id, backToMain, submitAd }) {
    const [images, setImages] = React.useState([])
    const { handleSubmit, control, getValues, setValue } = useForm({
        mode: 'all',
        defaultValues: {
            title: '',
            cost: '',
            description: '',
            bargain: false,
            costType: '1',
        },
    })

    const costType = useWatch({
        control,
        name: 'costType',
    })

    React.useEffect(() => {
        switch (costType) {
            case '1':
                setValue('cost', '')
                setValue('bargain', false)
                break
            case '2':
                setValue('cost', 0)
                setValue('bargain', true)
                break
            case '3':
                setValue('cost', 0)
                setValue('bargain', false)
                break
            default:
                break
        }
    }, [costType, setValue])

    const getStatus = React.useMemo(
        () =>
            ({ invalid }) => {
                return invalid ? 'error' : 'valid'
            },
        []
    )

    const onSubmit = (data) =>
        submitAd({
            cost: data.cost,
            bargain: data.bargain,
            description: data.description,
            title: data.title,
            images,
        })

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
                        {getValues('costType') === '1' ? (
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
                        ) : null}
                        <FormItem top="Название">
                            <Controller
                                name="costType"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Radio {...field} defaultChecked value="1">
                                            За деньги
                                        </Radio>
                                        <Radio {...field} value="2">
                                            Договорная
                                        </Radio>
                                        <Radio {...field} value="3">
                                            Бесплатно
                                        </Radio>
                                    </>
                                )}
                            />
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
