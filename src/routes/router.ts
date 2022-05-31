import express, { Request, Response } from 'express'
import * as userController from '@controllers/user'
import * as treiningController from '@controllers/treining'
import * as bodyMeasurementsController from '@controllers/bodyMeasurements'

// CONTROLLERS
const routes = express.Router()

// ROUTES
routes.get('/', (req: Request, res: Response) => res.send('Opa'))

// USER
routes.get('/users', userController.index)
routes.get('/users/:id', userController.singleUser)
routes.post('/users', userController.create)
routes.put('/users/:id', userController.update)
routes.delete('/users/:id', userController.exclude)

// TREINING
routes.get('/treinings', treiningController.index)
routes.get('/treinings/:id', treiningController.singleTreining)
routes.post('/treinings/:id', treiningController.create)
routes.patch('/treinings/:id', treiningController.update)
routes.delete('/treinings/:id', treiningController.exclude)

// BODY MEASUREMENTS
routes.get('/bodyMeasurements', bodyMeasurementsController.index)
routes.post('/bodyMeasurements/:id', bodyMeasurementsController.create)
routes.patch('/bodyMeasurements/:id', bodyMeasurementsController.update)
routes.delete('/bodyMeasurements/:id', bodyMeasurementsController.exclude)

export default routes
