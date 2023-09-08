import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//fetchBaseQuery works like axios, used to make HTTP requests
export const apiSlice = createApi({
    //http request
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    //tag types are used for cached data, when invalidating different caches, I will refer to notes
    //change tag types to fit my website
    //tagTypes: ['Note', 'User'],
    //endpoints will be provided in seperate files
    endpoints: builder => ({})
})