export interface iUser {
    name: string
    lastName: string
    email: string
    password: string
    height: number
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
    idUser: string
}

export interface iTreining {
    name: string
    weight: number
    series: number
    interval: number
}
