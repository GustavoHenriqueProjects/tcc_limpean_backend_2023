import * as message from "../../../modulo/config"
import { registerDiarista } from "../../controllerDiarista/registerDiarista/controllerRegisterDiarista"
import { registerCliente } from "../../controllerCliente/registerCliente/controllerRegisterClient"

interface Diarist {
    typeUser: string,
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: string,
    idGender: number,
    cpf: string,
    biography: string | null,
    averagePrice: string,
    address: {
        state: number,              // Estado
        city: string,               // Cidade
        cep: string,                // CEP
        publicPlace: string,        // Logradouro
        complement: string | null,  // Complemento
        district: string,           // Bairro
        houseNumber: string         // Numero da casa
    }
}

interface Cliente {
    typeUser: string,
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: string,
    idGender: number,
    cpf: string,
    biography: string | null,
    address: {
        typeHouse: number,          // Tipo de casa
        state: number,              // Estado
        city: string,               // Cidade
        cep: string,                // CEP
        publicPlace: string,        // Logradouro
        complement: string | null,  // Complemento
        district: string,           // Bairro
        houseNumber: string         // Numero da casa
    }
}

const registerTypeUser = async function (user: Diarist | Cliente) {

    let statusRegister   

    if(typeof user.typeUser !== "string" || (user.typeUser.toLowerCase() !== "diarist" && user.typeUser.toLowerCase() !== "client")) {
        statusRegister = message.ERRO_INVALID_USER
    } else {
        if (user.typeUser.toLowerCase() === "diarist"){            
            statusRegister = await registerDiarista(user as Diarist)
        } else if(user.typeUser.toLowerCase() === "client"){            
            statusRegister = await registerCliente(user as Cliente)
        }
    }    

    return statusRegister
}

export {
    registerTypeUser
}