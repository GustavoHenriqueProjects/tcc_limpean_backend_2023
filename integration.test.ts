import { describe, expect, test, beforeAll, afterAll} from '@jest/globals'
import {app} from "./src/app"
const request = require("supertest")

const express = require('express');

describe("Testes de API ", () => {
  test('Deve realizar o login de um usuário existente', async () => {
    const loginClient = {
      typeUser: "client",
      email: "fernanda10@gmail.com",
      password: "135796"
    };

    const status = await request(app)
      .post('/v1/limpean/login')
      .set("Content-Type", "application/json")
      .send(loginClient);
        
      expect(status.status).toBe(200);
      expect(status.body.id).toBe(1);
      expect(status.body.email).toBe("fernanda10@gmail.com");
      expect(typeof status.body.token).toBe("string");
})

test('Deve realizar o login de um usuário existente', async () => {
  const loginClient = {
    typeUser: "diarist",
    email: "paulo@gmail.com",
    password: "135796"
  };

  const status = await request(app)
    .post('/v1/limpean/login')
    .set("Content-Type", "application/json")
    .send(loginClient);
      
    expect(status.status).toBe(200);
    expect(status.body.id).toBe(1);
    expect(status.body.email).toBe("paulo@gmail.com");
    expect(typeof status.body.token).toBe("string");
})
})
