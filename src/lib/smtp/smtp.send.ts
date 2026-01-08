import type { EmailOptions, SmtpTestResult } from '@smtp/smtp.types';
import { smtpConfig, validateSmtpConfig } from '@smtp/smtp.config';
import { getDetailedErrorMessage } from '@smtp/smtp.errors';
import { isValidEmail, validateEmailOptions } from '@smtp/smtp.validate';
import nodemailer from 'nodemailer';

export async function sendEmail(options: EmailOptions): Promise<SmtpTestResult> {
  const timestamp = new Date();
  try {
    const validation = validateEmailOptions(options);
    if (!validation.isValid) {
      return {
        success: false,
        message: 'Données d\'email invalides',
        detailedMessage: `Erreurs de validation:\n${validation.errors.join('\n')}`,
        errorCode: 'VALIDATION_ERROR',
        timestamp
      };
    }
    const configValidation = validateSmtpConfig();
    if (!configValidation.isValid) {
      return {
        success: false,
        message: 'Configuration SMTP invalide',
        detailedMessage: `Erreurs de configuration:\n${configValidation.errors.join('\n')}`,
        errorCode: 'CONFIG_INVALID',
        timestamp
      };
    }
    const transporter = nodemailer.createTransport(smtpConfig);
    const mailOptions = {
      from: options.from || import.meta.env.SMTP_FROM || smtpConfig.auth.user,
      to: options.to.trim(),
      subject: options.subject.trim(),
      text: options.text?.trim(),
      html: options.html?.trim()
    };
    const sendResult = await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout: L\'envoi de l\'email a pris trop de temps')), 30000))
    ]) as any;
    return {
      success: true,
      message: `Email envoyé avec succès`,
      detailedMessage: `Email envoyé à ${options.to}. ID du message: ${sendResult.messageId || 'Non disponible'}. Le destinataire devrait recevoir l\'email sous peu.`,
      errorCode: 'SUCCESS',
      timestamp
    };
  } catch (error) {
    const errorInfo = getDetailedErrorMessage(error);
    return {
      success: false,
      message: `Échec de l'envoi: ${errorInfo.message}`,
      detailedMessage: errorInfo.detailedMessage,
      errorCode: errorInfo.errorCode,
      error,
      timestamp
    };
  }
}

export async function sendTestEmail(toEmail: string): Promise<SmtpTestResult> {
  const timestamp = new Date();
  try {
    if (!toEmail || !isValidEmail(toEmail)) {
      return {
        success: false,
        message: 'Adresse email destinataire invalide',
        detailedMessage: 'L\'adresse email fournie n\'est pas au format valide. Veuillez fournir une adresse email complète (ex: user@domain.com).',
        errorCode: 'INVALID_RECIPIENT',
        timestamp
      };
    }
    const testSubject = `🧪 Test SMTP Real CMS - ${new Date().toLocaleString('fr-FR')}`;
    const testContent = `...HTML du mail de test...`;
    const textContent = `...Texte du mail de test...`;
    const result = await sendEmail({
      to: toEmail,
      subject: testSubject,
      html: testContent,
      text: textContent
    });
    if (result.success) {
      return {
        success: true,
        message: 'Email de test envoyé avec succès',
        detailedMessage: `L'email de test a été envoyé à ${toEmail}. Il contient des informations détaillées sur votre configuration SMTP et confirme que votre système d'envoi d'emails fonctionne correctement.`,
        errorCode: 'SUCCESS',
        timestamp
      };
    } else {
      return result;
    }
  } catch (error) {
    const errorInfo = getDetailedErrorMessage(error);
    return {
      success: false,
      message: `Échec de l'envoi du test: ${errorInfo.message}`,
      detailedMessage: errorInfo.detailedMessage,
      errorCode: errorInfo.errorCode,
      error,
      timestamp
    };
  }
}