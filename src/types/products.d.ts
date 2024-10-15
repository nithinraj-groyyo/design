import { ProductViewEnum } from "../utilities/enum.ts"

export type IProductView = ProductViewEnum.LARGE | ProductViewEnum.MEDIUM | ProductViewEnum.SMALL;


export interface IProductImage {
    id: number;
    productId: number;
    fileName: string;
    filePath: string;
    side: string;
}

export interface IProductSize {
    id: number;
    productId: number;
    sizeName: string;
}

export interface IProductPricing {
    id: number;
    MinQuantity: number;
    MaxQuantity: number;
    Price: string;
    productId: number;
}

export interface IProductCategory {
    id: number;
    parentId: number | null;
    name: string;
    description: string;
    type: string;
    imagePath: string | null;
    isDelete: boolean;
    createdDate: string;
    createdBy: string;
    modifiedDate: string | null;
    modifiedBy: string | null;
}

export interface IProductColours {
    id: number,
    ProductId: number,
    Color: string,
    isAvailable: boolean
}
export interface IProductResponse {
    id: number;
    categoryId: number;
    name: string;
    OtherCategoryId: number;
    StyleName: string;
    ImageFolderLink: string | null;
    CoverImageLink: string;
    description: string;
    price: string;
    isDelete: boolean;
    status: boolean;
    leftTopHeader: string;
    leftTopContent: string;
    leftBottomHeader: string;
    leftBottomContent: string;
    createdDate: string;
    createdBy: string;
    modifiedDate: string;
    modifiedBy: string;
    ProductImages: IProductImage[];
    ProductColours: IProductColours[]
    productSizes: IProductSize[];
    ProductPricings: IProductPricing[];
    WishLists: any[];
    Category: IProductCategory;
}

export interface IWishlistItem {
    id: number;
    userId: number;
    productId: number;
    createdDate: string;
    Product: IProductResponse;
}

export interface IWishlistResponse {
    wishlist: IWishlistItem[];
}

export interface UpdateProductDTO {
    name?: string;
    description?: string;
    styleName?: string;
    categoryId?: number;
    subCategoryId?: number;
    productColorIds?: number[];
    productSizeIds?: number[];
    productPrices?: Array<{
        minQty: number;
        maxQty: number | null;
        pricePerPiece: number;
    }>;
    productImages?: Array<{
        fileId: number;
        sideName: string;
        isThumbnail: boolean;
    }> | undefined;
}



export interface INewProductSize {
    id: number;
    name: string;
}

export interface INewProductPrice {
    id: number;
    minQty: number;
    maxQty: number;
    pricePerPiece: number;
}

export interface INewProductImage {
    id: number;
    sideName: string;
    isThumbnail: boolean;
    fileId: number;
    fileName: string;
    imageUrl: string;
    signedUrl: string;
}

export interface IProduct {
    id: number;
    name: string;
    styleName: string;
    category: number;
    subCategory: number;
    description: string;
    productSizeIds: number[];
    productColors: number[];
    productPrices: INewProductPrice[];
    productImages: INewProductImage[];
    isPublic: boolean;
    sizes: INewProductSize[];
    leftTopHeader: string;
    leftTopContent: string;
    leftBottomHeader: string;
    leftBottomContent: string;
}