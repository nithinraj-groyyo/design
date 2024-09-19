import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCategories, setIsCategoriesLoading } from '../redux/categoriesSlice';
import { getCategoriesResponse } from '../api/categoriesApi';

const useFetchCategories = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCategories = async () => {
            dispatch(setIsCategoriesLoading(true));
            try {
                const response = await getCategoriesResponse();
                const categoriesResponse = response?.map((category: any) => ({
                    id: category?.id,
                    label: category?.name?.toUpperCase(),
                    key: category?.name?.toLowerCase(),
                }));
                dispatch(setCategories(categoriesResponse));
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                dispatch(setIsCategoriesLoading(false));
            }
        };

        fetchCategories();
    }, [dispatch]);
};

export default useFetchCategories;