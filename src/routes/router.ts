import express, { Request, Response } from 'express'
import * as UserController from '@controllers/user'
import * as TreiningController from '@controllers/treining'

// CONTROLLERS
const routes = express.Router()

// ROUTES
routes.get('/', (req: Request, res: Response) => res.send('Opa'))

// USER
routes.get('/user', UserController.index)
routes.post('/user', UserController.create)
routes.put('/user/:id', UserController.update)
routes.delete('/user/:id', UserController.exclude)

// TREINING
routes.get('/treining', TreiningController.index)
routes.post('/treining', TreiningController.create)
routes.put('/treining/:id', TreiningController.update)
routes.delete('/treining/:id', TreiningController.exclude)

export default routes
