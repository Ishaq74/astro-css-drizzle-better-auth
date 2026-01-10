import { promises as fs } from 'fs';
import path from 'path';

const LANGS = ['en', 'fr', 'ar', 'es'] as const;
type Lang = typeof LANGS[number];

const currentDir = path.dirname(path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')));

const PATHS = {
  packageJson: path.resolve(currentDir, '../package.json'),
  root: path.resolve(currentDir, '../'),
  docs: path.resolve(currentDir, '../docs/dev'),
  layouts: path.resolve(currentDir, '../src/layouts'),
  langs: path.resolve(currentDir, '../src/i18n'),
  middleware: path.resolve(currentDir, '../src/middleware.ts'),
  envTypes: path.resolve(currentDir, '../env.d.ts'),
  auth: path.resolve(currentDir, '../src/lib/auth/auth.ts'),
  authClient: path.resolve(currentDir, '../src/lib/auth/auth-client.ts'),
  pages: path.resolve(currentDir, '../src/pages'),
  envExample: path.resolve(currentDir, '../.env.example'),
  schemas: path.resolve(currentDir, '../src/lib/database/schemas'),
  data: path.resolve(currentDir, '../src/lib/database/data'),
} as const;

function githubSlug(str: string): string {
  // Génère un slug d'ancre compatible GitHub : accents conservés, apostrophes supprimées, espaces et ponctuation → tirets, tirets multiples fusionnés
  return str
    .trim()
    .toLowerCase()
    .replace(/'/g, '') // retire les apostrophes
    .replace(/[\s!"#$%&()*+,./:;<=>?@\[\]^_`{|}~]+/gu, '-') // espaces et ponctuation (hors apostrophe) → tiret
    .replace(/^-+|-+$/g, '') // retire tirets en début/fin
    .replace(/-+/g, '-'); // tirets multiples fusionnés
}

async function readFile(path: string): Promise<string> {
  try {
    return await fs.readFile(path, 'utf8');
  } catch {
    return '';
  }
}

async function listFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries.filter(e => e.isFile()).map(e => e.name);
  } catch {
    return [];
  }
}

async function listTree(dir: string, depth = 0): Promise<string> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    let result = '';
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules' || entry.name === 'dist') continue;
      const indent = '  '.repeat(depth);
      if (entry.isDirectory()) {
        result += `${indent}- **${entry.name}**\n`;
        result += await listTree(path.join(dir, entry.name), depth + 1);
      } else {
        result += `${indent}- ${entry.name}\n`;
      }
    }
    return result;
  } catch {
    return '';
  }
}

const i18n = {
  projectName: { en: 'Astro CSS Drizzle Better Auth', fr: 'Astro CSS Drizzle Better Auth', ar: 'Astro CSS Drizzle Better Auth', es: 'Astro CSS Drizzle Better Auth' },
  description: {
    en: 'A modern web application built with Astro, CSS, Drizzle ORM, and Better Auth.',
    fr: 'Une application web moderne construite avec Astro, CSS, Drizzle ORM et Better Auth.',
    ar: 'تطبيق ويب حديث مبني باستخدام Astro و CSS و Drizzle ORM و Better Auth.',
    es: 'Una aplicación web moderna construida con Astro, CSS, Drizzle ORM y Better Auth.',
  },
  subtitle: {
    en: '_This README is auto-generated to provide comprehensive context for AI assistance._',
    fr: "_Ce README est généré automatiquement pour fournir un contexte complet à l'IA._",
    ar: '_يتم إنشاء هذا الملف تلقائيًا لتوفير سياق شامل للمساعدة بالذكاء الاصطناعي._',
    es: '_Este README se genera automáticamente para proporcionar contexto completo a la IA._',
  },
  toc: { en: 'Table of Contents', fr: 'Sommaire', ar: 'جدول المحتويات', es: 'Índice' },
  sections: {
    overview: { en: 'Overview', fr: "Vue d'ensemble", ar: 'نظرة عامة', es: 'Descripción general' },
    features: { en: 'Features', fr: 'Fonctionnalités', ar: 'الميزات', es: 'Características' },
    techStack: { en: 'Tech Stack', fr: 'Stack technique', ar: 'المجموعة التقنية', es: 'Stack tecnológico' },
    installation: { en: 'Installation', fr: 'Installation', ar: 'التثبيت', es: 'Instalación' },
    scripts: { en: 'Available Scripts', fr: 'Scripts disponibles', ar: 'السكريبتات المتاحة', es: 'Scripts disponibles' },
    structure: { en: 'Project Structure', fr: 'Structure du projet', ar: 'هيكل المشروع', es: 'Estructura del proyecto' },
    auth: { en: 'Authentication', fr: 'Authentification', ar: 'المصادقة', es: 'Autenticación' },
    database: { en: 'Database', fr: 'Base de données', ar: 'قاعدة البيانات', es: 'Base de datos' },
    env: { en: 'Environment Variables', fr: "Variables d'environnement", ar: 'متغيرات البيئة', es: 'Variables de entorno' },
    contributing: { en: 'Contributing', fr: 'Contribuer', ar: 'المساهمة', es: 'Contribuir' },
    license: { en: 'License', fr: 'Licence', ar: 'الترخيص', es: 'Licencia' },
  },
  langSwitcher: { en: 'Languages', fr: 'Langues', ar: 'اللغات', es: 'Idiomas' },
} as const;

