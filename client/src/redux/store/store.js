import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import loginReducer from "../reducers/loginReducer";

const persistConfig = {
  key: "login", // Key for the root of the state in storage
  storage,
};

const middlewares = [thunk];

const persistedReducer = persistReducer(persistConfig, loginReducer);

const reducers = combineReducers({
  persistData: persistedReducer,
  nonPersist: rootReducer,
});

const store = createStore(reducers, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { persistor, store };
