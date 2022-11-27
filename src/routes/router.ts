import express, { Request, Response } from 'express'
import path from 'path'
// AUTH
import auth from '@controllers/auth'
import { authMiddleware } from 'src/middlewares/auth'
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
import * as measurementsGet from '@controllers/body-measurements/get'
import * as measurementsPost from '@controllers/body-measurements/post'
import * as measurementsPacth from '@controllers/body-measurements/patch'
import * as measurementsDelete from '@controllers/body-measurements/delete'
// EXERCISES
import * as exercisesGet from '@controllers/exercises/get'
import * as exercisesPost from '@controllers/exercises/post'
import * as exercisesPut from '@controllers/exercises/put'
import * as exercisesDelete from '@controllers/exercises/delete'
import { resolver } from '@middlewares/adapter/resolver'

// CONTROLLERS
const routes = express.Router()

// INDEX
routes.get('/', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'public/page/index.html'))
})

// USERS
routes.get('/users', resolver(usersGet.getAllUsers))
routes.get('/users/email/:email', resolver(usersGet.getUserByEmail))
routes.get('/users/token', authMiddleware, resolver(usersGet.getUserByToken))
routes.post('/users', resolver(usersPost.createUser))
routes.post('/users/forgot_password', resolver(usersPost.forgotPassword))
routes.post('/users/reset_password', resolver(usersPost.resetPassword))
routes.delete('/users/:id', authMiddleware, resolver(usersDelete.deleteUser))
routes.put('/users/:id', authMiddleware, resolver(usersPut.updateUser))

// TRAININGS
routes.get('/trainings', resolver(trainingsGet.getAllTrainings))
routes.get('/trainings/:id', resolver(trainingsGet.getTrainingById))
routes.get('/trainings/user/:userId', resolver(trainingsGet.getAllTrainingsByIdUser))
routes.get('/trainings/user/:userId/date/:date', resolver(trainingsGet.getTrainingsOfMonthByIdUser))
routes.get('/trainings/user/:userId/dateInitial/:dateInitial/dateFinal/:dateFinal', resolver(trainingsGet.getTrainingsBetweenDatesByUserId))
routes.post('/trainings/:id', resolver(trainingsPost.createTraining))
routes.patch('/trainings/:id', resolver(trainingsPatch.updateTraining))
routes.delete('/trainings/:id', resolver(trainingsDelete.deleteTraining))

// MEASUREMENTS
routes.get('/bodyMeasurements', resolver(measurementsGet.getAllBodyMeasurements))
routes.get('/bodyMeasurements/:id', resolver(measurementsGet.getBodyMeasurementById))
routes.get('/bodyMeasurements/user/:id', authMiddleware, resolver(measurementsGet.getAllBodyMeasurementsByIdUser))
routes.post('/bodyMeasurements', authMiddleware, resolver(measurementsPost.createMeasurement))
routes.patch('/bodyMeasurements/:id', authMiddleware, resolver(measurementsPacth.updateMeasurement))
routes.delete('/bodyMeasurements/:id', authMiddleware, resolver(measurementsDelete.deleteBodyMeasurement))

// MUSCLES
routes.get('/muscles', resolver(musclesGet.getAllMuscles))
routes.get('/muscles/:id', resolver(musclesGet.getMuscleById))
routes.delete('/muscles/:id', resolver(musclesDelete.deleteOnlyMuscle))
routes.post('/muscles', resolver(musclesPost.createMuscle))
routes.put('/muscles/:id', resolver(musclesPut.updateMuscle))

// EXERCISES
routes.get('/exercises', resolver(exercisesGet.getAllExercises))
routes.get('/exercises/:id', resolver(exercisesGet.getExercisesById))
routes.post('/exercises', resolver(exercisesPost.createExercises))
routes.put('/exercises/:id', resolver(exercisesPut.updateExercises))
routes.delete('/exercises/:id', resolver(exercisesDelete.deleteExercises))

// AUTH
routes.post('/auth', resolver(auth))

export default routes
