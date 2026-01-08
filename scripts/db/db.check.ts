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

  try {
    const client = new Client({
      connectionString: dbUrl,
      ssl: dbUrl.includes('sslmode=require') ? { rejectUnauthorized: false } : undefined,
    });
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
    for (const t of present) console.log(' -', t);

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
  } catch (e) {
    console.error('Erreur de connexion à la base :', e);
    process.exit(1);
  } finally {
    await client.end();
  }
})();