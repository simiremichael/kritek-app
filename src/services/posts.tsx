import { PositionsProps } from '@mui/system'
import { Id } from '@reduxjs/toolkit/dist/query/tsHelpers'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Posts {
  id: number,
  title: string
  category: string
  price: string
  description: string
  image: string
}

const appUrl = process.env.REACT_APP_POST_URL
export const postsApi = createApi({

  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: appUrl,
}),
refetchOnFocus: true,
tagTypes: ['Posts'],
  endpoints: (builder) => ({
    getPosts: builder.query<Posts[], void>({
      query: ()  => '/posts',
     // transformResponse:  response => response.sort{(a:any, b:any) => b.id - a.id},
        providesTags: (result) => result ? [...result.map(({ id }) => ({ type: 'Posts' as const, id })),
                { type: 'Posts', id: 'LIST' },
              ] : [{ type: 'Posts', id: 'LIST' }],
    }),
       getPost: builder.query<Posts, any>({
          query: (id) => `/posts/${id}`,
         // transformResponse: (response: { data: Posts }, meta, arg) => response.data,
          providesTags: (result, error, id: any) =>  [{ type:'Posts', id }],  
        }),

     addPost: builder.mutation<Posts, Partial<Posts>>({
      query(body) {
        return {
        url: '/posts',
        method: 'POST',
        body,
      }
       },
        invalidatesTags: [{type: 'Posts', id: 'LIST'}],
     }),

     updatePost: builder.mutation<Posts, Partial<Posts>>({
        query(data) {
          const { id, ...body} = data;
          return {
          url: `/posts/${id}`,
          method: 'PATCH',
          body,  
          }
         },
         async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            postsApi.util.updateQueryData('getPost', id, (draft) => {
              Object.assign(draft, patch)
            })
          )
          try {
            await queryFulfilled
          } catch {
            patchResult.undo()
          }
        },
         invalidatesTags:  (result, error, {id}) => [{ type: 'Posts', id: 'LIST'  }],
       }),

       deletePost: builder.mutation<{ success: boolean; id: number }, number>({
        query(id) {
          return {
            url: `posts/${id}`,
            method: 'DELETE',
          }
        },
       invalidatesTags: (result, error, id) => [{ type: 'Posts', id: 'LIST' }],
         }),
       }),
})

export const { 
    useGetPostsQuery,
    useGetPostQuery, 
    useAddPostMutation, 
    useUpdatePostMutation,
    useDeletePostMutation,
 } = postsApi