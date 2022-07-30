import React from 'react'
import ReactDOM from 'react-dom'
import bridge from '@vkontakte/vk-bridge'
import { ConfigProvider, AdaptivityProvider, usePlatform } from '@vkontakte/vkui'
import App from '@/App'
import useAppearance from '@/utils/useAppearance'
import User from '@/store/UserStore'
import Ads from '@/store/AdsStore'
import { observer } from 'mobx-react-lite'
import { injectStores } from '@mobx-devtools/tools'
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
if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-unused-vars
    import('./eruda').then(({ default: eruda }) => {})
    injectStores({ Ads, User })
}
