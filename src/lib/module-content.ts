import { getModule1Content, getModule2Content, getModule3Content } from './module-content-1-3';
import { getModule4Content, getModule5Content, getModule6Content } from './module-content-4-6';
import { getModule7Content, getModule8Content, getModule9Content } from './module-content-7-9';

export interface ModuleContent {
  lead: string;
  html: string;
  image1: string;
  image1Caption: string;
  image2: string;
  image2Caption: string;
  videos: { id: string; title: string }[];
  actionStep: string;
}

const contentGetters: Record<number, () => ModuleContent> = {
  1: getModule1Content,
  2: getModule2Content,
  3: getModule3Content,
  4: getModule4Content,
  5: getModule5Content,
  6: getModule6Content,
  7: getModule7Content,
  8: getModule8Content,
  9: getModule9Content,
};

export function getModuleContent(moduleNumber: number): ModuleContent | null {
  const getter = contentGetters[moduleNumber];
  if (!getter) return null;
  return getter();
}
