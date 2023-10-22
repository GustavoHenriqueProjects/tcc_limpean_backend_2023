import * as message from "../../../modulo/config"
import * as db from "../../../model/diaristaDAO/updateDateDiaristById"
import { createStructureSimpleDataPersonal } from "./createDataStructure/dataPersonalSimple"
import { createStructureSimpleDataPhone } from "./createDataStructure/dataPersonalPhone"
import { createStructureSimpleDataAddress } from "./createDataStructure/dataPersonalAddress"

import { checkDataDiarist } from "./validate/validateDataUpdateDiarist"
import * as jwt from "jsonwebtoken"

interface UpdateDataDiarist {
    name: string | null;
    biography: string | null;
    idGender: number | null;
    password: string | null;
    photoUser: string | null;
    averagePrice: string | null;
    phones: {
        ddd: string | null;
        phone: string | null;
        newDDD: string | null;
        newPhone: string | null;
    }[];
    address: {
        state: number | null;              // Estado
        city: string | null;               // Cidade
        cep: string | null;                // CEP
        publicPlace: string | null;        // Logradouro
        complement: string | null;         // Complemento
        district: string | null;           // Bairro
        houseNumber: string | null;        // Numero da casa
    };
}

interface TokenPayLoad {
    id: string,
    name: string
}

const updateDataDiarist = async function (token: string, dataDiarist: UpdateDataDiarist) {
    const SECRETE = message.REQUIRE_SECRETE

    try {
    
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayLoad
        const { id, name } = decoded

        const tokenDecoded = { id, name }
        
        let statusCheck = await checkDataDiarist(dataDiarist, tokenDecoded)
        
        if(!statusCheck){            
            return message.ERRO_UPDATE_USER
        } else {
            
            const simpleData = createStructureSimpleDataPersonal(dataDiarist)
            if(simpleData){
                const updateDataSimple = await db.updateDataSimpleDiarist(tokenDecoded, simpleData)
                if(!updateDataSimple){                    
                    return message.ERRO_UPDATE_DATA_SIMPLE_DIARIST
                }
            }

            const dataPhone = createStructureSimpleDataPhone(dataDiarist.phones)
            if(dataPhone){
                const updateNumberPhone = await db.updateDataPhone(tokenDecoded, dataPhone)
                
                if(!updateNumberPhone){        
                    return message.ERRO_UPDATE_PHONE_USER
                }
            }
            
            const dataAddress = createStructureSimpleDataAddress(dataDiarist.address)
            if(dataAddress){
                const updateDataAdress= await db.updateDataAddressDiarist(tokenDecoded, dataAddress)
                
                if(!updateDataAdress){                                                
                    return message.ERRO_ADDRESS
                }
            }

            return message.UPDATE_USER
        }

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export {
    updateDataDiarist
}
