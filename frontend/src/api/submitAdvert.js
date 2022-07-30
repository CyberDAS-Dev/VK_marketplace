import http from '@/api/http'

// function dataURItoBlob(dataURI) {
//     // convert base64/URLEncoded data component to raw binary data held in a string
//     let byteString
//     if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1])
//     else byteString = unescape(dataURI.split(',')[1])

//     // separate out the mime component
//     const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

//     // write the bytes of the string to a typed array
//     const ia = new Uint8Array(byteString.length)
//     for (let i = 0; i < byteString.length; i += 1) {
//         ia[i] = byteString.charCodeAt(i)
//     }

//     return new Blob([ia], { type: mimeString })
// }

const submitAdvert = async (props) => {
    // FIXME не понимаю че апи хочет от меня.. временно передаю пустые картинки
    // const { images } = props
    // const imagesUrls = await images.map(async (image) => {
    //     const formData = new FormData()
    //     formData.append('file', dataURItoBlob(image.data_url))
    //     const { data } = await http.post(`/images/`, formData, {
    //         headers: { 'Content-Type': 'multipart/form-data' },
    //     })
    //     return data
    // })
    http.post('/items/', { ...props, images: [] })
}

export default submitAdvert
