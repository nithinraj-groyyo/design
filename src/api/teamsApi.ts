import axios from 'axios';
import { ResponseFormat } from '../types/responseFormat';
import { Team } from '../types/team';

const BASE_URL = process.env.REACT_APP_NEW_SERVICE_API + 'team';

export const fetchAllTeamMembers = async (): Promise<ResponseFormat<Team[]>> => {
  const response = await axios.get<ResponseFormat<Team[]>>(`${BASE_URL}/list`);
  return response.data;
};

export const createTeamMember = async (teamData: Partial<Team>): Promise<ResponseFormat<Team>> => {
  const response = await axios.post<ResponseFormat<Team>>(`${BASE_URL}/add`, teamData);
  return response.data;
};

export const updateTeamMember = async (id: number, updateData: Partial<Team>): Promise<ResponseFormat<Team>> => {
  const response = await axios.patch<ResponseFormat<Team>>(`${BASE_URL}/${id}/update`, updateData);
  return response.data;
};

export const toggleTeamMemberStatus = async (id: number): Promise<ResponseFormat<Team>> => {
  const response = await axios.patch<ResponseFormat<Team>>(`${BASE_URL}/${id}/status/toggle`);
  return response.data;
};

export const deleteTeamMember = async (id: number): Promise<ResponseFormat<null>> => {
  const response = await axios.delete<ResponseFormat<null>>(`${BASE_URL}/${id}`);
  return response.data;
};