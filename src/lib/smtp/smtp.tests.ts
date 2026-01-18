import 'dotenv/config';
import nodemailer from 'nodemailer';
import { smtpConfig, validateSmtpConfig } from './smtp.config';
import type { EmailOptions, SmtpTestResult } from './smtp.types';

// Example usage for type-checking
export function testEmailOptions(options: EmailOptions): boolean {
  // Dummy implementation for type usage
  return !!options;
}
import { getDetailedErrorMessage } from './smtp.errors';

// Fonction pour tester la connexion SMTP
export async function testSmtpConnection(): Promise<SmtpTestResult> {
  const timestamp = new Date();
  try {
    const transporter = nodemailer.createTransport(smtpConfig);
    await Promise.race([
      transporter.verify(),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout: La connexion au serveur SMTP a pris trop de temps')), 15000))
    ]);
    return {
      success: true,
      message: 'Connexion SMTP établie avec succès',
      detailedMessage: 'Le serveur SMTP est accessible et l\'authentification a réussi. Le système est prêt à envoyer des emails.',
      errorCode: 'SUCCESS',
      config: {
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: smtpConfig.secure,
        user: smtpConfig.auth.user,
        hasAuth: !!(smtpConfig.auth.user && smtpConfig.auth.pass)
      },
      timestamp
    };
  } catch (error: any) {
    const errorInfo = getDetailedErrorMessage(error);
    return {
      success: false,
      message: errorInfo.message,
      detailedMessage: errorInfo.detailedMessage,
      errorCode: errorInfo.errorCode,
      error,
      timestamp
    };
  }
}
// Exécution automatique du test SMTP et affichage du résultat stylé
testSmtpConnection().then(result => {
  console.log('\n🎯  TEST SMTP - Real CMS Admin Dashboard');
  console.log('----------------------------------------');
  if (result.success) {
    console.log('✅ Connexion SMTP réussie !');
    console.log('Message :', result.message);
    console.log('Détails :', result.detailedMessage);
    if (result.config) {
      console.log('⚙️  Configuration utilisée :');
      console.log(`• Serveur : ${result.config.host}`);
      console.log(`• Port    : ${result.config.port}`);
      console.log(`• Sécurisé: ${result.config.secure ? 'Oui (SSL)' : 'Non (TLS/STARTTLS)'}`);
      console.log(`• User    : ${result.config.user}`);
      console.log(`• Auth    : ${result.config.hasAuth ? '✔️' : '❌'}`);
    }
    console.log('🕒 Date/Heure :', result.timestamp.toLocaleString('fr-FR'));
  } else {
    console.log('❌ Échec de la connexion SMTP !');
    console.log('Message :', result.message);
    console.log('Détails :', result.detailedMessage);
    if (result.errorCode) console.log('Code erreur :', result.errorCode);
    if (result.error) {
      console.log('Erreur brute :', result.error);
    }
    console.log('🕒 Date/Heure :', result.timestamp.toLocaleString('fr-FR'));
  }
  console.log('----------------------------------------\n');
}).catch(err => {
  console.error('❌ Erreur fatale lors du test SMTP:', err);
});