import * as db from "../../../model/diaristaDAO/loginDiarista"
import * as jwt from "../../../middleware/controllerJWT"
import * as message from "../../../modulo/config"


interface Diarista {
    id: number,
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

const autenticarUserDiarista = async function (body: Diarista){

    if(
        body.email === ""    || body.email == null    ||
        body.password === "" || body.password == null    
    ) {
        return false;
    } else {
        try{

            const dataUser = await db.loginDiarista(body);

            if(dataUser){
                const token = await jwt.createJWT(dataUser);
                let statusJson = {
                    id: dataUser.id,
                    email: dataUser.email,
                    token: token
                }
                return statusJson;
            } else {
                return message.ERRO_INVALID_USER;
            }
        } catch (error) {
            return message.ERRO_INTERNAL_SERVER;
        }
    }
}

export{
    autenticarUserDiarista
}