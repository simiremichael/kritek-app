import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { postsApi } from '../services/posts';
import  postReducer  from './counter/postSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';




export const store = configureStore({
  reducer: {
  
    [postsApi.reducerPath]: postsApi.reducer,
    postState: postReducer,
  
  },
 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(postsApi.middleware),
    
});



setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
//export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
