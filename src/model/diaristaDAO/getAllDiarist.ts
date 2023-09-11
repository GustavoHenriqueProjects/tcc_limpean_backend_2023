import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getAllDiarist = async function () {
    
    const vw_dados_diarista = `SELECT * FROM vw_dados_diarista;`

    const result = await prisma.$queryRawUnsafe(vw_dados_diarista)

    if(result){
        return result
    }else{
        return false
    }

}

export {
    getAllDiarist
}