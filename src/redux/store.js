import { configureStore,combineReducers } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession  from 'redux-persist/lib/storage/session';
import logger from "redux-logger"
import commonReducers from "./_commonReducers/common.reducers";
import persistedLocalStorageReducer from "./_commonReducers/persistedLocalStorage.reducers";
import persistedSessionStorageReducer from "./_commonReducers/persistedSessionStorage.reducers";


const persistLocalStorageConfig = {
    key: 'WQwR4bwinKLS',
    storage:storage,
}

const persistSessionStorageConfig = {
    key: 'WQwR4bwinKSS',
    storage:storageSession,
}

const rootReducer = combineReducers({
    localStorageReducer:persistReducer(persistLocalStorageConfig,persistedLocalStorageReducer),
    sessionStorageReducer:persistReducer(persistSessionStorageConfig,persistedSessionStorageReducer),
    commonReducers
}) 

export const reduxStore = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger),
    devTools:process.env.NODE_ENV !== "production"
})

export const persistor = persistStore(reduxStore)
