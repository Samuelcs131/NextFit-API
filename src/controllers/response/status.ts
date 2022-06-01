import clc from 'cli-color'
import { iStatus } from 'src/@types/status'

export const status200 = (messageText: string) => {
  console.log(clc.green(messageText))
}

export const status500 = (error: any) => {
  const status: iStatus = {
    status: 500,
    code: 'Erro interno',
    message: 'Ocorreu um erro no servidor ao tentar processar a requisição'
  }

  console.log(clc.red('Erro: ocorreu um erro no servidor'), error)

  return (status)
}

export const status400 = (messageText: string) => {
  const status: iStatus = {
    status: 400,
    code: 'Requisição mal formada',
    message: messageText
  }

  console.log(clc.yellow(messageText))

  return (status)
}
