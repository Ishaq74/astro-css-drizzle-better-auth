# Astro CSS Drizzle Better Auth

[EN](./README.md) | [FR](./README.fr.md) | [**AR**](./README.ar.md) | [ES](./README.es.md)

تطبيق ويب حديث مبني باستخدام Astro و CSS و Drizzle ORM و Better Auth.

_يتم إنشاء هذا الملف تلقائيًا لتوفير سياق شامل للمساعدة بالذكاء الاصطناعي._

## جدول المحتويات

- [نظرة عامة](#نظرة-عامة)
- [الميزات](#الميزات)
- [المجموعة التقنية](#المجموعة-التقنية)
- [التثبيت](#التثبيت)
- [هيكل المشروع](#هيكل-المشروع)
- [المصادقة](#المصادقة)
- [قاعدة البيانات](#قاعدة-البيانات)
- [متغيرات البيئة](#متغيرات-البيئة)
- [رموز CSS والأنماط](#رموز-css-والأنماط)

## نظرة عامة

يوضح هذا المشروع تطبيق ويب متكامل باستخدام التقنيات الحديثة.

## الميزات

⚡ **Astro** - توليد مواقع ثابتة سريعة
🎨 **CSS** - تصميم حديث
🗄️ **Drizzle ORM** - استعلامات قاعدة بيانات آمنة من حيث النوع
🔐 **Better Auth** - مصادقة متقدمة
🌍 **i18n** - دعم متعدد اللغات

## المجموعة التقنية

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

## التثبيت

```bash
npm install
- `npm run dev`: astro dev
- `npm run build`: astro build
- `npm run preview`: astro preview
- `npm run astro`: astro
- `npm run readme:generate`: tsx scripts/readme-generate.ts
- `npm run db:check`: tsx scripts/db/db.check.ts
- `npm run db:compare`: tsx scripts/db/db.compare.ts
- `npm run syncdb:dev-to-prod`: tsx scripts/db/db.sync.ts dev-to-prod
- `npm run syncdb:prod-to-dev`: tsx scripts/db/db.sync.ts prod-to-dev
- `npm run db:migrate`: tsx scripts/db/db.migrate.ts
- `npm run db:generate`: tsx scripts/db/db.generate.ts
- `npm run db:seed`: tsx scripts/db/db.seed.ts
- `npm run smtp:check`: tsx src/lib/smtp/smtp.tests.ts
```

## هيكل المشروع

```text
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
- README.ar.md
- README.es.md
- README.fr.md
- README.md
- **scripts**
  - **db**
    - db.check.ts
    - db.compare.ts
    - db.generate.ts
    - db.migrate.ts
    - db.seed.ts
    - db.sync.ts
  - **readme**
    - generateDatabase.ts
    - generateDeps.ts
    - generateScripts.ts
    - generateStructure.ts
    - generateStyles.ts
    - helpers.ts
    - i18n.ts
    - utils.ts
  - readme-generate.ts
- **src**
  - **components**
    - **templates**
      - **docs**
        - MainDoc.astro
        - navigation.ts
        - Sidebar.astro
        - TableOfContents.astro
      - **Footer**
        - Footer.astro
      - **Header**
        - Brand.astro
        - Header.astro
        - LangChooser.astro
        - Navigation.astro
        - ThemeSwitch.astro
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
    - drizzle.ts
    - **loaders**
      - factory.ts
    - **migrations**
      - 0000_loving_blue_blade.sql
      - 0001_famous_tarantula.sql
      - **meta**
        - 0000_snapshot.json
        - 0001_snapshot.json
        - _journal.json
    - **schemas**
      - auth-schema.ts
    - schemas.ts
  - env.d.ts
  - **i18n**
    - ar.json
    - en.json
    - es.json
    - fr.json
  - **layouts**
    - BaseLayout.astro
    - DocLayout.astro
  - **lib**
    - **auth**
      - auth.ts
    - **smtp**
      - smtp.config.ts
      - smtp.errors.ts
      - smtp.send.ts
      - smtp.tests.ts
      - smtp.ts
      - smtp.types.ts
      - smtp.validate.ts
  - **pages**
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
- tsconfig.json
```

### Alias TypeScript (tsconfig.json)

- `@/*` → `src/*`
- `@database/*` → `src/database/*`
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@lib/*` → `src/lib/*`
- `@styles/*` → `src/styles/*`
- `@templates/*` → `src/components/templates/*`
- `@assets/*` → `src/assets/*`
- `@api/*` → `src/pages/api/*`
- `@images/*` → `public/images/*`
- `@smtp/*` → `src/lib/smtp/*`

## المصادقة

تم تكوين Better Auth باستخدام المكونات الإضافية لـ OAuth وإدارة الجلسات والمزيد.

## قاعدة البيانات

- **auth-schema.ts**
  - Table _user_ (const _user_)
    - Champ : _id_ `(text)`
    - Champ : _name_ `(text)`
    - Champ : _pseudo_ `(text)`
    - Champ : _email_ `(text)`
    - Champ : _emailVerified_ `(boolean)`
    - Champ : _image_ `(text)`
    - Champ : _createdAt_ `(timestamp)`
    - Champ : _updatedAt_ `(timestamp)`
  - Table _account_ (const _account_)
    - Champ : _id_ `(text)`
    - Champ : _accountId_ `(text)`
    - Champ : _providerId_ `(text)`
    - Champ : _userId_ `(text)`
  - Table _verification_ (const _verification_)
    - Champ : _id_ `(text)`
    - Champ : _identifier_ `(text)`
    - Champ : _value_ `(text)`
    - Champ : _expiresAt_ `(timestamp)`
    - Champ : _createdAt_ `(timestamp)`
    - Champ : _updatedAt_ `(timestamp)`

## متغيرات البيئة

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

## رموز CSS والأنماط

### رموز CSS

#### Colors

المتغيرات: `244`

```css
--color-primary: #eab308;
--color-secondary: #8b5cf6;
--color-accent: #ec4899;
--color-success: #16a34a;
--color-warning: #f97316;
/* ... 239 متغيرات أخرى */
```

#### Spacing

المتغيرات: `28`

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.25rem;
/* ... 23 متغيرات أخرى */
```

#### Typography

المتغيرات: `26`

```css
--font-family-sans: "Plus Jakarta Sans", "Inter", sans-serif;
--font-family-display: "Space Grotesk", sans-serif;
--font-family-mono: "Space Mono", monospace;
--font-size-base: 1rem;
--line-height-base: 1.5;
/* ... 21 متغيرات أخرى */
```

#### Components

المتغيرات: `78`

```css
--button-padding-y: var(--space-2);
--button-padding-x: var(--space-4);
--button-border-radius: var(--border-radius-md);
--button-border-width: 1px;
--button-bg: var(--button-default-bg);
/* ... 73 متغيرات أخرى */
```

### مكونات الأنماط

سمات الأنماط المتاحة:

- **Initial** (`initial.css`)
- **Modern** (`modern.css`)
- **Retro** (`retro.css`)
- **Futuristic** (`futuristic.css`)

### الأنماط الأساسية

- `base.css`- `global.css`
