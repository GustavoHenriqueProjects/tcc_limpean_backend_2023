import { describe, test, expect } from '@jest/globals'
import request from 'supertest'

const serverUrl = 'http://localhost:8080'  // Substitua com o URL do seu servidor

describe('Testes de Integração de API', () => {

  let tokenClient: string

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
  })

  test('Deve atualizar os dados do cliente', async () => {
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

})
