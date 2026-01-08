import { spawn } from 'node:child_process';
import path from 'node:path';
import fs from 'fs';
import dotenv from 'dotenv';

// Helper to run drizzle-kit et générer les migrations selon USE_PROD_DB

function run(cmd: string, args: string[]) {
  return new Promise<void>((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: 'inherit', shell: true });
    proc.on('exit', (code) => {
      if (code === 0) resolve(); else reject(new Error(`${cmd} ${args.join(' ')} exited with ${code}`));
    });
    proc.on('error', reject);
  });
}



(async () => {
  // Charge .env ou .env.example
  let envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    envPath = path.resolve(process.cwd(), '.env.example');
  }
  dotenv.config({ path: envPath });

  const useProd = process.env.USE_PROD_DB === 'true';
  const configPath = useProd
    ? path.resolve(process.cwd(), 'drizzle-prod.config.ts')
    : path.resolve(process.cwd(), 'drizzle-dev.config.ts');
  console.log(`[generate] Using config: ${configPath} (USE_PROD_DB=${process.env.USE_PROD_DB})`);
  process.env.DRIZZLE_CONFIG_PATH = configPath;
  await run('npx', ['drizzle-kit', 'generate', '--config', configPath]);
  console.log('[generate] Migrations generated. Apply with: npx tsx scripts/database/migrate.ts');
})().catch((err) => {
  console.error('[generate] Failed:', err);
  process.exit(1);
});