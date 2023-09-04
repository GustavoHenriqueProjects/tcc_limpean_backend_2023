const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

interface Login {

    email:string,
    password: string
}

interface Payload{

    id: number,
    email: string
}

const loginDiarista = async function (dataBody: Login): Promise<Payload | false>{

    try{
        const verifyDiarista = await prisma.tbl_diarista.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
                senha: dataBody.password
            }
        });

        if(verifyDiarista){
            return {
                id: verifyDiarista.id,
                email: verifyDiarista.email
            }
        } else {
            return false;
        }
    } catch (error){
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

export{
    loginDiarista
}