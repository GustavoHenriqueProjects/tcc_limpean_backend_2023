//import { loginClient } from "../../controller/controllerCliente/loginCliente/controllerLogin"
//import { loginDiarist } from "../../controller/controllerDiarista/loginDiarista/controllerLogin"

import { Router, Request, Response, NextFunction } from "express"
import bodyParser from 'body-parser'
import { loginTypeUser } from "../../controller/controllerUser/login/loginTypeUser"
import { registerTypeUser } from "../../controller/controllerUser/register/registerTypeUser"
import { dataDiaristById } from "../../controller/controllerDiarista/dataDiarist/controllerDataDiaristById"
import { dataAllDiarist } from "../../controller/controllerDiarista/dataDiarist/controllerDataAllDiarist"
import { deleteRegisterClient } from "../../controller/controllerCliente/deleteRegisterClient/controllerDeleteRegisterClient"
import { updateDataClient } from "../../controller/controllerCliente/updateDataPersonalClient/controllerUpdateDataPersonalClient"
import * as message from "../../modulo/config"
import * as jwt  from "jsonwebtoken"


const jsonParser = bodyParser.json()

const router = Router()

const verifyJWT = async function(request: Request, response: Response, next: NextFunction) {
    //Pra uso no Postman
    const token = request.headers['x-api-key'];    

    //Para uso Front-end 
    //const token = request.headers['x-access-token'];
    
    const SECRETE = message.REQUIRE_SECRETE;

    if (!token) {
        
        return response.status(401).json(message.ERRO_REQUIRED_TOKEN);
    }

    try {

        jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE)

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

/***************************************** Login Cliente e Diarista ***********************************/
router.post('/v1/limpean/login', jsonParser, async function (request, response) {

    let contentType = request.headers['content-type']

    if(contentType === 'application/json'){
        
        let dataBody = request.body
        
        let statusLogin = await loginTypeUser(dataBody)

        if(statusLogin){
            response.status(statusLogin.status)
            response.json(statusLogin)
        }else{
            response.send(message.ERRO_INTERNAL_SERVER)
        }
    }
})

//EndPoint para excluir um cliente
router.delete('/v1/limpean/client/:token', verifyJWT, async function (request, response){

    const token = request.params.token
    const statusClient = await deleteRegisterClient(token)
   
    response.status(statusClient.status)
    response.json(statusClient)

})

//EndPoint para atualizar um cliente
router.put('/v1/limpean/client/:token', verifyJWT, jsonParser, async function (request, response){

    const token = request.params.token
    const dataBody = request.body

    const statusClient = await updateDataClient(token, dataBody)

    response.status(statusClient.status)
    response.json(statusClient)


})
//****************************************Cliente*****************************************************

//Endpoint responsavel por realizar a validação do login client
// router.post('/v1/limpean/client/login', jsonParser, async function (request, response) {

//     let contentType = request.headers['content-type']

//     if(contentType === 'application/json'){
        
//         let dataBody = request.body
        
//         let status = await loginClient(dataBody)

//         if(status){
//             response.status(status.status)
//             response.json(status)
//         }else{
//             response.send(message.ERRO_INTERNAL_SERVER)
//         }
//     }
// })

/******************** Diarist ****************************************************************/

//Endpoint responsavel por realizar a validação do diarista
// router.post('/v1/limpean/diarist/login', jsonParser, async function (request, response) {

//     let contentType = request.headers['content-type']

//     if(contentType === 'application/json'){
        
//         let dataBody = request.body
        
//         let status = await loginDiarist(dataBody)

//         if(status){
//             response.status(status.status)
//             response.json(status)
//         }
//         else{
//             response.send(message.ERRO_INTERNAL_SERVER)
//         }
//     }
// })


//EndPoint para listar todos os diaristas
router.get('/v1/limpean/diarist', async function (request, response) {

    const statusDataDiarist = await dataAllDiarist()

    response.status(statusDataDiarist.status)
    response.json(statusDataDiarist)
    
})

// router.delete('/v1/limpean/diarist/:token', verifyJWT, async function (request, response){

//     const token = request.params.token
//     const statusDiarist = await deleteRegisterDiarist(token)

//     response.status(statusDiarist.status)
//     response.json(statusDiarist)

// })


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