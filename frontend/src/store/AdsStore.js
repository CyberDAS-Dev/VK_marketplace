import { makeAutoObservable, onBecomeObserved, onBecomeUnobserved } from 'mobx'
import fetchAdverts from '@/api/fetchAdverts'

class Ads {
    ads = []
    cache = []
    hasMore = false
    isLoading = false
    isPrefetching = false
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

    // TODO вынести обработку ошибок в axios? подумать над стейтами ошибок и загрузок
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true })

        onBecomeObserved(this, 'ads', this.fetchNextAdverts)
        onBecomeUnobserved(this, 'ads', this.resetAds)
    }

    *hasNextPage() {
        const data = yield fetchAdverts(this.ads.length, this.filters).catch(() => {
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
                const data = yield fetchAdverts(this.ads.length, this.filters).catch(() => {
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

    *refresh() {
        this.isPulled = true

        const data = yield fetchAdverts(0, this.filters).catch(() => {
            this.isError = true
        })

        if (data?.length > 0) this.hasMore = true
        if (data) {
            this.ads = [...data]
            this.isError = false
        }

        this.isPulled = false
    }

    resetAds() {
        this.ads = []
        this.hasMore = false
    }

    applyFilters(filters) {
        this.filters = { ...this.filters, ...filters }
        this.ads = []
        this.fetchNextAdverts()
    }
}

const ads = new Ads()

export default ads
