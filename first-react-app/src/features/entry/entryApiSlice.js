import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const entryAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = entryAdapter.getInitialState()

export const entryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getEntry: builder.query({
            query: () => ({
                url: '/entry',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedEntry = responseData.map(entry => {
                    entry.id = entry._id
                    return entry
                });
                return entryAdapter.setAll(initialState, loadedEntry)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Entry', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Entry', id }))
                    ]
                } else return [{ type: 'Entry', id: 'LIST' }]
            }
        }),


        addNewEntry: builder.mutation({
            query: initialEntry => ({
                url: '/entry',
                method: 'POST',
                body: {
                    ...initialEntry,
                }
            }),
            invalidatesTags: [
                { type: 'Entry', id: "LIST" }
            ]
        }),  
    })
})

export const {
    useGetEntryQuery,
    useAddNewEntryMutation
} = entryApiSlice

//will most likely use this to help create my get all notes mutation since mine will be user specific

// returns the query result object
export const selectEntryResult = entryApiSlice.endpoints.getEntry.select()

// creates memoized selector
const selectEntryData = createSelector(
    selectEntryResult,
    entryResult => entryResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllEntry,
    selectById: selectEntryById,
    selectIds: selectEntryIds
    // Pass in a selector that returns the notes slice of state
} = entryAdapter.getSelectors(state => selectEntryData(state) ?? initialState)