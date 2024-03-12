import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import { persistReducer , persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const rootReducer = combineReducers({
  auth: authSlice
})
const persistConfig = {
  key: 'auth',
  storage,
  version : 1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer ,
  middleware : (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck : false
    })
  },

});

export const persistor = persistStore(store);