import sgMail, { ClientResponse, MailDataRequired, ResponseError } from '@sendgrid/mail'
import { handleApiError, handleApiResult } from '@services/handleApi'
import { IApiResponse } from 'src/types/api/IApiResponse.type'

export async function setApiKey (apiKey: string): Promise<IApiResponse<void>> {
  try {
    const responseApi = await sgMail.setApiKey(apiKey)
    return handleApiResult(responseApi)
  } catch (error) {
    return handleApiError(error as Error)
  }
}

export async function send (data: MailDataRequired | MailDataRequired[], isMultiple?: boolean, cb?: (err: Error | ResponseError, result: [ClientResponse, {}]) => void): Promise<IApiResponse<[ClientResponse, {}]>> {
  try {
    const responseApi = await sgMail.send(data, isMultiple, cb)
    return handleApiResult(responseApi)
  } catch (error) {
    return handleApiError(error as Error)
  }
}
