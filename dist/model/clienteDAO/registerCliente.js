"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegisterCliente = exports.registerUser = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const registerUser = async function (dataBody) {
    let statusRegister = false;
    try {
        const duplicateCheckEmail = `SELECT tbl_contratante.email
        FROM tbl_contratante
        where tbl_contratante.email = '${dataBody.email.toLowerCase()}';
        `;
        const statusEmail = await prisma.$queryRawUnsafe(duplicateCheckEmail);
        const duplicateCheckCPF = `SELECT tbl_dados_pessoais_contratante.cpf
        FROM tbl_dados_pessoais_contratante
        where tbl_dados_pessoais_contratante.cpf = '${dataBody.cpf}';
        `;
        const statusCPF = await prisma.$queryRawUnsafe(duplicateCheckCPF);
        if (statusEmail.length === 0 && statusCPF.length === 0) {
            const sqlContratante = `
                INSERT INTO tbl_contratante (email, senha)
                VALUES ('${dataBody.email.toLowerCase()}', '${dataBody.password}');
            `;
            const sqlDadosPessoais = `
                INSERT INTO tbl_dados_pessoais_contratante (nome, cpf, data_nascimento, foto_perfil, id_contratante, id_genero)
                VALUES ('${dataBody.nameUser}', '${dataBody.cpf}', '${dataBody.birthDate}', '${dataBody.photoUser}', LAST_INSERT_ID(), ${dataBody.idGender});
            `;
            const sqlPhone = `
                INSERT INTO tbl_telefone_contratante (numero_telefone, ddd, id_dados_pessoais_contratante)
                VALUES ('${dataBody.phone}', '${dataBody.ddd}', LAST_INSERT_ID());
            `;
            const sqlState = `INSERT INTO tbl_estado (sigla, nome)
            VALUES ('${dataBody.dataResidence.address.stateAcronym.toUpperCase()}', '${dataBody.dataResidence.address.state}');`;
            const sqlCity = `INSERT INTO tbl_cidade (nome, id_estado)
            VALUES ('${dataBody.dataResidence.address.city}', LAST_INSERT_ID());`;
            const sqlAdress = `INSERT INTO tbl_endereco (logradouro, bairro, cep, numero_residencial, complemento, id_cidade)
            VALUES (
            '${dataBody.dataResidence.address.publicPlace?.toLowerCase()}',
            '${dataBody.dataResidence.address.district.toLowerCase()}', 
            '${dataBody.dataResidence.address.cep}',
            '${dataBody.dataResidence.address.houseNumber}',
            '${dataBody.dataResidence.address.complement?.toLowerCase()}',
            LAST_INSERT_ID());`;
            const sqlHomeProfile = `INSERT INTO tbl_perfil_casa (quantidade_comodos, status_crianca, status_animal, tipo_propriedade, informacao_adicional, id_endereco, id_contratante)
            VALUES (${dataBody.dataResidence.numberRooms}, ${dataBody.dataResidence.haveChildren}, ${dataBody.dataResidence.haveAnimal}, '${dataBody.dataResidence.typeResidence.toLowerCase()}', '${dataBody.dataResidence.extraInformation}', LAST_INSERT_ID(), LAST_INSERT_ID());`;
            await prisma.$executeRawUnsafe(sqlContratante);
            await prisma.$executeRawUnsafe(sqlDadosPessoais);
            await prisma.$executeRawUnsafe(sqlPhone);
            await prisma.$executeRawUnsafe(sqlState);
            await prisma.$executeRawUnsafe(sqlCity);
            await prisma.$executeRawUnsafe(sqlAdress);
            await prisma.$executeRawUnsafe(sqlHomeProfile);
            statusRegister = true;
        }
        return statusRegister;
    }
    catch (error) {
        return false;
    }
};
exports.registerUser = registerUser;
const deleteRegisterCliente = async function (dataBody) {
    let statusRegister = false;
    let deleteCliente = `delete from tbl_contratante where id = ${dataBody.id} and email = '${dataBody.email}'`;
    let status = await prisma.$executeRawUnsafe(deleteCliente);
    if (status) {
        statusRegister = true;
    }
    return statusRegister;
};
exports.deleteRegisterCliente = deleteRegisterCliente;