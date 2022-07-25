import express, { Request, Response } from 'express'
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
// MEASUREMENTS
import * as measurementsGet from '@controllers/measurements/get'
import * as measurementsPost from '@controllers/measurements/post'
import * as measurementsPacth from '@controllers/measurements/patch'
import * as measurementsDelete from '@controllers/measurements/delete'
// EXERCISES
import * as exercisesGet from '@controllers/exercises/get'
import * as exercisesPost from '@controllers/exercises/post'
import * as exercisesPut from '@controllers/exercises/put'
import * as exercisesDelete from '@controllers/exercises/delete'

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
routes.get('/trainings/user/:id', trainingsGet.findTrainingsByIdUser)
routes.get('/trainings/user/:id/:date', trainingsGet.findTrainingsByIdUserAndDate)
routes.post('/trainings/:id', trainingsPost.createTraining)
routes.patch('/trainings/:id', trainingsPatch.updateTraining)
routes.delete('/trainings/:id', trainingsDelete.deleteTraining)

// MEASUREMENTS
routes.get('/measurements', measurementsGet.findMeasurements)
routes.get('/measurements/:id', measurementsGet.findOnlyMeasurement)
routes.get('/measurements/user/:id', authMiddleware, measurementsGet.findMeasurementsByIdUser)
routes.post('/measurements/:id', authMiddleware, measurementsPost.createMeasurement)
routes.patch('/measurements/:id', authMiddleware, measurementsPacth.updateMeasurement)
routes.delete('/measurements/:id', authMiddleware, measurementsDelete.deleteMeasurement)

// MUSCLES
routes.get('/muscles', musclesGet.findAllMuscles)
routes.get('/muscles/:id', musclesGet.findMuscleById)
routes.delete('/muscles/:id', musclesDelete.deleteOnlyMuscle)
routes.post('/muscles', musclesPost.createMuscle)
routes.put('/muscles/:id', musclesPut.updateMuscle)

// EXERCISES
routes.get('/exercises', exercisesGet.findExercises)
routes.get('/exercises/:id', exercisesGet.findOnlyExercises)
routes.post('/exercises', exercisesPost.createExercises)
routes.put('/exercises/:id', exercisesPut.updateExercises)
routes.delete('/exercises/:id', exercisesDelete.deleteExercises)

// AUTH
routes.post('/auth', auth)

export default routes
