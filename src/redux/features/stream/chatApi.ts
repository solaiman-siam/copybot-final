import { baseApi } from "../../api/baseApi";



const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    chat: builder.mutation({
        query: (chatText) => ({
            url: 'ai/message/send',
            method: 'POST',
            body: chatText
        }),
        invalidatesTags: ['chatList' , 'freeLimit'],
        extraOptions: {requireAuth: true}
    }),
    chatList: builder.query({
        query: () => ({
            url: '/chat/list',
            method: 'GET',
        }),
        providesTags: ['chatList'],
        extraOptions: {requireAuth: true}
    }),
    deleteChat: builder.mutation({
        query: (chatId) => ({
            url: `chat/${chatId}/delete`,
            method: 'DELETE',
        }),
        invalidatesTags: ['chatList'],
        extraOptions: {requireAuth: true}
    }),
    history: builder.query({
        query: (chatId) => ({
            url: `chat/${chatId}/history`,
            method: 'GET',
        }),
        extraOptions: {requireAuth: true}
    }),
  }),
})


export const {useChatMutation, useChatListQuery, useDeleteChatMutation, useLazyHistoryQuery} = chatApi

