import { promises as fs } from 'fs';
import path from 'path';
import { generateStructure } from './readme/generateStructure';
import { generateDatabase } from './readme/generateDatabase';
import { generateScripts } from './readme/generateScripts';
import { PATHS, readFile } from './readme/utils';

const LANGS = ['en', 'fr', 'ar', 'es'] as const;
type Lang = typeof LANGS[number];

const currentDir = path.dirname(path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')));

function githubSlug(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .replace(/[!"#$%&'()*+,./:;<=>?@\[\]^_`{|}~]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
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
  },
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

async function generateEnv(lang: Lang): Promise<string> {
  const content = await readFile(PATHS.envExample);
  const lines = content.split(/\r?\n/).filter(l => l.trim() && !l.trim().startsWith('#'));
  return lines.map(l => `- \`${l.split('=')[0]}\``).join('\n') || '_None_';
}

async function generateTsconfigAliases(): Promise<string> {
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

async function generateReadmeForLang(lang: Lang) {
  const t = i18n;
  let md = `# ${t.projectName[lang]}\n\n`;
  md += `${getLangLinks(lang)}\n\n`;
  md += `${t.description[lang]}\n\n`;
  md += `${t.subtitle[lang]}\n\n`;

  // Génère le contenu principal (hors sommaire)
  let mainContent = '';
  mainContent += `## ${t.sections.overview[lang]}\n\n`;
  mainContent += lang === 'en' ? 'This project demonstrates a full-stack web application using modern technologies.\n\n' :
        lang === 'fr' ? 'Ce projet démontre une application web full-stack utilisant des technologies modernes.\n\n' :
        lang === 'ar' ? 'يوضح هذا المشروع تطبيق ويب متكامل باستخدام التقنيات الحديثة.\n\n' :
        'Este proyecto demuestra una aplicación web full-stack usando tecnologías modernas.\n\n';

  mainContent += `## ${t.sections.features[lang]}\n\n`;
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
  mainContent += features.join('\n') + '\n\n';

  mainContent += `## ${t.sections.techStack[lang]}\n\n`;
  mainContent += await generateDeps(lang) + '\n\n';

  mainContent += `## ${t.sections.installation[lang]}\n\n`;
  mainContent += '```bash\n';
  mainContent += 'npm install\n';
  mainContent += await generateScripts(lang, t);
  mainContent += '```\n\n';

  mainContent += await generateStructure(lang, t);

  mainContent += `### Alias TypeScript (tsconfig.json)\n\n`;
  mainContent += await generateTsconfigAliases() + '\n\n';

  mainContent += `## ${t.sections.auth[lang]}\n\n`;
  mainContent += lang === 'en' ? 'Better Auth is configured with plugins for OAuth, session management, and more.\n\n' :
        lang === 'fr' ? 'Better Auth est configuré avec des plugins pour OAuth, gestion de sessions, et plus.\n\n' :
        lang === 'ar' ? 'تم تكوين Better Auth باستخدام المكونات الإضافية لـ OAuth وإدارة الجلسات والمزيد.\n\n' :
        'Better Auth está configurado con plugins para OAuth, gestión de sesiones y más.\n\n';

  mainContent += await generateDatabase(lang, t);

  mainContent += `\n## ${t.sections.env[lang]}\n\n`;
  mainContent += await generateEnv(lang) + '\n';

  // Génère dynamiquement le sommaire à partir des titres ## du contenu
  const tocTitle = `## ${t.toc[lang]}\n\n`;
  const tocLines = [];
  const headingRegex = /^##\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(mainContent))) {
    const title = match[1].trim();
    const anchor = githubSlug(title);
    tocLines.push(`- [${title}](#${anchor})`);
  }
  md += tocTitle + tocLines.join('\n') + '\n\n' + mainContent;

  // Write file
  const suffix = lang === 'en' ? '' : `.${lang}`;
  const filePath = path.resolve(currentDir, `../README${suffix}.md`);
  await fs.writeFile(filePath, md, 'utf8');
  console.log(`✅ README${suffix}.md generated`);
}

async function main() {
  for (const lang of LANGS) {
    await generateReadmeForLang(lang);
  }
}

main().catch(console.error);
