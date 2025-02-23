import { TUser } from "./user.interface"
import { User } from "./user.model"


const createUserIntoDB =async (file:any,payload:TUser)=>{
        const imageName = `${payload.role}${payload.name}`
        const path= file?.path
    const image = await  ,
    const userData: Partial<TUser>={
        ...payload,
        role:'user',
        id:await ,
        photo:image
    }

    const result = await User.create()
    return result
}

export const userService = {
    createImageBitmap
}