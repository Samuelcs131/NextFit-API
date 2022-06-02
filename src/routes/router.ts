import express, { Request, Response } from 'express'
import * as userController from '@controllers/users'
import * as trainingController from '@controllers/trainings'
import * as measurementsController from '@controllers/measurements'
import auth from '@controllers/auth'
// import path from 'path'

// CONTROLLERS
const routes = express.Router()

// INDEX
/* routes.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public/page/index.html'))
}) */
routes.get('/', (req: Request, res: Response) => {
  res.send('Opa ta funcionando em!')
})

console.log()

// USER
routes.get('/users', userController.index)
routes.get('/users/:id', userController.singleUser)
routes.post('/users', userController.create)
routes.put('/users/:id', userController.update)
routes.delete('/users/:id', userController.exclude)

// TREINING
routes.get('/trainings', trainingController.index)
routes.get('/trainings/:id', trainingController.singleTreining)
routes.post('/trainings/:id', trainingController.create)
routes.patch('/trainings/:id', trainingController.update)
routes.delete('/trainings/:id', trainingController.exclude)

// MEASUREMENTS
routes.get('/measurements', measurementsController.index)
routes.get('/measurements/:id', measurementsController.singleMeasurements)
routes.post('/measurements/:id', measurementsController.create)
routes.patch('/measurements/:id', measurementsController.update)
routes.delete('/measurements/:id', measurementsController.exclude)

// AUTH
routes.post('/auth', auth)

export default routes
