import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface UpdateDataClient{
    name: string | null,
    biography: string | null,
    idGrender: number | null,
    phone: string | null,
    ddd: string | null,
    password: string | null,
    photoUser: string | null
}

interface TokenPayLoad {
    id: string,
    name: string
}

const deleteClient = async function (token: TokenPayLoad, updateClient: UpdateDataClient) {

    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id )}
                  ]
            }
        })

        
        if(verifyClient) {
          
                const tbl_cliente = await prisma.tbl_cliente.update({
                    where: {
                        id: verifyClient.id
                    },
                    data: {
                        nome: updateClient.name ?? undefined,
                        biografia: updateClient.biography ?? undefined,
                        id_genero: updateClient.idGrender ?? undefined,
                        senha: updateClient.password ?? undefined,
                        foto_perfil: updateClient.photoUser ?? undefined
                    }
                })

                await prisma.tbl_telefone_cliente.update({
                    where: {
                        id: tbl_cliente.id
                    },
                    data: {
                        numero_telefone: updateClient.phone ?? undefined,
                        ddd: updateClient.ddd ?? undefined
                    }
                })

            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

export {
    deleteClient
}