import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../features/categorySlice'
import '../css/Landing/ListCategory.css'

function ListCategory() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories.data)
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  return (
    <div className='list-categories'>
    {categories.length > 0 && (
        <div className='category-container-flex'>
           {categories?.map(category => {
             return (
                <a href={`/blogs/all?category_name=${category?.name}`} className="category-link" key={category._id}>{category?.name}</a>
             )
           })}
        </div>
    )}
    </div>
  )
}

export default ListCategory