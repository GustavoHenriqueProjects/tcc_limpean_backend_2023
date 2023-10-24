import { describe, test, expect } from '@jest/globals'
import request from 'supertest'

const serverUrl = 'http://localhost:8080'  // Substitua com o URL do seu servidor

describe('Testes de Integração de API', () => {

  let tokenClient: string
  let tokenDiarist: string

  test('Deve realizar o login de um usuário existente (cliente)', async () => {
    const loginClient = {
      typeUser: 'client',
      email: 'fernanda10@gmail.com',
      password: '135796',
    };

    const status = await request(serverUrl)
      .post('/v1/limpean/login')
      .set('Content-Type', 'application/json')
      .send(loginClient);

    expect(status.status).toBe(200);
    expect(status.body.id).toBe(1);
    expect(status.body.email).toBe('fernanda10@gmail.com');
    expect(typeof status.body.token).toBe('string');

    tokenClient = status.body.token
  })

  test('Deve realizar o login de um usuário existente (diarista)', async () => {
    const loginDiarist = {
      typeUser: 'diarist',
      email: 'paulo@gmail.com',
      password: '135796',
    }

    const status = await request(serverUrl)
      .post('/v1/limpean/login')
      .set('Content-Type', 'application/json')
      .send(loginDiarist)

    expect(status.status).toBe(200);
    expect(status.body.id).toBe(1);
    expect(status.body.email).toBe('paulo@gmail.com')
    expect(typeof status.body.token).toBe('string')

    tokenDiarist = status.body.token
  })

  test('Deve atualizar os dados básicos de cadastro do cliente', async () => {
    const dataClient = {
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
    }

    const status = await request(serverUrl)
      .put('/v1/limpean/client')
      .set('Content-Type', 'application/json')
      .set('x-api-key', tokenClient)
      .send(dataClient)

    expect(status.status).toBe(201);
    expect(status.body.message).toBe("Registro atualizado com sucesso");

  })

  test('Deve atualizar os dados básicos de endereço do cliente', async () => {
    const dataClient = {
      typeHouse: 3,
      state: 12,
      city: "Cotia",
      publicPlace: "Estrada das rosas amarelas",
      complement: "Park municipal",
      district: "Chacara Paraíso",
      houseNumber: "606"
    }

    const status = await request(serverUrl)
      .put('/v1/limpean/client/update/register/address?id=1')
      .set('Content-Type', 'application/json')
      .set('x-api-key', tokenClient)
      .send(dataClient)

    expect(status.status).toBe(201);
    expect(status.body.message).toBe("Registro atualizado com sucesso");

  })

  test('Deve atualizar os dado de cadastro do diarista', async () => {

    const dataDiarist = {
      name: "Paulo Vinicius",
            biography: "Sou Engenheiro e Diarista nos fins de semana.",
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
    }

    const status = await request(serverUrl)
      .put('/v1/limpean/diarist')
      .set('Content-Type', 'application/json')
      .set('x-api-key', tokenDiarist)
      .send(dataDiarist)

    expect(status.status).toBe(201);
    expect(status.body.message).toBe("Registro atualizado com sucesso");

  })

  //NÃO É PERMETIDO CADASTRAR DUAS VEZES A MESMA AVALIAÇÃO COM A MESMA DATA E HORA
  test('Realizando o registro da avaliação do cliente para o diarista', async () => {

    const dataAssessment = {
      typeUser: "client",
      date: "2023-09-21",
      hour: "10:00",
      personEvaluatedId: 1,
      star: 3,
      comment: "O diarista é bom mas poderia ser melhor."
    }

    const status = await request(serverUrl)
    .post('/v1/limpean/assessment')
    .set('Content-Type', 'application/json')
    .set('x-api-key', tokenClient)
    .send(dataAssessment)

    expect(status.status).toBe(201)

  })

  //NÃO É PERMETIDO CADASTRAR DUAS VEZES A MESMA AVALIAÇÃO COM A MESMA DATA E HORA
  test('Realizando o registro da avaliação do diarista para o cliente', async () => {

    const dataAssessment = {
      typeUser: "diarist",
      date: "2023-09-11",
      hour: "11:00",
      personEvaluatedId: 1,
      star: 2,
      comment: "O cliente é muito chato."
    }

    const status = await request(serverUrl)
    .post('/v1/limpean/assessment')
    .set('Content-Type', 'application/json')
    .set('x-api-key', tokenDiarist)
    .send(dataAssessment)

    expect(status.status).toBe(201)

  })

})
