import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const persistConfig = {
  key: "login", // Key for the root of the state in storage
  storage,
  blacklist: ["adminTimeSheet"],
};

const middlewares = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const reducers = combineReducers({
  persistData: persistedReducer,
});

const store = createStore(reducers, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { persistor, store };
