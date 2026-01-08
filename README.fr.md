# Astro CSS Drizzle Better Auth

[EN](./README.md) | [**FR**](./README.fr.md) | [AR](./README.ar.md) | [ES](./README.es.md)

Une application web moderne construite avec Astro, CSS, Drizzle ORM et Better Auth.

_Ce README est généré automatiquement pour fournir un contexte complet à l'IA._

## Sommaire

- [Vue d'ensemble](#vue-densemble)
- [Fonctionnalités](#fonctionnalites)
- [Stack technique](#stack-technique)
- [Installation](#installation)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Authentification](#authentification)
- [Base de données](#base-de-donnees)
- [Variables d'environnement](#variables-denvironnement)

## Vue d'ensemble

Ce projet démontre une application web full-stack utilisant des technologies modernes.

## Fonctionnalités

⚡ **Astro** - Génération de sites statiques rapide
🎨 **CSS** - Styling moderne
🗄️ **Drizzle ORM** - Requêtes de base de données type-safe
🔐 **Better Auth** - Authentification avancée
🌍 **i18n** - Support multilingue

## Stack technique

- **@astrojs/check**: `^0.9.6`
- **@astrojs/vercel**: `^8.0.4`
- **@iconify-json/circle-flags**: `^1.2.10`
- **@iconify-json/mdi**: `^1.2.3`
- **@iconify-json/openmoji**: `^1.2.19`
- **astro**: `^5.16.6`
- **astro-font**: `^1.1.0`
- **astro-icon**: `^1.1.5`
- **better-auth**: `^1.4.10`
- **dotenv**: `^17.2.3`
- **drizzle-orm**: `^0.45.1`
- **nodemailer**: `^7.0.12`
- **pg**: `^8.16.3`
- **typescript**: `^5.9.3`

## Installation

```bash
npm install
npm run dev
```

## Scripts disponibles

- `npm run dev`: astro dev
- `npm run build`: astro build
- `npm run preview`: astro preview
- `npm run astro`: astro
- `npm run readme:generate`: tsx scripts/readme-generate.ts
- `npm run db:check`: tsx scripts/database/checkdb.ts
- `npm run db:compare`: tsx scripts/database/comparedb.ts
- `npm run syncdb:dev-to-prod`: tsx scripts/database/syncdb.ts dev-to-prod
- `npm run syncdb:prod-to-dev`: tsx scripts/database/syncdb.ts prod-to-dev
- `npm run db:migrate`: tsx scripts/database/migrate.ts
- `npm run db:generate`: tsx scripts/database/generate.ts
- `npm run db:seed`: tsx scripts/database/seed.ts
- `npm run smtp:check`: tsx src/lib/smtp/smtp.tests.ts

## Structure du projet

```
- README.ar.md
- README.es.md
- README.fr.md
- README.md
- astro.config.mjs
- drizzle-dev.config.ts
- drizzle-prod.config.ts
- package-lock.json
- package.json
- **public**
  - favicon.svg
  - **fonts**
    - **Bowlby_One_SC**
      - BowlbyOneSC-Regular.ttf
    - **Palanquin_Dark**
      - PalanquinDark-Bold.ttf
      - PalanquinDark-Medium.ttf
      - PalanquinDark-Regular.ttf
      - PalanquinDark-SemiBold.ttf
  - **images**
- **scripts**
  - **db**
    - db-check.ts
  - readme-generate.ts
- **src**
  - **assets**
  - **components**
    - **templates**
      - **Footer**
        - Footer.astro
      - **Header**
        - Brand.astro
        - Header.astro
        - LangChooser.astro
        - Navigation.astro
        - ThemeSwitch.astro
      - **docs**
        - MainDoc.astro
        - Sidebar.astro
        - TableOfContents.astro
        - navigation.ts
    - **ui**
      - **Accordion**
        - Accordion.astro
        - AccordionItem.astro
      - Alert.astro
      - **Avatar**
        - Avatar.astro
        - AvatarCard.astro
        - AvatarGroup.astro
      - Badge.astro
      - **Breadcrumb**
        - Breadcrumb.astro
        - BreadcrumbEllipsis.astro
        - BreadcrumbItem.astro
        - BreadcrumbLink.astro
        - BreadcrumbList.astro
        - BreadcrumbPage.astro
        - BreadcrumbSeparator.astro
        - index.ts
      - Button.astro
      - **Card**
        - Card.astro
        - CardContent.astro
        - CardDescription.astro
        - CardFooter.astro
        - CardHeader.astro
        - CardImage.astro
        - CardMeta.astro
      - **Dialog**
        - Dialog.astro
        - DialogClose.astro
        - DialogContent.astro
        - DialogDescription.astro
        - DialogFooter.astro
        - DialogHeader.astro
        - DialogTitle.astro
        - DialogTrigger.astro
      - Dropdown.astro
      - **Form**
        - Checkbox.astro
        - DatePicker.astro
        - FormCard.astro
        - FormGroup.astro
        - Input.astro
        - Label.astro
        - PasswordInput.astro
        - Radio.astro
        - Select.astro
        - Switch.astro
        - Textarea.astro
      - Gallery.astro
      - Kbd.astro
      - Link.astro
      - Pagination.astro
      - ProgressBar.astro
      - Skeleton.astro
      - **Slider**
        - Slider.astro
        - SliderItem.astro
      - **Table**
        - Table.astro
        - TableBody.astro
        - TableCaption.astro
        - TableCell.astro
        - TableFoot.astro
        - TableHead.astro
        - TableHeader.astro
        - TableRow.astro
      - **Tabs**
        - Tab.astro
        - TabPanel.astro
        - Tabs.astro
      - Timeline.astro
      - Tooltip.astro
      - Video.astro
  - **database**
    - **data**
    - drizzle.ts
    - **loaders**
      - factory.ts
    - **migrations**
    - **schemas**
    - schemas.ts
  - **i18n**
    - ar.json
    - en.json
    - es.json
    - fr.json
  - **layouts**
    - BaseLayout.astro
    - DocLayout.astro
  - **lib**
    - **smtp**
      - smtp.config.ts
      - smtp.errors.ts
      - smtp.send.ts
      - smtp.tests.ts
      - smtp.ts
      - smtp.types.ts
      - smtp.validate.ts
  - **pages**
    - **api**
    - **ar**
      - index.astro
    - **en**
      - **docs**
        - **components**
          - accordion.astro
          - avatar.astro
          - breadcrumb.astro
          - gallery.astro
          - pagination.astro
          - progressbar.astro
          - skeleton.astro
          - slider.astro
          - timeline.astro
        - **design**
          - alert.astro
          - badge.astro
          - button.astro
          - card.astro
          - code.astro
          - dialog.astro
          - dropdown.astro
          - form.astro
          - index.astro
          - kbd.astro
          - link.astro
          - switch.astro
          - table.astro
          - tabs.astro
          - tooltip.astro
          - video.astro
        - **layouts**
          - base.astro
          - doc.astro
        - **templates**
          - footer.astro
          - header.astro
          - table-of-contents.astro
      - index.astro
    - **es**
      - index.astro
    - **fr**
      - **docs**
        - **components**
          - accordion.astro
          - avatar.astro
          - breadcrumb.astro
          - gallery.astro
          - pagination.astro
          - progressbar.astro
          - skeleton.astro
          - slider.astro
          - timeline.astro
        - **design**
          - alert.astro
          - badge.astro
          - button.astro
          - card.astro
          - code.astro
          - dialog.astro
          - dropdown.astro
          - form.astro
          - index.astro
          - kbd.astro
          - link.astro
          - switch.astro
          - table.astro
          - tabs.astro
          - tooltip.astro
          - video.astro
        - **layouts**
          - base.astro
          - doc.astro
        - **templates**
          - footer.astro
          - header.astro
          - table-of-contents.astro
      - index.astro
      - legal.astro
  - **scripts**
  - **styles**
    - base.css
    - **components**
      - futuristic.css
      - initial.css
      - modern.css
      - retro.css
    - global.css
    - **tokens**
      - colors.css
      - components.css
      - spacing.css
      - typography.css
  - **utils**
- tsconfig.json
```

## Authentification

Better Auth est configuré avec des plugins pour OAuth, gestion de sessions, et plus.

## Base de données



## Variables d'environnement

- `USE_PROD_DB`
- `DATABASE_URL_LOCAL`
- `DATABASE_URL_PROD`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `PUBLIC_API_URL`

