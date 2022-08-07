import { Alert } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

const DeleteConfirm = observer(function DeleteConfirm({ setPopout, deleteAd }) {
    return (
        <Alert
            actions={[
                {
                    title: 'Отменить',
                    autoclose: true,
                    mode: 'cancel',
                },
                {
                    title: 'Удалить',
                    autoclose: true,
                    mode: 'destructive',
                    action: () => {
                        deleteAd()
                    },
                },
            ]}
            actionsLayout="horizontal"
            onClose={() => setPopout(null)}
            header="Подтверждение"
            text="Вы действительно хотите удалить объявление?"
        />
    )
})

export default DeleteConfirm
