import React from 'react'
import ReactDOM from 'react-dom'
import bridge from '@vkontakte/vk-bridge'
import { ConfigProvider, AdaptivityProvider, usePlatform } from '@vkontakte/vkui'
import App from './App'
import useAppearance from './utils/useAppearance'

// Init VK  Mini App
bridge.send('VKWebAppInit')

function Index() {
    const appearance = useAppearance()
    const platform = usePlatform()

    return (
        <ConfigProvider platform={platform} appearance={appearance}>
            <AdaptivityProvider>
                <App />
            </AdaptivityProvider>
        </ConfigProvider>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'))
if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-unused-vars
    import('./eruda').then(({ default: eruda }) => {}) // runtime download
}
