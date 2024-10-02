export interface ICategory {
    id: number;
    label: string;
    key: string;
}

export interface ISubcategory {
    id: number;
    name: string;
}

export interface ICategoryWithSubcategories extends ICategory {
    subcategories: ISubcategory[];
}