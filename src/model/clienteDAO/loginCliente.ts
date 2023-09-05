import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface Login {

    email: string,
    password: string
}

interface Payload {
    id: number, 
    email: string
}

const loginCliente = async function (dataBody: Login): Promise<Payload | false> {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
                senha: dataBody.password 
            }
        })

        if (verifyClient) {
            return {
                id: verifyClient.id,
                email: verifyClient.email,
            }
        } else {
            return false
        }
    } catch (error) {
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

export{
    loginCliente
}