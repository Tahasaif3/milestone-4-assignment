export interface SubjectMarks {
    subject: string;
    marks: number;
    totalMarks?:number
  }
  
  export interface Student {
    id: string;
    name: string;
    rollNumber: string;
    email: string;
    grade: string;
    subjects: SubjectMarks[];
    totalMarks?:number;
  }
  
  