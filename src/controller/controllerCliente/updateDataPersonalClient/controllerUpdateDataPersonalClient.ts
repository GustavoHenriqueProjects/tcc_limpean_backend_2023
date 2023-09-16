import * as message from "../../../modulo/config"
import * as db from "../../../model/clienteDAO/updateDateClientById"
import { checkDataClient } from "./validate/validateDataUpdateClient"
import * as jwt from "jsonwebtoken"

interface UpdateDataClient {
    name: string | null,
    biography: string | null,
    idGender: number | null,
    ddd: string | null,
    phone: string | null,
    newDDD: string | null,
    newPhone: string | null,
    password: string | null,
    photoUser: string | null
}

interface TokenPayLoad {
    id: string,
    name: string
}

const updateDataClient = async function (token: string, dataClient: UpdateDataClient) {
    const SECRETE = message.REQUIRE_SECRETE

    try {
    
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayLoad
        const { id, name } = decoded

        const tokenDecoded = { id, name }
        
        if (!checkDataClient(dataClient)) {            
            return message.ERRO_UPDATE_USER
        } else {
            
            const statusClient = await db.updateDataClient(tokenDecoded, dataClient)
            if (statusClient) {
                return message.UPDATE_USER
            } else {
                return message.ERRO_UPDATE_USER
            }
        }

    } catch (error) {
                
        return message.ERRO_INTERNAL_SERVER
    }
}

export {
    updateDataClient
}
