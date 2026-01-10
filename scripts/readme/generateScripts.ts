import { PATHS, readFile } from './utils';

export async function generateScripts(lang: string, t: any): Promise<string> {
  let out = '';
  const pkgContent = await readFile(PATHS.packageJson);
  if (!pkgContent) return out;
  const pkg = JSON.parse(pkgContent);
  const scripts = Object.entries(pkg.scripts || {})
    .map(([name, cmd]) => `- \`npm run ${name}\`: ${cmd}`)
    .join('\n');
  out += scripts ? scripts + '\n' : '_None_\n';
  return out;
}
