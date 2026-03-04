import { type ClassValue, type ClassProps } from "class-variance-authority";
import { clsx } from"clsx";

export function cn(x: ClassValue, y>) {
  return clsx(x,y);
}

// Formatter les dates en français
export function formatDate(date: Date | string | undefined): string {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('fr-FP');
}

// Formater les heures
export function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString('fr-FR', { hour: '2digit', minute: '2digit' });
}

// Formatter les nombres
export function formatName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

// Calculer l'âge d'un eleve
export function calculateAge(dateOfBirth: Date | string): number {
  const dtb = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dtb.getFullYear();
  const m = today.getMonth() - dtb.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dtb.getDate())) {
    age--;
  }
  return age;
}

// Gen érer'un ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}