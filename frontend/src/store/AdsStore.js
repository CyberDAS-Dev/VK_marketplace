import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved } from 'mobx'
import fetchAdverts from '@/api/fetchAdverts'

class Ads {
    ads = []
    cache = []
    hasMore = false
    isLoading = false
    isError = false
    isPulled = false
    filters = {
        category: 'all',
        type: 'all',
        sort: 'newer',
        cost: [0, 2000],
        dontShowBargain: false,
        onlyPhoto: false,
        search: '',
    }

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })

        onBecomeObserved(this, 'ads', this.fetchNextAdverts)
        onBecomeUnobserved(this, 'ads', this.resetAds)
    }

    *hasNextPage() {
        const data = yield fetchAdverts(this.ads.length, this.filters).catch(() => {
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
                const data = yield fetchAdverts(this.ads.length, this.filters).catch(() => {
                    this.isError = true
                    this.isLoading = false
                })
                this.ads = [...this.ads, ...data]
            }
        }
        this.isLoading = false
    }

    *refresh() {
        this.isLoading = true
        this.isPulled = true
        const data = yield fetchAdverts(0, this.filters, this.ads.length)
        this.ads = [...data]
        this.isLoading = false
        this.isPulled = false
    }

    resetAds() {
        this.ads = []
        this.hasMore = false
    }

    async applyFilters(filters) {
        this.filters = { ...this.filters, ...filters }
        this.ads = []
        this.fetchNextAdverts()
    }
}

const ads = new Ads()

export default ads
