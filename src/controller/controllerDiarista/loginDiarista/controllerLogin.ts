import * as db from "../../../model/diaristaDAO/loginDiarista"
import * as jwt from "../../../middleware/controllerJWT"
import * as message from "../../../modulo/config"

interface LoginDiarist {
    email: string,
    password: string
}

const loginDiarist = async function (body: LoginDiarist) {

    if (
        body.email === ""    || body.email == null    ||
        body.password === "" || body.password == null
    ) {
        return message.ERRO_INVALID_USER
    } else {
        try {

            const dataUser = await db.loginDiarista(body);            
            
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
                return message.ERRO_INVALID_USER;
            }
        } catch (error) {
            return message.ERRO_INTERNAL_SERVER;
        }
   }
}

export {
    loginDiarist
}