import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const deleteClient = async function (id: number, email: string) {
    
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                OR: [
                    { email: email.toLowerCase() },
                    { id: id }
                  ]
            }
        })
       
        if(verifyClient) {
            let transaction = await prisma.$transaction(async (prisma) =>{
                await prisma.tbl_status_conta_cliente.update({
                    where: {
                        id: verifyClient.id
                    },
                    data: {
                        data_status: new Date(),
                        id_status_conta: 2
                    }
                })
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