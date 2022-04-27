import bridge from '@vkontakte/vk-bridge'
import React from 'react'

export default function useAppearance() {
    const [appearance, setAppearance] = React.useState('light')

    React.useEffect(() => {
        bridge.subscribe((event) => {
            if (!event.detail) {
                return
            }

            const { type, data } = event.detail

            if (type === 'VKWebAppUpdateConfig') {
                setAppearance(data.appearance)
            }
        })
    }, [])

    return appearance
}
