import express, { Request, Response } from 'express'
import * as measurementsController from '@controllers/measurements'
import path from 'path'
// AUTH
import auth from '@controllers/auth'
import { authMiddleware } from '@controllers/middleware/auth'
// USERS
import * as usersGet from '@controllers/users/get'
import * as usersPost from '@controllers/users/post'
import * as usersPut from '@controllers/users/put'
import * as usersDelete from '@controllers/users/delete'
// MUSCLES
import * as musclesGet from '@controllers/muscles/get'
import * as musclesDelete from '@controllers/muscles/delete'
import * as musclesPost from '@controllers/muscles/post'
import * as musclesPut from '@controllers/muscles/put'
// TRAININGS
import * as trainingsGet from '@controllers/trainings/get'
import * as trainingsPatch from '@controllers/trainings/patch'
import * as trainingsPost from '@controllers/trainings/post'
import * as trainingsDelete from '@controllers/trainings/delete'

// CONTROLLERS
const routes = express.Router()

// INDEX
routes.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public/page/index.html'))
})

// USER
routes.get('/users', usersGet.findUsers)
routes.get('/users/email/:email', usersGet.findOnlyUserByEmail)
routes.get('/users/token', authMiddleware, usersGet.findUserByToken)
routes.post('/users', usersPost.createUser)
routes.post('/users/forgot_password', usersPost.forgotPassword)
routes.post('/users/reset_password', usersPost.resetPassword)
routes.delete('/users/:id', authMiddleware, usersDelete.deleteUser)
routes.put('/users/:id', authMiddleware, usersPut.updateUser)

// TREINING
routes.get('/trainings', trainingsGet.findTrainings)
routes.get('/trainings/:id', trainingsGet.findOnlyTrainingById)
routes.get('/trainings/user/:id', authMiddleware, trainingsGet.findTrainingsByIdUser)
routes.post('/trainings/:id', authMiddleware, trainingsPost.createTraining)
routes.patch('/trainings/:id', authMiddleware, trainingsPatch.updateTraining)
routes.delete('/trainings/:id', authMiddleware, trainingsDelete.deleteTraining)

// MEASUREMENTS
routes.get('/measurements', measurementsController.index)
routes.get('/measurements/:id', measurementsController.singleMeasurements)
routes.get('/measurements/user/:id', authMiddleware, measurementsController.userMeasurements)
routes.post('/measurements/:id', authMiddleware, measurementsController.create)
routes.patch('/measurements/:id', authMiddleware, measurementsController.update)
routes.delete('/measurements/:id', authMiddleware, measurementsController.exclude)

// MUSCLES
routes.get('/measurements', musclesGet.findAllMuscles)
routes.get('/measurements/:id', musclesGet.findMuscleById)
routes.delete('/measurements/:id', musclesDelete.deleteOnlyMuscle)
routes.post('/measurements', musclesPost.createMuscle)
routes.put('/measurements/:id', musclesPut.updateMuscle)

// AUTH
routes.post('/auth', auth)

export default routes
