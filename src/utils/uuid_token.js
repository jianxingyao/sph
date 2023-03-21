import { v4 as uuidv4 } from 'uuid';
//给游客生成 uuid  唯一标识
export default () => {
    let uuid_token = localStorage.getItem('UUIDTOKEN')

    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }

    return uuid_token
}