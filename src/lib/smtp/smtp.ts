import { smtpConfig, validateSmtpConfig } from '@smtp/smtp.config';
import type { SmtpTestResult, EmailOptions } from '@smtp/smtp.types';
import { getDetailedErrorMessage } from '@smtp/smtp.errors';
import { isValidEmail, validateEmailOptions } from '@smtp/smtp.validate';
import { sendEmail, sendTestEmail } from '@smtp/smtp.send';
import { testSmtpConnection } from '@smtp/smtp.tests';

export {
  smtpConfig,
  validateSmtpConfig,
  getDetailedErrorMessage,
  isValidEmail,
  validateEmailOptions,
  sendEmail,
  sendTestEmail,
  testSmtpConnection
};

export type { SmtpTestResult, EmailOptions };