import { config } from 'dotenv';
import { Client } from 'pg';

config();

(async () => {
  // Vérification des variables d'environnement
  const useProd = process.env.USE_PROD_DB === 'true';
  const dbUrl = useProd 
    ? process.env.DATABASE_URL_PROD 
    : (process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL);
  
  console.log('🔍 Configuration détectée:');
  console.log('  - USE_PROD_DB:', process.env.USE_PROD_DB || '(non défini)');
  console.log('  - Mode:', useProd ? 'PRODUCTION' : 'LOCAL/DEV');
  console.log('  - URL:', dbUrl || '❌ NON DÉFINIE');
  
  if (!dbUrl) {
    console.error('\n❌ Erreur: Aucune variable DATABASE_URL trouvée dans .env');
    console.error('Variables DATABASE disponibles:', Object.keys(process.env).filter(k => k.includes('DATABASE')));
    process.exit(1);
  }

  // Vérification que l'URL est valide
  if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
    console.error('\n❌ Erreur: DATABASE_URL invalide. Format attendu: postgresql://...');
    console.error('URL fournie:', dbUrl.substring(0, 30) + '...');
    process.exit(1);
  }

  // Vérification des placeholders
  const placeholders = ['username', 'password', 'localhost:port', 'namedb', 'example.neon.tech'];
  const hasPlaceholder = placeholders.some(p => dbUrl.includes(p));
  if (hasPlaceholder) {
    console.error('\n❌ Erreur: DATABASE_URL contient des placeholders non remplacés');
    console.error('URL fournie:', dbUrl);
    console.error('\nℹ️  Veuillez remplacer les valeurs fictives par vos vraies informations de connexion dans le fichier .env');
    process.exit(1);
  }

  const client = new Client({
    connectionString: dbUrl,
    ssl: dbUrl.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
  });

  try {
    await client.connect();
    const res = await client.query('SELECT current_database(), current_user, inet_server_addr() as host');
    const env = useProd ? 'production (Neon)' : 'local/dev';
    console.log('✅ Connexion OK !');
    console.log('ENV détecté :', env);
    console.table(res.rows);

    // Vérifie les tables attendues vs la base actuelle
    // Liste toutes les tables présentes
    const tablesRes = await client.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
    );
    const present = tablesRes.rows.map((r) => r.table_name);
    console.log('\n---\nTables présentes dans la base :');
    if (present.length === 0) {
      // Couleurs ANSI
      const red = '\x1b[31m';
      const yellow = '\x1b[33m';
      const reset = '\x1b[0m';
      const bold = '\x1b[1m';
      console.log(`  ${red}${bold}0 (aucune table trouvée)${reset}`);
      console.log(`${reset} La base existe mais ne contient ${red}aucune table${reset}${yellow}${bold}`);
      console.log(`${reset} Vous devriez lancer : ${bold}npm run db:migrate${reset}${yellow}${bold} ou ${bold}npm run db:generate${reset}${yellow}${bold}`);
    } else {
      for (const t of present) console.log(' -', t);
    }

    // Affiche les contraintes principales
    const constraints = await client.query(`
      SELECT conname, contype, relname as table
      FROM pg_constraint
      JOIN pg_class ON conrelid = pg_class.oid
      WHERE relnamespace = 'public'::regnamespace
      ORDER BY relname, conname;
    `);
    console.log('\n---\nContraintes principales :');
    for (const row of constraints.rows) {
      console.log(` - [${row.contype}] ${row.conname} sur ${row.table}`);
    }
  } catch (e: any) {
    // Couleurs ANSI
    const red = '\x1b[31m';
    const yellow = '\x1b[33m';
    const cyan = '\x1b[36m';
    const bold = '\x1b[1m';
    const reset = '\x1b[0m';

    if (e?.code === '3D000') {
      // Base de données inexistante
      console.error(`\n${red}${bold}❌ La base de données n'existe pas :${reset} ${yellow}${bold}${dbUrl}${reset}`);
      console.error(`\n${yellow}Créez la base avec :${reset} ${cyan}createdb <nom_base>${reset}`);
      console.error(`Ou vérifiez la variable DATABASE_URL dans votre .env`);
    } else if (e?.code === '28P01') {
      // Mauvais mot de passe
      console.error(`\n${red}${bold}❌ Mot de passe ou utilisateur incorrect pour la base :${reset} ${yellow}${bold}${dbUrl}${reset}`);
      console.error(`\n${yellow}Vérifiez vos identifiants dans le .env${reset}`);
    } else {
      // Autre erreur
      console.error(`\n${red}${bold}❌ Erreur de connexion à la base :${reset} ${e.message || e}`);
      if (e?.code) {
        console.error(`${yellow}Code erreur PG :${reset} ${e.code}`);
      }
      if (e?.detail) {
        console.error(`${yellow}Détail :${reset} ${e.detail}`);
      }
      if (e?.hint) {
        console.error(`${yellow}Hint :${reset} ${e.hint}`);
      }
    }
    process.exit(1);
  } finally {
    await client.end();
  }
})();