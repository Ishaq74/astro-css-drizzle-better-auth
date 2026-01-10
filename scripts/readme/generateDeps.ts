import { PATHS, readFile } from './utils';
import type { Lang } from './i18n';

/**
 * Génère la liste des dépendances du projet
 */
export async function generateDeps(lang: Lang): Promise<string> {
  const pkgContent = await readFile(PATHS.packageJson);
  if (!pkgContent) return '';
  const pkg = JSON.parse(pkgContent);
  const deps = Object.entries(pkg.dependencies || {})
    .map(([name, ver]) => `- **${name}**: \`${ver}\``)
    .join('\n');
  return deps || '_None_';
}

/**
 * Génère la liste des variables d'environnement
 */
export async function generateEnv(lang: Lang): Promise<string> {
  const content = await readFile(PATHS.envExample);
  const lines = content.split(/\r?\n/).filter(l => l.trim() && !l.trim().startsWith('#'));
  return lines.map(l => `- \`${l.split('=')[0]}\``).join('\n') || '_None_';
}

/**
 * Génère la liste des alias TypeScript depuis tsconfig.json
 */
export async function generateTsconfigAliases(): Promise<string> {
  const tsconfigContent = await readFile(PATHS.tsconfig);
  if (!tsconfigContent) return '';
  let tsconfig;
  try {
    tsconfig = JSON.parse(tsconfigContent);
  } catch {
    return '';
  }
  const paths = tsconfig.compilerOptions?.paths || {};
  if (Object.keys(paths).length === 0) return '_None_';
  return Object.entries(paths)
    .map(([alias, targets]) => `- \`${alias}\` → \`${Array.isArray(targets) ? targets.join(', ') : targets}\``)
    .join('\n');
}
