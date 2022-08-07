import { Alert } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'
import React from 'react'

const RedirectConfirm = observer(function redirectConfirm({ setPopout }) {
    return (
        <Alert
            actions={[
                {
                    title: 'Отмена',
                    autoclose: true,
                    mode: 'cancel',
                },
                {
                    title: 'Перейти',
                    autoclose: true,
                    mode: 'default',
                    action: () => {
                        window.location.href = 'https://cyberdas.net/feedback'
                    },
                },
            ]}
            actionsLayout="horizontal"
            onClose={() => setPopout(null)}
            header="Подтверждение перехода"
            text="Вы уверены, что хотите перейти на сторонний ресурс, где вы сможете сообщить нам о проблеме?"
        />
    )
})

export default RedirectConfirm
