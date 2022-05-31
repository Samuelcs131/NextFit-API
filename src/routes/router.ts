import express, { Request, Response } from 'express'
import * as UserController from '@controllers/user'

// CONTROLLERS
const routes = express.Router()

// ROUTES
routes.get('/', (req: Request, res: Response) => res.send('Opa'))

// USER
routes.get('/user', UserController.index)
routes.post('/user', UserController.create)
routes.put('/user/:id', UserController.update)
routes.delete('/user/:id', UserController.exclude)

export default routes
