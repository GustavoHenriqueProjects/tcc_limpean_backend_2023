//import { loginTypeUser } from "../../controller/controllerUser/login/loginTypeUser"

import { Router, Request, Response, NextFunction } from "express"
import bodyParser from 'body-parser'
import { loginClient } from "../../controller/controllerCliente/loginCliente/controllerLogin"
import { loginDiarist } from "../../controller/controllerDiarista/loginDiarista/controllerLogin"
import { registerTypeUser } from "../../controller/controllerUser/register/registerTypeUser"
import { dataDiaristById } from "../../controller/controllerDiarista/dataDiarist/controllerDataDiaristById"
import { dataAllDiarist } from "../../controller/controllerDiarista/dataDiarist/controllerDataAllDiarist"
import * as message from "../../modulo/config"
import * as jwt from 'jsonwebtoken'

const jsonParser = bodyParser.json()

const router = Router()

//Função para verifica token
const verifyJWT = async function(request: Request, response: Response, next: NextFunction) {
    //Pra uso no Postman
    const token = request.headers['x-api-key'];    

    //Para uso Front-end 
    //const token = request.headers['x-access-token'];
    
    const SECRETE = '3oFEe4PtHxJeXsa7hY8WBFtCt1AJ4GwgqF6WARF1NG0mUnc89W';

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

/***************************************** Cadastro Cliente e Diarista *********************************/
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

//****************************************Cliente*****************************************************

//Endpoint responsavel por realizar a validação do login client
router.post('/v1/limpean/client/login', jsonParser, async function (request, response) {

    let contentType = request.headers['content-type']

    if(contentType === 'application/json'){
        
        let dataBody = request.body
        
        let status = await loginClient(dataBody)

        if(status){
            response.status(status.status)
            response.json(status)
        }else{
            response.send(message.ERRO_INTERNAL_SERVER)
        }
    }
})

/******************** Diarist ****************************************************************/

//Endpoint responsavel por realizar a validação do diarista
router.post('/v1/limpean/diarist/login', jsonParser, async function (request, response) {

    let contentType = request.headers['content-type']

    if(contentType === 'application/json'){
        
        let dataBody = request.body
        
        let status = await loginDiarist(dataBody)

        if(status){
            response.status(status.status)
            response.json(status)
        }
        else{
            response.send(message.ERRO_INTERNAL_SERVER)
        }
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

//EndPoint para listar todos os diaristas
router.get('/v1/limpean/diarist', async function (request, response) {

    const statusDataDiarist = await dataAllDiarist()

    response.status(statusDataDiarist.status)
    response.json(statusDataDiarist)
    
})

//EndPoint para listar o diarista com base no id
router.get('/v1/limpean/diarist/:token', verifyJWT, async function (request, response) {

    const token = request.params.token
    const statusDataDiarist = await dataDiaristById(token)

    response.status(statusDataDiarist.status)
    response.json(statusDataDiarist)
    
})

//EndPoint de teste, para verificar autenticidade do token
router.get('/v1/form-dados', verifyJWT, jsonParser, async function (request, response) {
    console.log("Acesso")
})

export { router }
