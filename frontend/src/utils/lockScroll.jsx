import React from 'react'

export default function useScrollLock() {
    const lockScroll = React.useCallback(() => {
        document.body.style.overflow = 'hidden'
    }, [])

    const unlockScroll = React.useCallback(() => {
        document.body.style.overflow = ''
    }, [])

    return {
        lockScroll,
        unlockScroll,
    }
}
