/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const prepareHeaders = (
  headers: any,
  { getState }: { getState: () => any }
) => {
  const token = (getState() as RootState).auth.token;

  if (token) {
    headers.set('authorization', `${token}`);
  }

  return headers;
};
/* const prepareHeaders = (
  headers: any,
  { getState }: { getState: () => any }
) => {
  const token = localStorage.getItem('token');
  if (token) {
    headers.set('authorization', `${token}`);
  }
  return headers;
}; */

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    //baseUrl: 'http://localhost:5000/api/v1',
    baseUrl: 'https://book-store-orpin-seven.vercel.app/api/v1',
    prepareHeaders,
  }),
  tagTypes: [
    'addNewBook',
    'comment',
    'updateBook',
    'deleteBook',
    'wishList',
    'continureList',
    'iscompleted',
  ],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ data }) => ({
        url: `/users/signup`,
        method: 'POST',
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: ({ data }) => ({
        url: `/users/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['updateBook'],
    }),
    addBook: builder.mutation({
      query: ({ data }) => ({
        url: `/books/add-book`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['addNewBook'],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/create-comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comment'],
    }),
    getAllBooks: builder.query({
      query: (searchInfo) => {
        let queryParams = '';

        if (searchInfo?.searchTerm) {
          queryParams += `searchTerm=${searchInfo.searchTerm}`;
        }

        if (searchInfo?.genre) {
          queryParams += `${queryParams ? '&' : ''}genre=${searchInfo.genre}`;
        }

        if (searchInfo?.publicationYear) {
          queryParams += `${queryParams ? '&' : ''}publicationYear=${
            searchInfo.publicationYear
          }`;
        }

        return {
          url: `/books${queryParams ? `?${queryParams}` : ''}`,
        };
      },
      providesTags: ['addNewBook', 'updateBook', 'deleteBook'],
    }),
    getSingleBooks: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: ['comment', 'iscompleted'],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['deleteBook'],
    }),
    addWishList: builder.mutation({
      query: (id) => ({
        url: `/books/add-wish-list/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['wishList'],
    }),
    addRunningList: builder.mutation({
      query: (id) => ({
        url: `/books/add-continue-list/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['continureList'],
    }),
    getList: builder.query({
      query: () => ({
        url: `/books/get-wish-list`,
      }),
      providesTags: ['wishList', 'continureList'],
    }),

    isCompleted: builder.mutation({
      query: (id) => ({
        url: `/books/completed/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['iscompleted'],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useSignInMutation,
  useLogoutMutation,
  useGetAllBooksQuery,
  useGetSingleBooksQuery,
  useAddBookMutation,
  usePostCommentMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useAddWishListMutation,
  useAddRunningListMutation,
  useGetListQuery,
  useIsCompletedMutation,
} = api;
