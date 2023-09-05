import * as message from "../../../modulo/config"
import { loginDiarist } from "../../controllerDiarista/loginDiarista/controllerLogin"
import { loginClient } from "../../controllerCliente/loginCliente/controllerLogin"

interface Login {
    typeUser: string,
    email: string,
    password: string
}

const loginTypeUser = async function (login:Login) {

    let statusLogin    

    if(typeof login.typeUser !== "string" || (login.typeUser.toLocaleLowerCase() !== "diarist" && login.typeUser.toLocaleLowerCase() !== "client")) {
        statusLogin = message.ERRO_INVALID_TYPE_USER
    }else{
        if (login.typeUser.toLowerCase() === "diarist"){            
            statusLogin = await loginDiarist(login)
        }else if(login.typeUser.toLowerCase() === "client"){            
            statusLogin = await loginClient(login)
        }
    }    

    return statusLogin
}

export {
    loginTypeUser
}