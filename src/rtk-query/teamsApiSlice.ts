import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResponseFormat } from '../types/responseFormat';
import { Team } from '../types/team';
import apiSlice from './apiSlice';

const teamUrl = 'team';

export const teamApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchAllTeamMembers: builder.query<ResponseFormat<Team[]>, void>({
          query: () => ({
            url: `${teamUrl}/list`
          }),
        }),
    
        createTeamMember: builder.mutation<ResponseFormat<Team>, Partial<Team>>({
          query: (teamData) => ({
            url: `${teamUrl}/add`,
            method: 'POST',
            body: teamData,
          }),
          invalidatesTags: ['Team'],
        }),
    
        updateTeamMember: builder.mutation<ResponseFormat<Team>, { id: number; updateData: Partial<Team> }>({
          query: ({ id, updateData }) => ({
            url: `${teamUrl}/${id}/update`,
            method: 'PATCH',
            body: updateData,
          }),
          invalidatesTags: (result, error, { id }) => [{ type: 'Team', id }],
        }),
    
        toggleTeamMemberStatus: builder.mutation<ResponseFormat<Team>, number>({
          query: (id) => ({
            url: `${teamUrl}/${id}/status/toggle`,
            method: 'PATCH',
          }),
          invalidatesTags: (result, error, id) => [{ type: 'Team', id }],
        }),
    
        deleteTeamMember: builder.mutation<ResponseFormat<null>, number>({
          query: (id) => ({
            url: `${teamUrl}/${id}`,
            method: 'DELETE',
          }),
          invalidatesTags: (result, error, id) => [{ type: 'Team', id }],
        }),
      }),
})

export const {
  useFetchAllTeamMembersQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useToggleTeamMemberStatusMutation,
  useDeleteTeamMemberMutation,
} = teamApi;
