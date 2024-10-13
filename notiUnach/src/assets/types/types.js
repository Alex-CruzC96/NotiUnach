export const User={
    _id:'',
    name:'',
    mail:''
}

export const AuthResponse={
    body:{
        user:User,
        accessToken:'',
        refreshToken:''
    }
}

export const AuthResponseError={
    body:{
        error:''
    }
}
