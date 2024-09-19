import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ISubcategory } from '../types/categories';

interface CategoriesState {
  categories: ICategory[];
  subCategories: ISubcategory[];
  isCategoriesLodaing: boolean;
  isSubCategoriesLodaing: boolean;
  activeCategoryTab: { categoryId: number; categoryKey: string }
}

const initialState: CategoriesState = {
  categories: [],
  subCategories: [],
  isCategoriesLodaing: false,
  isSubCategoriesLodaing: false,
  activeCategoryTab: { categoryId: -1, categoryKey: '' }
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },
    setSubCategories(state, action: PayloadAction<ISubcategory[]>) {
      state.subCategories = action.payload;
    },
    setIsCategoriesLoading(state, action: PayloadAction<boolean>) {
      state.isCategoriesLodaing = action.payload;
    },
    setIsSubCategoriesLoading(state, action: PayloadAction<boolean>) {
      state.isSubCategoriesLodaing = action.payload;
    },
    setActiveCategoryTab: (state, action: PayloadAction<{ categoryId: number; categoryKey: string }>) => {
        state.activeCategoryTab = action.payload
    }
  },
});

export const { setCategories, setSubCategories, setIsCategoriesLoading, setIsSubCategoriesLoading, setActiveCategoryTab } = categoriesSlice.actions;

export default categoriesSlice.reducer;
