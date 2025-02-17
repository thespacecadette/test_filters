import { combineReducers, configureStore } from '@reduxjs/toolkit';

// reducers
import { FilterStore } from './filters/initialState';
import filterReducer from './filters/slice';

// persistence
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export interface Store {
	filters: FilterStore;
}

const reducers = combineReducers({
	filters: filterReducer,
});
const persistConfig = {
	key: 'root',
	storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
