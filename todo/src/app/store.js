import { configureStore} from '@reduxjs/toolkit';
import appReducer from '../pages/AppSlice';

export const store = configureStore({
  reducer: {
    app: appReducer
  },
  middleware:getDefaultMiddleware => 
    getDefaultMiddleware({
      serializableCheck:false
    }),
});