function getLangLinks(currentLang: Lang): string {
  const links = LANGS.map(lang => {
    const suffix = lang === 'en' ? '' : `.${lang}`;
    const label = lang === currentLang ? `**${lang.toUpperCase()}**` : lang.toUpperCase();
    return `[${label}](./README${suffix}.md)`;
  });
  return links.join(' | ');
}

async function generateDeps(lang: Lang): Promise<string> {
  const pkgContent = await readFile(PATHS.packageJson);
  if (!pkgContent) return '';
  const pkg = JSON.parse(pkgContent);
  const deps = Object.entries(pkg.dependencies || {}).map(([name, ver]) => `- **${name}**: \`${ver}\``).join('\n');
  return deps || '_None_';
}

async function generateScripts(lang: Lang): Promise<string> {
  const pkgContent = await readFile(PATHS.packageJson);
  if (!pkgContent) return '';
  const pkg = JSON.parse(pkgContent);
  const scripts = Object.entries(pkg.scripts || {}).map(([name, cmd]) => `- \`npm run ${name}\`: ${cmd}`).join('\n');
  return scripts || '_None_';
}

async function generateEnv(lang: Lang): Promise<string> {
  const content = await readFile(PATHS.envExample);
  const lines = content.split(/\r?\n/).filter(l => l.trim() && !l.trim().startsWith('#'));
  return lines.map(l => `- \`${l.split('=')[0]}\``).join('\n') || '_None_';
}

