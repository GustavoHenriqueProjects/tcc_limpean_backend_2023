import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface UpdateDataClient {
    name: string | null,
    biography: string | null,
    idGender: number | null,
    ddd: string | null,
    phone: string | null,
    newDDD: string | null,
    newPhone: string | null,
    password: string | null,
    photoUser: string | null
}

interface TokenPayLoad {
    id: string,
    name: string
}

const updateDataClient = async function (token: TokenPayLoad, data: UpdateDataClient) {

    let transaction;

    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        })

        if (verifyClient) {


            //Se data for diferente de null ou undefined eu atualizo senão mantenho as informações
            const updateData = {
                nome: data.name ?? verifyClient.nome,
                biografia: data.biography ?? verifyClient.biografia,
                id_genero: data.idGender ?? verifyClient.id_genero,
                senha: data.password ?? verifyClient.senha,
                foto_perfil: data.photoUser ?? verifyClient.foto_perfil,
            }

            let verifyPhone: any
            if(data.phone !== null && data.ddd !== null){
                 verifyPhone = await prisma.tbl_telefone_cliente.findFirst({
                    where: {
                        id_cliente: verifyClient.id,
                        numero_telefone: data.phone 
                    }
                })
            }

            console.log(verifyPhone);
            
                        
            const updatePhone = {
                numero_telefone: data.newPhone ?? (verifyPhone?.numero_telefone ?? ''), // Use um valor padrão vazio se verifyPhone for nulo
                ddd: data.newDDD ?? (verifyPhone?.ddd ?? ''), // Use um valor padrão vazio se verifyPhone for nulo
            }            
            
            transaction = await prisma.$transaction(async (prisma) => {

                // Atualize os dados do diarista
                const tbl_cliente = await prisma.tbl_cliente.update({
                    where: {
                        id: verifyClient.id
                    },
                    data: updateData
                })

                if(verifyPhone)
                await prisma.tbl_telefone_cliente.update({
                    where: {
                        id: tbl_cliente.id,
                        numero_telefone: verifyPhone.numero_telefone
                    },
                    data: updatePhone
                })
            })

            return true
        } else {
            return false
        }
    } catch (error) {        
        return false
    } finally {
        await prisma.$disconnect()
    }
}


export {
    updateDataClient
}