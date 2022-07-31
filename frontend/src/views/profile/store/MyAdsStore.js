import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved } from 'mobx'
import { myAdverts, getById, submitAdvert } from '@/api/myAdverts'

class MyAds {
    ads = []
    cache = []
    hasMore = false
    isLoading = false
    isError = false
    isPrefetching = false
    currentAd = {}

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })

        onBecomeObserved(this, 'ads', this.fetchNextAdverts)
        onBecomeUnobserved(this, 'ads', this.resetAds)
    }

    *hasNextPage() {
        const data = yield myAdverts(this.ads.length).catch(() => {
            this.isError = true
        })

        if (data) this.isError = false

        if (data && this.cache.length === 0) this.cache = [...data]

        if (data?.length > 0) {
            this.hasMore = true
        } else {
            this.hasMore = false
        }

        return this.hasMore
    }

    *fetchNextAdverts() {
        if (this.ads.length === 0) {
            this.isPrefetching = true
        } else {
            this.isLoading = true
        }

        yield this.hasNextPage()

        if (this.hasMore) {
            if (this.cache.length > 0) {
                this.ads = [...this.ads, ...this.cache]
                this.isError = false
                this.cache = []
            } else {
                const data = yield myAdverts(this.ads.length).catch(() => {
                    this.isError = true
                })
                if (data) {
                    this.ads = [...this.ads, ...data]
                    this.isError = false
                }
            }
        }

        this.isLoading = false
        this.isPrefetching = false
    }

    *editAd(id) {
        this.isPrefetching = true
        this.currentAd = {}
        const current = yield getById(id).catch(() => {
            this.isError = true
        })

        if (current) {
            this.isError = false
            this.currentAd = current
        }
        this.isPrefetching = false

        return this.isError
    }

    *submitAd(props) {
        const data = yield submitAdvert(this.currentAd.id, props).catch(() => {
            this.isError = true
        })

        if (data) this.isError = false
        this.currentAd = {}
    }

    resetAds() {
        this.ads = []
        this.hasMore = false
    }
}

export default MyAds
