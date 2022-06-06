import express, { Request, Response } from 'express'
import * as userController from '@controllers/users'
import * as trainingController from '@controllers/trainings'
import * as measurementsController from '@controllers/measurements'
import auth from '@controllers/auth'
import path from 'path'
import { authMiddleware } from '@controllers/middleware/auth'

// CONTROLLERS
const routes = express.Router()

// INDEX
routes.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public/page/index.html'))
})

// USER
routes.get('/users', userController.index)
routes.get('/users/:email', userController.singleUser)
routes.post('/users', userController.create)
routes.put('/users/:id', authMiddleware, userController.update)
routes.delete('/users/:id', authMiddleware, userController.exclude)
routes.post('/users/forgot_password', userController.forgotPassword)
routes.post('/users/reset_password', userController.forgotPassword)

// TREINING
routes.get('/trainings', trainingController.index)
routes.get('/trainings/:id', trainingController.singleTraining)
routes.get('/trainings/user/:id', authMiddleware, trainingController.userTrainings)
routes.post('/trainings/:id', authMiddleware, trainingController.create)
routes.patch('/trainings/:id', authMiddleware, trainingController.update)
routes.delete('/trainings/:id', authMiddleware, trainingController.exclude)

// MEASUREMENTS
routes.get('/measurements', measurementsController.index)
routes.get('/measurements/:id', measurementsController.singleMeasurements)
routes.get('/measurements/user/:id', authMiddleware, measurementsController.userMeasurements)
routes.post('/measurements/:id', authMiddleware, measurementsController.create)
routes.patch('/measurements/:id', authMiddleware, measurementsController.update)
routes.delete('/measurements/:id', authMiddleware, measurementsController.exclude)

// AUTH
routes.post('/auth', auth)

export default routes
