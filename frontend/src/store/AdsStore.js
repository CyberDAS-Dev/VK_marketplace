import { makeAutoObservable } from 'mobx'
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
        makeAutoObservable(this, {}, { deep: true })
    }

    async hasNextPage() {
        try {
            const data = await fetchAdverts(this.ads.length, this.filters).catch(() => {
                this.isError = true
                this.isLoading = false
            })
            if (this.cache.length === 0) this.cache = [...data]
            if (data.length > 0) {
                this.hasMore = true
            } else {
                this.hasMore = false
            }
        } catch (error) {
            this.isError = true
        }
        return this.hasMore
    }

    async fetchNextAdverts() {
        this.isLoading = true
        await this.hasNextPage()
        if (this.hasMore) {
            if (this.cache.length > 0) {
                this.ads = [...this.ads, ...this.cache]
                this.cache = []
            } else {
                const data = await fetchAdverts(this.ads.length, this.filters).catch(() => {
                    this.isError = true
                    this.isLoading = false
                })
                this.ads = [...this.ads, ...data]
            }
        }
        this.isLoading = false
    }

    async refresh() {
        this.isLoading = true
        this.isPulled = true
        const data = await fetchAdverts(0, this.filters, this.ads.length)
        this.ads = [...data]
        this.isLoading = false
        this.isPulled = false
    }

    async applyFilters(filters) {
        this.filters = { ...this.filters, ...filters }
        this.ads = []
        this.fetchNextAdverts()
    }
}

const ads = new Ads()
ads.fetchNextAdverts()

export default ads
