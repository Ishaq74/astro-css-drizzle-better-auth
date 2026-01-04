// Configuration de la navigation de documentation
// Cette fonction prend la locale et les traductions pour générer la nav
export const getDocNavConfig = (locale: string, t: any) => [
  {
    title: t.docsSidebar.gettingStarted,
    items: [
      { label: t.docsSidebar.introduction, href: `/${locale}/docs/design` },
    ]
  },
  {
    title: t.docsSidebar.designSystem,
    items: [
      { label: t.docsSidebar.link, href: `/${locale}/docs/design/link` },
      { label: t.docsSidebar.button, href: `/${locale}/docs/design/button` },
      { label: t.docsSidebar.input, href: `/${locale}/docs/design/input` },
      { label: t.docsSidebar.card, href: `/${locale}/docs/design/card` },
      { label: t.docsSidebar.badge, href: `/${locale}/docs/design/badge` },
      { label: t.docsSidebar.alert, href: `/${locale}/docs/design/alert` },
      { label: t.docsSidebar.form, href: `/${locale}/docs/design/form` },
      { label: t.docsSidebar.tabs, href: `/${locale}/docs/design/tabs` },
      { label: t.docsSidebar.code, href: `/${locale}/docs/design/code` },     
      { label: t.docsSidebar.kbd, href: `/${locale}/docs/design/kbd` },
      { label: t.docsSidebar.table, href: `/${locale}/docs/design/table` },
      { label: t.docsSidebar.tooltip, href: `/${locale}/docs/design/tooltip` },
      { label: t.docsSidebar.switch, href: `/${locale}/docs/design/switch` },
      { label: t.docsSidebar.video, href: `/${locale}/docs/design/video` },
      { label: t.docsSidebar.dialog, href: `/${locale}/docs/design/dialog` },
      { label: t.docsSidebar.toast, href: `/${locale}/docs/design/toast` },
      { label: t.docsSidebar.dropdown, href: `/${locale}/docs/design/dropdown` },
    ]
  },
  {
    title: t.docsSidebar.components,
    items: [
      { label: t.docsSidebar.accordion, href: `/${locale}/docs/components/accordion` },
      { label: t.docsSidebar.avatar, href: `/${locale}/docs/components/avatar` },
      { label: t.docsSidebar.breadcrumb, href: `/${locale}/docs/components/breadcrumb` },
      { label: t.docsSidebar.pagination, href: `/${locale}/docs/components/pagination` },
      { label: t.docsSidebar.progressbar, href: `/${locale}/docs/components/progressbar` },
      { label: t.docsSidebar.skeleton, href: `/${locale}/docs/components/skeleton` },
      { label: t.docsSidebar.gallery, href: `/${locale}/docs/components/gallery` },
      { label: t.docsSidebar.timeline, href: `/${locale}/docs/components/timeline` },
    ]
  },
  {
    title: t.docsSidebar.variants,
    items: [
      { label: t.docsSidebar.initial, href: `/${locale}/docs/variants/initial` },
      { label: t.docsSidebar.retro, href: `/${locale}/docs/variants/retro` },
      { label: t.docsSidebar.modern, href: `/${locale}/docs/variants/modern` },
      { label: t.docsSidebar.futuristic, href: `/${locale}/docs/variants/futuristic` },
    ]
  },
  {
  title: t.docsSidebar.layouts,
  items: [
    { label: t.docsSidebar.baseLayout, href: `/${locale}/docs/layouts/base` },
  ]
}
];
