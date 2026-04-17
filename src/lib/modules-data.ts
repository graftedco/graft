export interface ModuleData {
  number: number;
  slug: string;
  title: string;
  description: string;
  videos: { id: string; title: string }[];
}

export const modules: ModuleData[] = [
  {
    number: 1,
    slug: 'module-1',
    title: 'The Ecommerce Opportunity',
    description: 'Why 2026 is the greatest time in history to build a store — and the exact model that wins today.',
    videos: [
      { id: 'OOePNHykWuw', title: 'Why 2026 Is The Moment' },
      { id: 'WYMpRB3uXmY', title: 'Dropshipping vs Every Other Model' },
    ],
  },
  {
    number: 2,
    slug: 'module-2',
    title: 'Setting Up Your Shopify Store And Finding Your Winning Product',
    description: 'Every single click of your store setup, then the 5 rules and 3 step research that finds winning products.',
    videos: [
      { id: '1c0TKrP5M_g', title: 'Shopify Store Setup — Every Click' },
      { id: 'kMHetTEMkFw', title: 'Finding Winning Products' },
    ],
  },
  {
    number: 3,
    slug: 'module-3',
    title: 'Viral Products DSers And Importing',
    description: 'The best niches of 2026, and how to import and price any product in minutes using DSers.',
    videos: [
      { id: '8jiujZ_CKOc', title: 'Viral Products And Best Niches' },
      { id: 'NuSQJJqVAaM', title: 'DSers Importing And Pricing' },
    ],
  },
  {
    number: 4,
    slug: 'module-4',
    title: 'AI Tools Store Builders And Tidio',
    description: 'The complete AI stack — ChatGPT, Claude, Shopify Sidekick, and the best AI store builders for every store size.',
    videos: [
      { id: 'SsY6MtO_Rcc', title: 'AI Tools For Every Store Task' },
      { id: 'R5GcBfmRigk', title: 'AI Store Builders Compared' },
    ],
  },
  {
    number: 5,
    slug: 'module-5',
    title: 'Ali Reviews Store Pages And Branding',
    description: 'Import hundreds of reviews, build the 5 pages every store needs, and wire up menus and trust badges.',
    videos: [
      { id: 'aW670CBpZyo', title: 'Ali Reviews Setup' },
      { id: 'GKhED001gkE', title: 'Store Pages And Branding' },
    ],
  },
  {
    number: 6,
    slug: 'module-6',
    title: 'Mindset And The 90 Day Plan',
    description: 'Why most people quit, the moments you will nearly quit, and the exact 90 day week by week plan.',
    videos: [
      { id: 'k4iKjpTCXgc', title: 'The Mindset That Wins' },
      { id: 'v86hzWiQnCk', title: 'The 90 Day Plan' },
    ],
  },
  {
    number: 7,
    slug: 'module-7',
    title: 'Getting Your First Sales Free',
    description: 'TikTok organic strategy and 5 free video methods that produce sales with zero ad spend.',
    videos: [
      { id: 'N4Xp9cL73BY', title: 'TikTok Organic Strategy' },
      { id: '9MZuFSpxtfY', title: '5 Free Video Methods' },
    ],
  },
  {
    number: 8,
    slug: 'module-8',
    title: 'Running Paid Ads',
    description: 'TikTok Ads from zero, and how to read the 3 metrics that decide whether to pause, fix or scale.',
    videos: [
      { id: 'LvJwTXksf6k', title: 'Launching Your First TikTok Ad' },
      { id: 'pkAlbdFXZSc', title: 'Reading Results And Scaling' },
    ],
  },
  {
    number: 9,
    slug: 'module-9',
    title: 'Automating And Scaling',
    description: 'Automate your whole store with DSers, Tidio and a VA — then plan your second store and long term vision.',
    videos: [
      { id: 'vXVrCyLl-Tg', title: 'Automating Your Store' },
      { id: 'NAa1focAX5E', title: 'Scaling And Second Stores' },
    ],
  },
];

export function findModule(slug: string): ModuleData | undefined {
  return modules.find((m) => m.slug === slug || String(m.number) === slug);
}
