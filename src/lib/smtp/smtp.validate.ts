// Fonctions de validation d'email et d'options
import type{ EmailOptions } from './smtp.types';

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
}

export function validateEmailOptions(options: EmailOptions): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!options.to || options.to.trim() === '') {
    errors.push('L\'adresse email du destinataire est requise');
  } else if (!isValidEmail(options.to)) {
    errors.push('L\'adresse email du destinataire n\'est pas au format valide');
  }
  if (!options.subject || options.subject.trim() === '') {
    errors.push('Le sujet de l\'email est requis');
  } else if (options.subject.length > 200) {
    errors.push('Le sujet de l\'email ne peut pas dépasser 200 caractères');
  }
  if (!options.text && !options.html) {
    errors.push('Le contenu de l\'email (texte ou HTML) est requis');
  }
  if (options.text && options.text.length > 50000) {
    errors.push('Le contenu texte de l\'email ne peut pas dépasser 50 000 caractères');
  }
  if (options.html && options.html.length > 100000) {
    errors.push('Le contenu HTML de l\'email ne peut pas dépasser 100 000 caractères');
  }
  if (options.from && !isValidEmail(options.from)) {
    errors.push('L\'adresse email de l\'expéditeur n\'est pas au format valide');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}