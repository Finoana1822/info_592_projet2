export type DocumentType = {
  id: number;
  name: string;
  path: string;
  user_id: number;
  parent_id: number |null;
  type: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}