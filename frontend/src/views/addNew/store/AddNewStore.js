import { makeAutoObservable, onBecomeObserved } from 'mobx'
import submitAdvert from '@/api/submitAdvert'

class AddNew {
    adProps = {}

    constructor() {
        makeAutoObservable(this)
    }

    async applyProps(props) {
        this.adProps = { ...this.adProps, ...props }
    }

    async submitAd() {
        submitAdvert(this.adProps)
        this.adProps = {}
    }
}

export default AddNew
