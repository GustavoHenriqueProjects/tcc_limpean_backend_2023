import { describe, expect, test } from '@jest/globals'
import { loginClient } from './src/controller/controllerCliente/loginCliente/controllerLogin'
import { loginDiarist } from './src/controller/controllerDiarista/loginDiarista/controllerLogin'
import {updateDataClient} from './src/controller/controllerCliente/updateDataPersonalClient/controllerUpdateDataPersonalClient'
import {updateDataAddressClient} from './src/controller/controllerCliente/updateDataPersonalClient/controllerUpdateAddressClient'
import { updateDataDiarist } from './src/controller/controllerDiarista/updateDataPersonalDiarist/controllerUpdateDataPersonalDiarist'

const tokenClient = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmVybmFuZGExMEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjk3ODM4Mjk5LCJleHAiOjE2OTc5MjQ2OTl9.CPGJrNtEWOD_C0gq0Lwij1sZw-iHRDVeRIviPPFWPjc"
const tokenDiarist = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGF1bG9AZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY5Nzg0MDA1MCwiZXhwIjoxNjk3OTI2NDUwfQ.B_WGXQ5L-vET78OI5tzRr8YUipHRrPEeZNbZirXDkIE"

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
        biography: "Sou Media",
        idGender: 2,
        password: null,
        photoUser: "https://poto.png",
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
