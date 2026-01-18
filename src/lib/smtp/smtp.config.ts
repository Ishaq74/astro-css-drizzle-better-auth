// Configuration SMTP et validation
import type { EmailOptions } from './smtp.types';

// Example usage for type-checking
export function sendTestEmail(options: EmailOptions): boolean {
  // Dummy implementation for type usage
  return !!options;
}

function getEnv(key: string, fallback: string = ''): string {
  if (typeof process !== 'undefined' && process.env[key]) return process.env[key]!;
  try {
    // @ts-ignore
    if (import.meta && import.meta.env && import.meta.env[key]) return import.meta.env[key];
  } catch {}
  return fallback;
}

export const smtpConfig = {
  host: getEnv('SMTP_HOST', 'localhost'),
  port: parseInt(getEnv('SMTP_PORT', '587')),
  secure: getEnv('SMTP_SECURE', 'false') === 'true',
  // Optional: force specific auth method (e.g. 'LOGIN') when server rejects PLAIN
  authMethod: getEnv('SMTP_AUTH_METHOD', '') || undefined,
  auth: {
    user: getEnv('SMTP_USER', ''),
    pass: getEnv('SMTP_PASS', getEnv('SMTP_PASSWORD', ''))
  },
  tls: {
    rejectUnauthorized: false
  }
};

export function validateSmtpConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (!smtpConfig.host || smtpConfig.host.trim() === '') {
    errors.push('Le serveur SMTP (SMTP_HOST) n\'est pas configuré');
  }
  if (!smtpConfig.port || smtpConfig.port < 1 || smtpConfig.port > 65535) {
    errors.push('Le port SMTP (SMTP_PORT) doit être un nombre entre 1 et 65535');
  }
  if (!smtpConfig.auth.user || smtpConfig.auth.user.trim() === '') {
    errors.push('Le nom d\'utilisateur SMTP (SMTP_USER) n\'est pas configuré');
  }
  if (!smtpConfig.auth.pass || smtpConfig.auth.pass.trim() === '') {
    errors.push('Le mot de passe SMTP (SMTP_PASS ou SMTP_PASSWORD) n\'est pas configuré');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (smtpConfig.auth.user && !emailRegex.test(smtpConfig.auth.user)) {
    errors.push('L\'adresse email SMTP (SMTP_USER) n\'est pas au format valide');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}