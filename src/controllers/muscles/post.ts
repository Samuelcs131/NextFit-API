import { Request, Response } from 'express'
import { Muscles, PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '@controllers/response/status'

const prisma = new PrismaClient()

// CREATE MUSCLE
export const createMuscle = async (req: Request, res: Response) => {
  try {
    const { name, members }: Muscles = req.body.body || req.body
    const inputs = [name, members]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400(`Preencha todos os campos! ${[num]}`))
      }
    }

    const muscles = await prisma.muscles.create({
      data: {
        name: String(name).trim(),
        members: String(members).trim()
      }
    })

    res.status(200).send(muscles)
    status200('Musculo criado com sucesso!')
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
