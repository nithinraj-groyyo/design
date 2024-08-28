import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setIsSubCategoriesLoading, setSubCategories } from '../redux/categoriesSlice';
import { getSubCategoriesResponse } from '../api/categoriesApi'; 

export const useFetchSubCategories = () => {
    const dispatch = useDispatch();

    const fetchSubCategories = useCallback(async (categoryId: number) => {
        dispatch(setIsSubCategoriesLoading(true));
        
        try {
            const response = await getSubCategoriesResponse({ categoryId });

            const fetchedSubCategories = response?.length > 0 ? response?.map((category: any) => ({
                name: category?.name,
                id: category?.id
              })) : [];

            dispatch(setSubCategories(fetchedSubCategories));
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        } finally {
            dispatch(setIsSubCategoriesLoading(false));
        }
    }, [dispatch]);

    return { fetchSubCategories };
};