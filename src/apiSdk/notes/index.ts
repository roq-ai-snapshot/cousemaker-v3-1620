import axios from 'axios';
import queryString from 'query-string';
import { NotesInterface, NotesGetQueryInterface } from 'interfaces/notes';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getNotes = async (query?: NotesGetQueryInterface): Promise<PaginatedInterface<NotesInterface>> => {
  const response = await axios.get('/api/notes', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createNotes = async (notes: NotesInterface) => {
  const response = await axios.post('/api/notes', notes);
  return response.data;
};

export const updateNotesById = async (id: string, notes: NotesInterface) => {
  const response = await axios.put(`/api/notes/${id}`, notes);
  return response.data;
};

export const getNotesById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/notes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteNotesById = async (id: string) => {
  const response = await axios.delete(`/api/notes/${id}`);
  return response.data;
};
