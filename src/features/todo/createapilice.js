import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const middleware = (baseQuery, options, fetchFn) => {


  return baseQuery(options, fetchFn);
};

export const todoapi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  middleware, 
  endpoints: (builder) => ({
    gettodo: builder.query({
      query: () => '/todos',
    }),

    addtodo: builder.mutation({
      query: (task) => ({
        url: "/todos",
        method: "POST",
        body: task,
      }),   
    }),

    deletetodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
    }),

    updateodo: builder.mutation({
      query: (id, task) => ({
        url: `/todos?id=${id}`,
        method: "PUT",
        body: task,
      }),
    }),
  }),
});

export const { useGettodoQuery, useAddtodoMutation,useDeletetodoMutation,useUpdateodoMutation} = todoapi;
