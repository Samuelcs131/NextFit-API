import { Request, Response } from 'express'
import { Muscles, PrismaClient } from '@prisma/client'
import { status200, status400, status500 } from '@controllers/response/status'

const prisma = new PrismaClient()

// UPDATE MUSCLE
export const updateMuscle = async (req: Request, res: Response) => {
  try {
    const { name, members }: Muscles = req.body.body || req.body
    const muscleId: string = req.params.id
    const inputs = [name, members, muscleId]

    // VERIFY INPUTS
    for (let num = 0; num < inputs.length; num++) {
      if (inputs[num] === null || inputs[num] === undefined || String(inputs[num]).trim() === '') {
        return res.status(400).send(status400('Preencha todos os campos!'))
      }
    }

    try {
      const muscles = await prisma.muscles.update({
        where: { id: muscleId },
        data: {
          name: String(name).trim(),
          members: String(members).trim()
        }
      })
      res.status(200).send(muscles)
      status200('Musculo atualizado com sucesso!')
    } catch (error) {
      res.status(400).send(status400('Músculo inexistente ou músculo já cadastrado!'))
    }
  } catch (error) {
    res.status(500).send(status500(error))
  }
}
