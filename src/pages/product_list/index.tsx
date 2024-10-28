import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import ProductFilter from "./ProductFilter";
import ProductGrid from "./ProductGrid";
import { ProductViewEnum } from "../../utilities/enum";
import { IProduct, IProductView } from "../../types/products";
import ProductLargeView from "./ProductLargeView";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useLazyFetchProductsQuery } from "../../rtk-query/productApiSlice";

const ProductList: React.FC = () => {
  const [currentView, setCurrentView] = useState(ProductViewEnum.LARGE);
  const [opacity, setOpacity] = useState(1);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const location = useLocation();
  const { categoryId, subCategoryId } = location?.state;

  const [fetchProducts, { data, isLoading }] = useLazyFetchProductsQuery();
  const [products, setProducts] = useState<IProduct[] | undefined>();

  useEffect(() => {
    if (subCategoryId) {
      fetchProducts({
        page: 1,
        limit: 20,
        isProductActive: true,
        categoryId,
        subCategoryId,
      });
    } else if (categoryId) {
      fetchProducts({
        page: 1,
        limit: 20,
        isProductActive: true,
        categoryId,
      });
    }
  }, [categoryId, subCategoryId]);


  useEffect(() => {
    if (data?.data) {
      setProducts(data?.data)
    }
  }, [data])

  const handleFilterChange = (size: IProductView) => {
    setCurrentView(size);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const isScrollingDown = scrollTop > lastScrollTop;

      if (isScrollingDown) {
        const newOpacity = 1 - Math.min(scrollTop / 300, 1);
        setOpacity(newOpacity);
      } else if (!isScrollingDown && opacity < 1) {
        const newOpacity = opacity + 0.05;
        setOpacity(Math.min(newOpacity, 1));
      }

      if (scrollTop + clientHeight >= scrollHeight && !isScrollingDown) {
        setOpacity(1);
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, opacity]);

  return (
    <BasicLayout>
      <div className="mt-[6rem] lg:mt-[10rem] fixed w-full" style={{ opacity }}>
        <ProductFilter currentView={currentView} onFilterChange={handleFilterChange} />
      </div>

      <div className="">
        {currentView === ProductViewEnum.LARGE ? <ProductLargeView products={products!} /> : <ProductGrid products={products!} currentView={currentView} />}
      </div>
    </BasicLayout>
  );
};

export default ProductList;
