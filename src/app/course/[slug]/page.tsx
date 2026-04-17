import { notFound } from 'next/navigation';
import { modules, findModule } from '@/lib/modules-data';
import { findContent } from '@/lib/module-content';
import ModuleView from './ModuleView';

export function generateStaticParams() {
  return modules.map((m) => ({ slug: m.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mod = findModule(slug);
  if (!mod) notFound();
  const content = findContent(mod.number);
  if (!content) notFound();

  const prev = modules.find((m) => m.number === mod.number - 1);
  const next = modules.find((m) => m.number === mod.number + 1);

  return <ModuleView mod={mod} content={content} prev={prev} next={next} />;
}
