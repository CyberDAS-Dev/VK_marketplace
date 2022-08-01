import React from 'react'
import ReactDOM from 'react-dom'
import bridge from '@vkontakte/vk-bridge'
import { ConfigProvider, AdaptivityProvider, usePlatform } from '@vkontakte/vkui'
import App from '@/App'
import useAppearance from '@/utils/useAppearance'
import User from '@/store/UserStore'
import Ads from '@/store/AdsStore'
import { observer } from 'mobx-react-lite'
import { autorun } from 'mobx'

// Init VK  Mini App
bridge.send('VKWebAppInit')

const Index = observer(function Index() {
    const appearance = useAppearance()
    const platform = usePlatform()

    React.useEffect(
        () =>
            autorun(() => {
                User.getUser()
            }),
        []
    )

    return (
        <ConfigProvider platform={platform} appearance={appearance}>
            <AdaptivityProvider>
                <App />
            </AdaptivityProvider>
        </ConfigProvider>
    )
})

ReactDOM.render(<Index />, document.getElementById('root'))

// для режима разработки
if (import.meta.env.MODE === 'development') {
    // eslint-disable-next-line no-unused-vars
    import('./eruda').then(({ default: eruda }) => {})
    // eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
    import('@mobx-devtools/tools').then(({ default: devTools, injectStores }) => {
        injectStores({ Ads, User })
    })
}
