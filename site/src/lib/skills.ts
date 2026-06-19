import data from "../../data/skills.generated.json";

export type Target = "claude" | "codex" | "project";

export type Skill = {
  name: string;
  description: string;
  category: string;
  legacy: boolean;
  target: Target;
  command: string;
};

export type Agent = {
  name: string;
  description: string;
  command: string;
};

export type CatalogData = {
  repo: string;
  counts: { skills: number; agents: number };
  categories: string[];
  skills: Skill[];
  agents: Agent[];
};

export const catalog = data as CatalogData;
