import { useDispatch } from 'react-redux';
import { useState, useCallback } from 'react';
import { setIsSubCategoriesLoading, setSubCategories } from '../redux/categoriesSlice';

export const useFetchSubCategories = () => {
    const dispatch = useDispatch();

    const fetchSubCategories = useCallback(async (categoryId: number) => {
        dispatch(setIsSubCategoriesLoading(true));
        
        setTimeout(() => {
            const fetchedSubCategories = [
                { id: 1, name: `Subcategory 1 of Tab ${categoryId}` },
                { id: 2, name: `Subcategory 2 of Tab ${categoryId}` },
                { id: 3, name: `Subcategory 3 of Tab ${categoryId}` },
            ];
            dispatch(setSubCategories(fetchedSubCategories));
            dispatch(setIsSubCategoriesLoading(false));
        }, 1000);
    }, [dispatch]);

    return { fetchSubCategories };
};