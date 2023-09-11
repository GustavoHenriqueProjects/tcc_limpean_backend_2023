import * as db from "../../../model/clienteDAO/loginCliente"
import * as jwt from "../../../middleware/controllerJWT"
import * as message from "../../../modulo/config"

interface LoginClient {
    email: string,
    password: string
}

const loginClient = async function (body: LoginClient) {

    if (
        body.email === ""    || body.email == null    ||
        body.password === "" || body.password == null
    ) {
        return message.ERRO_INVALID_USER
    } else {
        try {
            
            const dataUser = await db.loginCliente(body);
            
            if (dataUser) {
                const token = jwt.createJWT(dataUser);
                let statusJson = {
                    status: 200,
                    id: dataUser.id,
                    email: dataUser.email,
                    token: token
                }                
                return statusJson;
            } else {
                console.log("test");
                
                return message.ERRO_INVALID_USER;
            }
        } catch (error) {
            return message.ERRO_INTERNAL_SERVER;
        }
    }
}

export {
    loginClient
}