export enum CHECKLIST_TYPE {
  MAIN,
  SUB
};

export type Checklist = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  created_at: Date,
  created_by: string,
  subitem_count: number,
  completed_subitems: number,
  subItems?: ChecklistSubitem[],
  parent_id?: string,
};

export type ChecklistApiResponse = Checklist[];

interface ChecklistApiRequest {
  token: string;
}

export type ChecklistFormData = {
  title: string;
  description: string;
  parent_id?: string;
}

export type ChecklistCreateApiRequest = ChecklistApiRequest & ChecklistFormData;

export type ChecklistSubItemCreateApiRequest = ChecklistCreateApiRequest & {
  parent_id: string;
};

export type ChecklistUpdateApiRequest = ChecklistApiRequest & ItemViewType & {
  isToggleCompleted?: boolean;
};

export type ChecklistDeleteApiRequest = ChecklistApiRequest & {
  id: string;
  parent_id?: string;
};

export type ChecklistApiGetRequest =  ChecklistApiRequest;

export type ChecklistApiGetSubitemsRequest =  ChecklistApiGetRequest & {
  parentId: string;
};

export type ChecklistSubitem = {
  id: string,
  title: string,
  description: string,
  completed: boolean,
  created_at: Date,
  created_by: string,
  parent_id: string;
}

export type ItemViewType = {
  id?: string,
  title: string,
  description: string,
  completed?: boolean,
  created_at?: Date,
  created_by?: string,
  subitem_count?: number,
  completed_subitems?: number,
  subItems?: ChecklistSubitem[];
  parent_id?: string;
  isToggleCompleted?: boolean;
};