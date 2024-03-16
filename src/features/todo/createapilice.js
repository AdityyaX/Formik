import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const middleware = (baseQuery, options, fetchFn) => {
  // Your middleware logic goes here
  // You can modify the options or perform additional actions before making the request
  // You can also handle the response or perform actions after receiving the response

  return baseQuery(options, fetchFn);
};

export const todoapi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  middleware, // Add the middleware option here
  endpoints: (builder) => ({
    gettodo: builder.query({
      query: () => '/todos/1',
    }),

    addtodo: builder.mutation({
      query: (task) => ({
        url: "/post",
        method: "POST",
        body: task,
      }),     
    }),
  }),
});

export const { useGettodoQuery, useAddtodoMutation } = todoapi;
