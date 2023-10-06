import { Student } from "./student.model";

export interface Course {
    id: string,
    name: string,
    coach: string,
    level: number,
    lastUpdated: Date,
    studentListDTO: Student[]
}
