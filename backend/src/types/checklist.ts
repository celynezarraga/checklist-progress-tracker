export type Checklist = {
  id?: string,
  title: string,
  description: string,
  completed?: boolean,
  subitem_count?: number,
  completed_subitems?: number,
  created_at?: string,
  created_by?: string,
};

export type ChecklistSubitemCounter = {
  subitem_count?: number,
  completed_subitems?: number,
};