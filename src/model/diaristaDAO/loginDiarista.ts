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

const loginDiarista = async function (dataBody: Login): Promise<Payload | false> {
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
                senha: dataBody.password 
            }
        })

        console.log(verifyDiarist);
        
        
        if (verifyDiarist) {
            return {
                id: verifyDiarist.id,
                email: verifyDiarist.email,
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
    loginDiarista
}