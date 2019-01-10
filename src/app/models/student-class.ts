export interface StudentClass {
    id: string;
    name: string;
    description: string;
    discipline: string;
    grade: string;
    percentage: number;
}

export interface StudentClassResponse {
    classes: StudentClass[];
}
