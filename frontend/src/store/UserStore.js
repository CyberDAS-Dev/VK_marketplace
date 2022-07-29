import { makeAutoObservable, runInAction } from 'mobx'
import bridge from '@vkontakte/vk-bridge'

class User {
    id = 0
    name = ''
    photo = ''
    city = ''
    token = ''

    constructor() {
        makeAutoObservable(this)
    }

    async getUser() {
        bridge.send('VKWebAppGetUserInfo').then((data) => {
            runInAction(() => {
                this.id = data.id
                this.name = `${data.first_name} ${data.last_name}`
                this.photo = data.photo_200
                this.city = data.city.title
            })
        })
    }
}

const user = new User()

export default user
