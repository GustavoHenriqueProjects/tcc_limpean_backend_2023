
interface UpdateAddressClient {
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

function isURL(url: string) {
    // Expressão regular para verificar URLs
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}

const checkDataAddress =  async function (data: UpdateAddressClient, token: TokenPayLoad){
    let status = true;    

    if (
        data.address.state === null && data.address.city === null && data.address.cep === null &&
        data.address.publicPlace === null && data.address.complement === null && data.address.district === null && data.address.houseNumber === null) {
        status = false;        
    }


    if(data.address.state !== null && (typeof data.address.state !== "number" || data.address.state < 1 || data.address.state > 27)){
        status = false
    }

    if(data.address.city !== null && (typeof data.address.city !== "string")){
        status = false
    }

    if(data.address.cep !== null && (typeof data.address.cep !== "string" || data.address.cep.length > 10)){
        status = false
    }

    if(data.address.publicPlace !== null && (typeof data.address.publicPlace !== "string")){        
        status = false
    }

    if(data.address.complement !== null && (typeof data.address.complement !== "string")){
        status = false
    }

    if(data.address.district !== null && (typeof data.address.district !== "string")){
        status = false
    }

    if(data.address.houseNumber !== null && (typeof data.address.houseNumber !== "string")){
        status = false
    }
    
    return status
}

export {
    checkDataAddress
}