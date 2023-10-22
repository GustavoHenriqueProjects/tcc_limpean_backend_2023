"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const controllerLogin_1 = require("./src/controller/controllerCliente/loginCliente/controllerLogin");
const controllerLogin_2 = require("./src/controller/controllerDiarista/loginDiarista/controllerLogin");
const controllerUpdateDataPersonalClient_1 = require("./src/controller/controllerCliente/updateDataPersonalClient/controllerUpdateDataPersonalClient");
const controllerUpdateAddressClient_1 = require("./src/controller/controllerCliente/updateDataPersonalClient/controllerUpdateAddressClient");
const tokenClient = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZmVybmFuZGExMEBnbWFpbC5jb20iLCJpZCI6MSwiaWF0IjoxNjk3ODM4Mjk5LCJleHAiOjE2OTc5MjQ2OTl9.CPGJrNtEWOD_C0gq0Lwij1sZw-iHRDVeRIviPPFWPjc";
const tokenDiarist = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicGF1bG9AZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY5Nzg0MDA1MCwiZXhwIjoxNjk3OTI2NDUwfQ.B_WGXQ5L-vET78OI5tzRr8YUipHRrPEeZNbZirXDkIE";
(0, globals_1.test)('Login cliente', async () => {
    const result = await (0, controllerLogin_1.loginClient)({
        email: "fernanda10@gmail.com",
        password: "135796"
    });
    (0, globals_1.expect)(result).toEqual({
        status: 200,
        id: 1,
        email: "fernanda10@gmail.com",
        token: globals_1.expect.any(String)
    });
});
(0, globals_1.test)('Login diarista', async () => {
    const result = await (0, controllerLogin_2.loginDiarist)({
        email: "paulo@gmail.com",
        password: "135796"
    });
    (0, globals_1.expect)(result).toEqual({
        status: 200,
        id: 1,
        email: "paulo@gmail.com",
        token: globals_1.expect.any(String)
    });
});
(0, globals_1.test)('Atualização dos dados do cliente', async () => {
    const result = await (0, controllerUpdateDataPersonalClient_1.updateDataClient)(tokenClient, {
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
    });
    (0, globals_1.expect)(result).toEqual({
        status: 201,
        message: "Registro atualizado com sucesso"
    });
});
(0, globals_1.test)('Atualização dos dados de endereço do cliente', async () => {
    const result = await (0, controllerUpdateAddressClient_1.updateDataAddressClient)(tokenClient, "1", {
        typeHouse: 2,
        state: 23,
        city: "São Paulo",
        cep: "09876543",
        publicPlace: "Novo Teste",
        complement: "Novo Complemento",
        district: "Novo distrito",
        houseNumber: "603"
    });
    (0, globals_1.expect)(result).toEqual({
        status: 201,
        message: "Registro atualizado com sucesso"
    });
});
