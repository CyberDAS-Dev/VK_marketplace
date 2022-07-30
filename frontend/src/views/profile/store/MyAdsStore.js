import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved } from 'mobx'
import myAdverts from '@/api/myAdverts'

class MyAds {
    ads = []
    cache = []
    hasMore = false
    isLoading = false
    isError = false
    isPulled = false

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })

        onBecomeObserved(this, 'ads', this.fetchNextAdverts)
        onBecomeUnobserved(this, 'ads', this.resetAds)
    }

    *hasNextPage() {
        const data = yield myAdverts(this.ads.length).catch(() => {
            this.isError = true
            this.isLoading = false
        })
        if (this.cache.length === 0) this.cache = [...data]
        if (data.length > 0) {
            this.hasMore = true
        } else {
            this.hasMore = false
        }

        return this.hasMore
    }

    *fetchNextAdverts() {
        this.isLoading = true
        yield this.hasNextPage()
        if (this.hasMore) {
            if (this.cache.length > 0) {
                this.ads = [...this.ads, ...this.cache]
                this.cache = []
            } else {
                const data = yield myAdverts(this.ads.length).catch(() => {
                    this.isError = true
                    this.isLoading = false
                })
                this.ads = [...this.ads, ...data]
            }
        }
        this.isLoading = false
    }

    resetAds() {
        this.ads = []
        this.hasMore = false
    }
}

export default MyAds
