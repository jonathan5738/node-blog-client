import { configureStore } from '@reduxjs/toolkit' 
import { accountReducer } from '../features/accountSlice' 
import { categoryReducer } from '../features/categorySlice'
import { blogGroupReducer } from '../features/blogGroupSlice'
import { joinedGroupReducer } from '../features/joinedGroupSlice'
import { postReducer } from '../features/postSlice'
import { relatedPostReducer } from '../features/relatedPostSlice'
import { commentReducer } from '../features/commentSlice'
import { numberPostReducer } from '../features/numberPostSlice'
import { numberBlogGroupReducer } from '../features/numberBlogGroupSlice'

export default configureStore({
    reducer: {
        accounts: accountReducer,
        categories: categoryReducer,
        blogGroups: blogGroupReducer,
        joinedGroups: joinedGroupReducer,
        posts: postReducer,
        relatedPosts: relatedPostReducer,
        comments: commentReducer,
        postCount: numberPostReducer,
        blogGroupCount: numberBlogGroupReducer
    }
})