export interface SkillItem {
  name: string;
  level: number;
  note?: string;
}

export interface SkillGroup {
  name: string;
  summary: string;
  items: SkillItem[];
}
