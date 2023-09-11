import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getDiaristById = async function (id: number) {
    
    const vw_dados_diarista = `SELECT * FROM vw_dados_diarista WHERE id_diarista = ${id}`

    const result = await prisma.$queryRawUnsafe(vw_dados_diarista)

    if(result){
        return result
    }else{
        return false
    }

}

export {
    getDiaristById
}