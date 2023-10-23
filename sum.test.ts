import { describe, expect, test } from '@jest/globals'
import { loginClient } from './src/controller/controllerCliente/loginCliente/controllerLogin'
import { loginDiarist } from './src/controller/controllerDiarista/loginDiarista/controllerLogin'
import { updateDataClient } from './src/controller/controllerCliente/updateDataPersonalClient/controllerUpdateDataPersonalClient'
import { updateDataAddressClient } from './src/controller/controllerCliente/updateDataPersonalClient/controllerUpdateAddressClient'
import { updateDataDiarist } from './src/controller/controllerDiarista/updateDataPersonalDiarist/controllerUpdateDataPersonalDiarist'

const tokenClient = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmVybmFuZGExMEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjk4MDA2NTI1LCJleHAiOjE2OTgwOTI5MjV9.Eiop6q5tYozVAzwCnZ7MAYvYpK7EwhrcsAI3xEXz-6E"
const tokenDiarist = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGF1bG9AZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY5ODAwNzMyOSwiZXhwIjoxNjk4MDkzNzI5fQ.tLpkoLvkuqUCKmpGuPywQ1gtMdaSW4omlhcyIp0EiJY"

describe('Testes de utilitarios de API', () => {

    test('Login cliente', async () => {

        const result = await loginClient(

            {
                email: "fernanda10@gmail.com",
                password: "135796"
            }

        )

        expect(result).toEqual({

            status: 200,
            id: 1,
            email: "fernanda10@gmail.com",
            token: expect.any(String)

        })

    })

    test('Login diarista', async () => {

        const result = await loginDiarist(

            {
                email: "paulo@gmail.com",
                password: "135796"
            }

        )

        expect(result).toEqual({

            status: 200,
            id: 1,
            email: "paulo@gmail.com",
            token: expect.any(String)

        })

    })


    test('Atualização dos dados do cliente', async () => {
        const result = await updateDataClient(tokenClient, {
            name: "Marilda Tiago",
            biography: "Sou Medica",
            idGender: 2,
            password: null,
            photoUser: "https://photo.png",
            phones: [
                {
                    ddd: null,
                    phone: null,
                    newDDD: null,
                    newPhone: null
                }
            ]
        })

        expect(result).toEqual({
            status: 201,
            message: "Registro atualizado com sucesso"
        })
    })

    test('Atualização dos dados de endereço do cliente', async () => {
        const result = await updateDataAddressClient(tokenClient, "1", {
            typeHouse: 2,
            state: 23,
            city: "São Paulo",
            cep: "09876543",
            publicPlace: "Novo Teste",
            complement: "Novo Complemento",
            district: "Novo distrito",
            houseNumber: "603"
        })

        expect(result).toEqual({
            status: 201,
            message: "Registro atualizado com sucesso"
        })
    })

    test('Atualização dos dados do diarista', async () => {
        const result = await updateDataDiarist(tokenDiarist, {
            name: "Paulo Vinicius Silva",
            biography: "Sou Mêcanico Automotivo e Diarista nos fins de semana.",
            idGender: null,
            password: null,
            photoUser: null,
            averagePrice: null,
            phones: [{
                ddd: null,
                phone: null,
                newDDD: null,
                newPhone: null,
            }],
            address: {
                state: null,        // Estado
                city: null,         // Cidade
                cep: null,          // CEP
                publicPlace: null,  // Logradouro
                complement: null,   // Complemento
                district: null,     // Bairro
                houseNumber: null   // Numero da casa
            }
        })

        expect(result).toEqual({
            status: 201,
            message: "Registro atualizado com sucesso"
        })
    })
})