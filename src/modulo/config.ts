/***************************************************
 * Objetivo: Responsavel pelas constantes globais
 * Data: 14/08/2023
 * Versão: 14/08/2023
 **************************************************/

const ERROR_INVALID_CONTENT_TYPE = { status: 415, message: 'O tipo de mídia (Content-Type) da solicitação não é compatível com o servidor. Esperado: application/json'}
const ERRO_INTERNAL_SERVER = {status: 500, message: 'Erro interno no servidor, tente novamente mais tarde.'}  
const ERRO_NAME_PHOTO_PASSWORD = {status: 400, message: "Atenção o nome, senha e foto são campos obrigatorios. OBS: A senha deve ter no mínimo 6 caracteres. Verifique e tente novamente."}
const ERRO_REQUIRED_DATA_CLIENTE = {status: 400, message: 'Atenção, verifique a documentação para enviar a requisição com o formato e tipos corretos.'}
const ERRO_REQUIRED_DATA_DIARISTA = {status: 400, message: 'Atenção, verifique a documentação para enviar a requisição com o formato e tipos corretos.'}
const ERRO_REQUIRED_DATA_HOUSE_CLIENTE = {status: 400, message: 'Atenção, preencha os dados referentes a casa e tente novamnete. No mínimo 1 comodo.'}
const ERRO_REGISTER_USER = {status: 500, message: "A inserção falhou verifique os dados e tente novamente."}
const ERRO_REGISTER_EMAIL = {status: 400, message: "Atenção email no formato inválido. Ele deve ter esse formato: exemplo@gmail.com"}
const ERRO_REQUIRE_CPF = {status: 400, message: "Atenção o cpf informado está incorreto."}
const ERRO_REQUIRE_BIRTH_DATE = {status: 400, message: "Atenção a data informada está no formato incorreto. Envie nesse formato: YYYY-MM-DD"}
const ERRO_NUMBER_PHONE = {status: 400, message: "Atenção o número de telefone esta errado. verique e tente novamente. exemplo: (11) 1111-11111"}
const ERRO_ADDRESS = {status: 400, message: "Atenção, verifique os dados referentes ao endereço e tente novamente"}
const ERRO_DELETE_USER = {status: 500, message: "Erro ao tentar deletar conta de usuario, verifique os dados e tente novamente."}
const ERRO_NOT_FOUND = {status: 404, message: 'Nenhum registro encontrado na requisição!'}
const ERRO_REQUIRED_ID = {status: 400, message: 'O atributo id é obrigatório na requisição!'};

/***************************************   CONSTANTES DE SUCESSO  ************************************************************************************************/
const CREATED_REGISTER = {status: 201, message: "Registro criado com sucesso."}
const DELETE_CLIENTE = {status: 200, message: "Registro deletado com sucesso."}
const UPDATED_ITEM = {status: 200, message: 'Registro atualizado com sucesso!'};

export {
    ERROR_INVALID_CONTENT_TYPE,
    ERRO_INTERNAL_SERVER,
    ERRO_NAME_PHOTO_PASSWORD,
    ERRO_REQUIRED_DATA_CLIENTE,
    ERRO_REQUIRED_DATA_DIARISTA,
    ERRO_REGISTER_USER,
    CREATED_REGISTER,
    ERRO_REGISTER_EMAIL,
    ERRO_REQUIRE_BIRTH_DATE,
    ERRO_REQUIRE_CPF,
    ERRO_NUMBER_PHONE,
    ERRO_ADDRESS,
    ERRO_DELETE_USER,
    DELETE_CLIENTE,
    ERRO_REQUIRED_DATA_HOUSE_CLIENTE,
    ERRO_NOT_FOUND,
    UPDATED_ITEM,
    ERRO_REQUIRED_ID
}