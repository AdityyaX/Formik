import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Update the import path
import { Todo } from '../../models/modeltodo';

export const todoapi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        gettodo: builder.query<Todo,String>({
            query: () => '/crud',
          }),
    }),
});

export const { useGettodoQuery } = todoapi;