async function generateReadmeForLang(lang: Lang) {
  const t = i18n;
  let md = `# ${t.projectName[lang]}\n\n`;
  md += `${getLangLinks(lang)}\n\n`;
  md += `${t.description[lang]}\n\n`;
  md += `${t.subtitle[lang]}\n\n`;
  
  // Table of contents
  md += `## ${t.toc[lang]}\n\n`;
  const sections = ['overview', 'features', 'techStack', 'installation', 'scripts', 'structure', 'auth', 'database', 'env'] as const;
  for (const section of sections) {
    const title = t.sections[section][lang];
    const anchor = githubSlug(title);
    md += `- [${title}](#${anchor})\n`;
  }
  md += '\n';

  // Overview
  md += `## ${t.sections.overview[lang]}\n\n`;
  md += lang === 'en' ? 'This project demonstrates a full-stack web application using modern technologies.\n\n' :
        lang === 'fr' ? 'Ce projet démontre une application web full-stack utilisant des technologies modernes.\n\n' :
        lang === 'ar' ? 'يوضح هذا المشروع تطبيق ويب متكامل باستخدام التقنيات الحديثة.\n\n' :
        'Este proyecto demuestra una aplicación web full-stack usando tecnologías modernas.\n\n';

  // Features
  md += `## ${t.sections.features[lang]}\n\n`;
  const features = lang === 'en' ? [
    '⚡ **Astro** - Fast static site generation',
    '🎨 **CSS** - Modern styling',
    '🗄️ **Drizzle ORM** - Type-safe database queries',
    '🔐 **Better Auth** - Advanced authentication',
    '🌍 **i18n** - Multi-language support',
  ] : lang === 'fr' ? [
    '⚡ **Astro** - Génération de sites statiques rapide',
    '🎨 **CSS** - Styling moderne',
    '🗄️ **Drizzle ORM** - Requêtes de base de données type-safe',
    '🔐 **Better Auth** - Authentification avancée',
    '🌍 **i18n** - Support multilingue',
  ] : lang === 'ar' ? [
    '⚡ **Astro** - توليد مواقع ثابتة سريعة',
    '🎨 **CSS** - تصميم حديث',
    '🗄️ **Drizzle ORM** - استعلامات قاعدة بيانات آمنة من حيث النوع',
    '🔐 **Better Auth** - مصادقة متقدمة',
    '🌍 **i18n** - دعم متعدد اللغات',
  ] : [
    '⚡ **Astro** - Generación rápida de sitios estáticos',
    '🎨 **CSS** - Estilo moderno',
    '🗄️ **Drizzle ORM** - Consultas de base de datos type-safe',
    '🔐 **Better Auth** - Autenticación avanzada',
    '🌍 **i18n** - Soporte multiidioma',
  ];
  md += features.join('\n') + '\n\n';

  // Tech Stack
  md += `## ${t.sections.techStack[lang]}\n\n`;
  md += await generateDeps(lang) + '\n\n';

  // Installation
  md += `## ${t.sections.installation[lang]}\n\n`;
  md += '```bash\n';
  md += 'npm install\n';
async function generateTsconfigAliases(): Promise<string> {
  const tsconfigContent = await readFile(path.resolve(currentDir, '../tsconfig.json'));
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

  md += '```\n\n';

  // Scripts
  md += `## ${t.sections.scripts[lang]}\n\n`;
  md += await generateScripts(lang) + '\n\n';


  // Project Structure
  md += `## ${t.sections.structure[lang]}\n\n`;
  md += '```text\n';
  md += await listTree(PATHS.root);
  md += '```\n';

  // Aliases TSConfig
  md += `\n### Alias TypeScript (tsconfig.json)\n\n`;
  md += await generateTsconfigAliases() + '\n\n';

  // Authentication
  md += `## ${t.sections.auth[lang]}\n\n`;
  md += lang === 'en' ? 'Better Auth is configured with plugins for OAuth, session management, and more.\n\n' :
        lang === 'fr' ? 'Better Auth est configuré avec des plugins pour OAuth, gestion de sessions, et plus.\n\n' :
        lang === 'ar' ? 'تم تكوين Better Auth باستخدام المكونات الإضافية لـ OAuth وإدارة الجلسات والمزيد.\n\n' :
        'Better Auth está configurado con plugins para OAuth, gestión de sesiones y más.\n\n';

  // Database
  md += `## ${t.sections.database[lang]}\n\n`;
  const schemas = await listFiles(PATHS.schemas);
  md += schemas.map(s => `- ${s}`).join('\n');

  // Environment Variables
  md += `## ${t.sections.env[lang]}\n\n`;
  md += await generateEnv(lang) + '\n';

  // Write file
  const suffix = lang === 'en' ? '' : `.${lang}`;
  const filePath = path.resolve(currentDir, `../README${suffix}.md`);
  await fs.writeFile(filePath, md, 'utf8');
  console.log(`✅ README${suffix}.md generated`);
}

async function generateReadme() {
  const argLang = process.argv[2];
  if (argLang && LANGS.includes(argLang as Lang)) {
    await generateReadmeForLang(argLang as Lang);
  } else {
    for (const lang of LANGS) {
      await generateReadmeForLang(lang);
    }
  }
}

generateReadme().catch(console.error);