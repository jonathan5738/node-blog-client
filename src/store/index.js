import { configureStore } from '@reduxjs/toolkit' 
import { accountReducer } from '../features/accountSlice' 
import { categoryReducer } from '../features/categorySlice'
import { blogGroupReducer } from '../features/blogGroupSlice'
export default configureStore({
    reducer: {
        accounts: accountReducer,
        categories: categoryReducer,
        blogGroups: blogGroupReducer,
    }
})