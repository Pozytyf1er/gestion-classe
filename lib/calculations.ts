import type { Grade, AverageResult, StudentAverages, Student } from '@types';

type Period = 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

// Calculer la moyenne d'un ensemble de notes
export function calculateAverage(grades: Grade[]): number {
  if (grades.length === 0) return 0;
  
  const totalWeightedSum = grades.reduce((sum, grade) => {
    return sum + (grade.value * grade.coefficient);
  }, 0);
  
  const totalCoefficient = grades.reduce((sum, grade) => {
    return sum + grade.coefficient;
  }, 0);
  
  if (totalCoefficient === 0) return 0;
  
  return Math.round((totalWeightedSum / totalCoefficient) * 100) / 100;
}

// Calculer les moyennes par séance et par matière
export function calculateAveragesByPeriod(
  student: Student,
  grades: Grade[],
  period: Period
): AverageResult[] {
  const results: AverageResult[] = [];
  
  // Grouper les notes par matière
  const gradesByMonth = new Map<string, Grade[]>();
  const gradesByQuarter = new Map<string, Grade[]>();
  const gradesByYear = new Map<string, Grade[]>();
  
  grades.forEach((grade) => {
    const date = new Date(grade.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const quarter = Math.ceil(month / 3);
    
    // Par mois
    const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
    if (!gradesByMonth.has(monthKey)) gradesByMonth.set(monthKey, []);
    gradesByMonth.get(monthKey)!.push(grade);
    
    // Par trimestre
    const quarterKey = `${year}-Q${quarter}`;
    if (!gradesByQuarter.has(quarterKey)) gradesByQuarter.set(quarterKey, []);
    gradesByQuarter.get(quarterKey)!.push(grade);
    
    // Par année
    const yearKey = year.toString();
    if (!gradesByYear.has(yearKey)) gradesByYear.set(yearKey, []);
    gradesByYear.get(yearKey)!.push(grade);
  });
  
  // Calculer les moyennes selon la période
  let periodMap: Map<string, Grade[]>;
  switch (period) {
    case 'MONTHLY':
      periodMap = gradesByMonth;
      break;
    case 'QUARTERLY':
      periodMap = gradesByQuarter;
      break;
    case 'YEARLY':
      periodMap = gradesByYear;
      break;
  }
  
  periodMap.forEach((gradesForPeriod, periodKey) => {
    const average = calculateAverage(gradesForPeriod);
    const coefficientSum = gradesForPeriod.reduce((sum, g) => sum + g.coefficient, 0);
    
    results.push({
      studentId: student.id,
      student,
      subject: 'Gen éral', // Moyenne générale
      period,
      periodValue: periodKey,
      average,
      grades: gradesForPeriod,
      coefficientSum
    });
  });
  
  return results;
}

// Calculer toutes les moyennes d'un éleve
export function calculateStudentAverages(
  student: Student,
  grades: Grade[],
  period: Period
}: StudentAverages {
  const averages = calculateAveragesByPeriod(student, grades, period);
  
  // Calculer la moyenne générale
  const generalAverage = averages.length > 0
    ? averages.reduce((sum, a) => sum + a.average, 0) / averages.length
    : 0;
  
  return {
    student,
    averages,
    generalAverage: Math.round(generalAverage * 100) / 100
  };
}

// Determiner la mention sélon la moyenne
export function getMention(average: number): string {
  if (average >= 16) return 'Très Bien';
  if (average >= 14) return 'Bien';
  if (average >= 12) return 'Assez Bien';
  if (average >= 10) return 'Passable';
  return 'Insuffisant';
}

// Convertir les notes en format affiché
export function formatGrade(value: number): string {
  return value.toFixed(2);
}