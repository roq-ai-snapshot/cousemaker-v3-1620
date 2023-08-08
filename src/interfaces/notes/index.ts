import { GetQueryInterface } from 'interfaces';

export interface NotesInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  title: string;
  content: string;

  _count?: {};
}

export interface NotesGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  content?: string;
}
