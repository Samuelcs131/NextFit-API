export interface iUser {
    name: string
    lastName: string
    email: string
    password: string
}

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
}

export interface iTreining {
    name: string
    weight: number
    repetitions: JSON
    series: number
}
