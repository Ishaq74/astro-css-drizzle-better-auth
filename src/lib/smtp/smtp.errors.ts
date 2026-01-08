// Fonctions utilitaires pour l'analyse et la traduction des erreurs SMTP
export function getDetailedErrorMessage(error: any): { message: string; detailedMessage: string; errorCode: string } {
  const errorMessage = error?.message || error?.toString() || 'Erreur inconnue';
  const errorCode = error?.code || error?.errno || 'UNKNOWN';
  const errorMappings: Record<string, { message: string; details: string }> = {
    ENOTFOUND: {
      message: 'Serveur SMTP introuvable',
      details: 'Vérifiez l\'adresse du serveur SMTP dans la configuration. Le nom d\'hôte est incorrect ou le serveur n\'existe pas.'
    },
    ECONNREFUSED: {
      message: 'Connexion refusée par le serveur SMTP',
      details: 'Le serveur SMTP refuse la connexion. Vérifiez le port (587 pour TLS, 465 pour SSL, 25 pour non-sécurisé) et que le serveur accepte les connexions.'
    },
    ECONNRESET: {
      message: 'Connexion fermée par le serveur SMTP',
      details: 'La connexion a été fermée de manière inattendue. Cela peut être dû à une configuration TLS/SSL incorrecte ou à une limitation du serveur.'
    },
    ETIMEDOUT: {
      message: 'Délai d\'attente dépassé',
      details: 'La connexion au serveur SMTP a expiré. Vérifiez votre connexion internet et les paramètres de pare-feu.'
    },
    EAUTH: {
      message: 'Échec de l\'authentification SMTP',
      details: 'Les identifiants de connexion sont incorrects. Vérifiez le nom d\'utilisateur et le mot de passe. Pour Gmail, utilisez un mot de passe d\'application.'
    },
    ESOCKET: {
      message: 'Erreur de socket réseau',
      details: 'Problème de connexion réseau. Vérifiez votre connexion internet et les paramètres de proxy/pare-feu.'
    },
    EENVELOPE: {
      message: 'Erreur d\'enveloppe email',
      details: 'L\'adresse email expéditrice ou destinataire est invalide ou refusée par le serveur SMTP.'
    },
    EMESSAGE: {
      message: 'Erreur de contenu du message',
      details: 'Le contenu du message est invalide ou contient des éléments refusés par le serveur SMTP.'
    },
    EDNS: {
      message: 'Erreur de résolution DNS',
      details: 'Impossible de résoudre le nom du serveur SMTP. Vérifiez vos paramètres DNS et votre connexion internet.'
    }
  };
  const messagePatterns: Record<string, { message: string; details: string }> = {
    'Invalid connexion': {
      message: 'Identifiants de connexion invalides',
      details: 'Le nom d\'utilisateur ou le mot de passe est incorrect. Pour Gmail, activez l\'authentification à deux facteurs et utilisez un mot de passe d\'application.'
    },
    'Username and Password not accepted': {
      message: 'Nom d\'utilisateur et mot de passe refusés',
      details: 'Les identifiants ne sont pas acceptés par le serveur. Vérifiez que le compte est autorisé à envoyer des emails via SMTP.'
    },
    'Must issue a STARTTLS command first': {
      message: 'TLS requis par le serveur',
      details: 'Le serveur exige une connexion sécurisée TLS. Vérifiez que le port et les paramètres de sécurité sont corrects.'
    },
    'self signed certificate': {
      message: 'Certificat SSL auto-signé',
      details: 'Le serveur utilise un certificat SSL auto-signé. Cela peut nécessiter une configuration spéciale pour accepter ce type de certificat.'
    },
    'certificate has expired': {
      message: 'Certificat SSL expiré',
      details: 'Le certificat SSL du serveur a expiré. Contactez l\'administrateur du serveur SMTP.'
    },
    'Network is unreachable': {
      message: 'Réseau inaccessible',
      details: 'Impossible d\'atteindre le serveur SMTP. Vérifiez votre connexion internet et les paramètres de pare-feu.'
    },
    'Relay access denied': {
      message: 'Accès de relais refusé',
      details: 'Le serveur refuse de transmettre l\'email. Vérifiez que votre adresse IP est autorisée ou que vous êtes authentifié.'
    },
    'Recipient address rejected': {
      message: 'Adresse destinataire refusée',
      details: 'L\'adresse email du destinataire est refusée par le serveur. Vérifiez que l\'adresse est valide et autorisée.'
    }
  };
  if (errorCode && errorMappings[errorCode]) {
    return {
      message: errorMappings[errorCode].message,
      detailedMessage: errorMappings[errorCode].details,
      errorCode
    };
  }
  for (const [pattern, info] of Object.entries(messagePatterns)) {
    if (errorMessage.toLowerCase().includes(pattern.toLowerCase())) {
      return {
        message: info.message,
        detailedMessage: info.details,
        errorCode: errorCode || 'MESSAGE_PATTERN'
      };
    }
  }
  return {
    message: 'Erreur SMTP',
    detailedMessage: `Erreur technique: ${errorMessage}. Vérifiez la configuration SMTP et consultez les logs pour plus de détails.`,
    errorCode: errorCode || 'UNKNOWN'
  };
}