import { Router, Request, Response, NextFunction } from "express"
import bodyParser from 'body-parser'
import {registerCliente} from "../../controller/controllerCliente/registerCliente/controllerRegister"
import {registerDiarista} from "../../controller/controllerDiarista/registerDiarista/controllerRegisterDiarista"
import {autenticarUser} from "../../controller/controllerCliente/loginCliente/controllerLogin"
import * as message from "../../modulo/config"
import * as jwt from 'jsonwebtoken'
import { autenticarUserDiarista } from "../../controller/controllerDiarista/loginDiarista/controllerLogin"

const jsonParser = bodyParser.json()

const router = Router()

//EndPoint responsavel por cadastrar o cliente
router.post('/v1/cadastro/cliente', jsonParser, async function (request: Request, response: Response) {
    
    let contentType = request.headers['content-type']

    if (contentType === 'application/json') {

        let dataBody = request.body

        let status = await registerCliente(dataBody)
     
        response.status(status.status)
        response.json(status)
        
        
    } else {
        return response.send(message.ERROR_INVALID_CONTENT_TYPE)
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
    const token = request.headers['x-access-token'];

    const SECRETE = 'a1b2c3';

    if (!token) {
        return response.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        next();
    } catch (error) {
        return response.status(401).json(message.ERRO_INVALID_TOKEN)
    }
}

router.post('/v1/login/cliente', jsonParser, async function (request, response) {

    let contentType = request.headers['content-type']

    if(contentType === 'application/json'){
        
        let dataBody = request.body
        
        let status = await autenticarUser(dataBody)

        response.status(200)
        response.json(status)
        
    }
})



//*********************DIARISTA*********************//

//EndPoint responsavel por cadastrar o diarista
router.post('/v1/cadastro/diarista', jsonParser, async function (request: Request, response: Response) {
    
    let contentType = request.headers['content-type']

    if (contentType === 'application/json') {

        let dataBody = request.body

        let status = await registerDiarista(dataBody)
    
        console.log(status)
        response.status(status.status)
        response.json(status)
        
        
    } else {
        return response.send(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint responsavel por fazer o login do diarista
router.post('/v1/login/diarista', jsonParser, async function (request, response) {

    let contentType = request.headers['content-type']

    if(contentType === 'application/json'){
        
        let dataBody = request.body
        
        let status = await autenticarUserDiarista(dataBody)

        response.status(200)
        response.json(status)
        
    }
})

//EndPoint de teste, para verificar autenticidade do token
router.get('/v1/form-dados', verifyJWT, jsonParser, async function (request, response) {
    console.log("Acesso")
 })

export { router }
