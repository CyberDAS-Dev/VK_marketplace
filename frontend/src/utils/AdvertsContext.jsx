import React, { createContext } from 'react'

export const advertsContext = createContext()

export default function AdvertsContextProvider({ children }) {
    const [skip, setSkip] = React.useState(0)

    return <advertsContext.Provider value={{ skip, setSkip }}>{children}</advertsContext.Provider>
}
