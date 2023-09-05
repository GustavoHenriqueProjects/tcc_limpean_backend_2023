import { Router, Request, Response, NextFunction } from "express"
import bodyParser from 'body-parser'
import {loginTypeUser} from "../../controller/controllerUser/login/loginTypeUser"
import { registerTypeUser } from "../../controller/controllerUser/register/registerTypeUser"
import * as message from "../../modulo/config"
import * as jwt from 'jsonwebtoken'

const jsonParser = bodyParser.json()

const router = Router()


//EndPoint responsavel por cadastrar o cliente e o diarista
router.post('/v1/limpean/cadastro', jsonParser, async function (request: Request, response: Response) {
    
    let contentType = request.headers['content-type']

    if (contentType === 'application/json') {

        let dataBody = request.body

        let status = await registerTypeUser(dataBody)
     
        if(status){
            response.status(status.status)
            response.json(status)
        }
        else {
            response.send(message.ERRO_REGISTER_USER)
        }
    } else {
        return response.send(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//Endpoint responsavel por realizar a validação do login cliente e do diarista
router.post('/v1/limpean/login', jsonParser, async function (request, response) {

    let contentType = request.headers['content-type']

    if(contentType === 'application/json'){
        
        let dataBody = request.body
        
        let status = await loginTypeUser(dataBody)

        response.status(200)
        response.json(status)
        
    }
})


//EndPoint responsavel por deletar o cadastro do cliente
// router.delete('/v1/cadastro/cliente', jsonParser, async function (request: Request, response: Response) {
    
//     let contentType = request.headers['content-type']

//     if (contentType === 'application/json') {

//         let dataBody = request.body

//         let status = await controllerCliente.deleteRegisterCliente(dataBody)
    
//         response.status(status.status)
//         response.json(status)
        
        
//     } else {
//         return response.send(message.ERROR_INVALID_CONTENT_TYPE)
//     }
// })


//Função para verifica token
const verifyJWT = async function(request: Request, response: Response, next: NextFunction) {
    //Pra uso no Postman
    const token = request.headers['x-api-key'];

    //Para uso Front-end 
    //const token = request.headers['x-access-token'];
    
    const SECRETE = 'a1b2c3';

    if (!token) {
        return response.status(401).json(message.ERRO_REQUIRED_TOKEN);
    }

    try {
        //Discriptografa token 
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        next();
    } catch (error) {
        return response.status(401).json(message.ERRO_INVALID_TOKEN)
    }
}

//EndPoint de teste, para verificar autenticidade do token
router.get('/v1/form-dados', verifyJWT, jsonParser, async function (request, response) {
    console.log("Acesso")
})

export { router }