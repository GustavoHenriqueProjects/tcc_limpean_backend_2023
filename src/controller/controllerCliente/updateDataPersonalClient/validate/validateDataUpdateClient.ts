import { validatePhoneWithDDD } from "../../registerCliente/validate/validateRegister"

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

function isURL(url: string) {
    // Expressão regular para verificar URLs
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}

const checkDataClient = (data: UpdateDataClient) => {
    let status = true

    if(data.name == null && data.biography == null && data.idGender == null && data.ddd == null &&
        data.phone == null && data.newDDD == null && data.newPhone == null && data.password == null && data.photoUser == null){
        status = false
    }
    if (typeof data.name === "string" && data.name.length < 2) {        
        status = false
    } else if (typeof data.idGender === "number" && (data.idGender > 3 || data.idGender < 1)) {
        status = false
    } else if(typeof data.phone === "string" && typeof data.ddd === "string" && !validatePhoneWithDDD(data.ddd, data.phone)){
        status = false
    } else if (typeof data.newPhone === "string" && typeof data.newDDD === "string" && !validatePhoneWithDDD(data.newDDD, data.newPhone)) {
        status = false
    } else if (typeof data.password === "string" && data.password.length < 6) {
        status = false
    } else if (typeof data.photoUser === "string" && !isURL(data.photoUser)) {
        status = false
    } 

    return status

}

export {
    checkDataClient
}