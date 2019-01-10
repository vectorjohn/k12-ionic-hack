export interface StudentClass {
    id: string;
    name: string;
    description: string;
    discipline: string;
    grade: string;
    percentage: number;
    image: string;
}

export interface StudentClassResponse {
    classes: StudentClass[];
}
