export interface iBodyMeasurements {
    abdomen: number
    breastplate: number
    deltoid: number
    gluteal: number
    leftArm: number
    leftCalf: number
    leftForearm: number
    leftThigh: number
    rightArm: number
    rightCalf: number
    rightForearm: number
    rightThigh: number
    weight: number
    idUser: string
}

// MUSCLES
export interface iFindOnlyMuscles {
    muscleId: string
}
export interface iCreateMuscle {
    name: string
    members: string
}
export interface iUpdateMuscle {
    name: string
    members: string
    muscleId: string
}
