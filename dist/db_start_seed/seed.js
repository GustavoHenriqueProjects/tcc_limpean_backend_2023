"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertGender = async function () {
    const typesGender = ["masculino", "feminino", "outro"];
    for (const type of typesGender) {
        const gender = await prisma.tbl_genero.findFirst({
            where: { nome: type }
        });
        if (!gender) {
            await prisma.tbl_genero.create({
                data: {
                    nome: type
                }
            });
        }
    }
};
const insertTypesResidence = async function () {
    const typesResidence = ["Casa", "Apartamento", "Sobrado", "Condomínio", "Chácara", "Kitnet"];
    for (const type of typesResidence) {
        const residence = await prisma.tbl_tipo_residencia.findFirst({
            where: { nome: type }
        });
        if (!residence) {
            await prisma.tbl_tipo_residencia.create({
                data: {
                    nome: type
                }
            });
        }
    }
};
const insertStateBrazil = async function () {
    const states = [
        { sigla: 'AC', nome: 'Acre' },
        { sigla: 'AL', nome: 'Alagoas' },
        { sigla: 'AM', nome: 'Amazonas' },
        { sigla: 'AP', nome: 'Amapá' },
        { sigla: 'BA', nome: 'Bahia' },
        { sigla: 'CE', nome: 'Ceará' },
        { sigla: 'DF', nome: 'Distrito Federal' },
        { sigla: 'ES', nome: 'Espírito Santo' },
        { sigla: 'GO', nome: 'Goiás' },
        { sigla: 'MA', nome: 'Maranhão' },
        { sigla: 'MG', nome: 'Minas Gerais' },
        { sigla: 'MS', nome: 'Mato Grosso do Sul' },
        { sigla: 'MT', nome: 'Mato Grosso' },
        { sigla: 'PA', nome: 'Pará' },
        { sigla: 'PB', nome: 'Paraíba' },
        { sigla: 'PE', nome: 'Pernambuco' },
        { sigla: 'PI', nome: 'Piauí' },
        { sigla: 'PR', nome: 'Paraná' },
        { sigla: 'RJ', nome: 'Rio de Janeiro' },
        { sigla: 'RN', nome: 'Rio Grande do Norte' },
        { sigla: 'RO', nome: 'Rondônia' },
        { sigla: 'RR', nome: 'Roraima' },
        { sigla: 'RS', nome: 'Rio Grande do Sul' },
        { sigla: 'SC', nome: 'Santa Catarina' },
        { sigla: 'SE', nome: 'Sergipe' },
        { sigla: 'SP', nome: 'São Paulo' },
        { sigla: 'TO', nome: 'Tocantins' }
    ];
    for (const state of states) {
        const nameState = await prisma.tbl_estado.findFirst({
            where: {
                OR: [
                    { nome: state.nome },
                    { sigla: state.sigla }
                ]
            }
        });
        if (!nameState) {
            await prisma.tbl_estado.create({
                data: {
                    nome: state.nome,
                    sigla: state.sigla
                }
            });
        }
    }
};
insertGender()
    .then(() => {
    console.log("Inserção de gêneros concluído com sucesso");
})
    .catch((error) => {
    console.error("Erro ao inserir gêneros:", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertTypesResidence()
    .then(() => {
    console.log("Inserção dos tipos de residência concluído com sucesso");
})
    .catch((error) => {
    console.error("Erro ao inserir tipos de residência:", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertStateBrazil()
    .then(() => {
    console.log("Inserção dos estados brasileiros concluído com sucesso");
})
    .catch((error) => {
    console.error("Erro ao inserir os estados:", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
