export interface SmtpTestResult {
  success: boolean;
  message: string;
  detailedMessage?: string;
  errorCode?: string;
  config?: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    hasAuth: boolean;
  };
  error?: any;
  timestamp: Date;
}

// Interface pour l'envoi d'email
export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}