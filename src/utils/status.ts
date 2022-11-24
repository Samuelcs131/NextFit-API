import clc from 'cli-color'

interface IStatusCode {
    status: number
    name: string
    message: string
}

export function statusCode (data: { status: number, messageConsole?: string, error?: unknown }) {
  let statusCode = {} as IStatusCode

  switch (data.status) {
    case 400:
      statusCode = { status: 400, name: 'Requisição mal formada', message: 'A requisição não está de acordo com o formato esperado' }
      break
    case 401:
      statusCode = { status: 401, name: 'Não autenticado', message: 'Os dados de autenticação estão incorretos' }
      break
    case 403:
      statusCode = { status: 403, name: 'Não autorizado', message: 'Você está tentando acessar um recurso para o qual não tem permissão' }
      break
    case 404:
      statusCode = { status: 404, name: 'Não encontrado', message: 'Você está tentando acessar um recurso que não existe na NextFit' }
      break
    case 406:
      statusCode = { status: 406, name: 'Formato não aceito', message: 'A SkyHub não suporta o formato de dados especificado no cabeçalho' }
      break
    case 419:
      statusCode = { status: 419, name: 'Limite de requisições ultrapassado', message: 'Você fez mais requisições do que o permitido em um determinado recurso' }
      break
    case 422:
      statusCode = { status: 422, name: 'Entidade não processável', message: 'Entidade invalida ou já existente' }
      break
    case 500:
      statusCode = { status: 500, name: 'Erro interno', message: 'Ocorreu um erro no servidor ao tentar processar a requisição' }
      break
    case 503:
      statusCode = { status: 503, name: 'Serviço indisponível', message: 'A API da NextFit está temporariamente fora do ar' }
      break
    case 504:
      statusCode = { status: 504, name: 'Timeout', message: 'A requisição levou muito tempo e não pôde ser processada' }
      break
    default:
      break
  }

  if (data.status <= 299) {
    console.log(clc.green(`[${data.messageConsole}]`))
  } else if (data.status <= 499) {
    console.log(clc.yellow(`[${statusCode.name}]`))
    data.error && console.log(data.error)
  } else {
    console.log(clc.red(`[${statusCode.name}]`), data.error)
  }

  return statusCode
}
