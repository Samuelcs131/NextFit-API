import express, { Request, Response } from 'express'
import * as userController from '@controllers/user'
import * as treiningController from '@controllers/treining'
import * as bodyMeasurementsController from '@controllers/bodyMeasurements'

// CONTROLLERS
const routes = express.Router()

// ROUTES
routes.get('/', (req: Request, res: Response) => res.send('Opa'))

// USER
routes.get('/user', userController.index)
routes.post('/user', userController.create)
routes.put('/user/:id', userController.update)
routes.delete('/user/:id', userController.exclude)

// TREINING
routes.get('/treining', treiningController.index)
routes.post('/treining/:id', treiningController.create)
routes.patch('/treining/:id', treiningController.update)
routes.delete('/treining/:id', treiningController.exclude)

// BODY MEASUREMENTS
routes.get('/bodyMeasurements', bodyMeasurementsController.index)
routes.post('/bodyMeasurements/:id', bodyMeasurementsController.create)
routes.patch('/bodyMeasurements/:id', bodyMeasurementsController.update)
routes.delete('/bodyMeasurements/:id', bodyMeasurementsController.exclude)

export default routes
