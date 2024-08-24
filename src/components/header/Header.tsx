import React, { useRef, useState, useEffect } from 'react';
import MenuIcon from '../../assets/svg/home/MenuIcon';
import HeaderIcons from './HeaderIcons';
import HeaderLogo from './HeaderLogo';
import MenuDrawer from './MenuDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setActiveCategoryTab, setCategories, setIsCategoriesLoading, setIsSubCategoriesLoading, setSubCategories } from '../../redux/categoriesSlice';
import { useFetchSubCategories } from '../../hooks/useFetchCategories';
import MenuTabs from './MenuTabs';
import SubCategoriesList from './SubCategoriesList';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const modalRef = useRef<HTMLDivElement | null>(null);
    const [menuListOpen, setMenuListOpen] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    
    const isInitialLoad = useRef(true);

    const { activeCategoryTab } = useSelector((state: RootState) => state.categories);

    const { fetchSubCategories } = useFetchSubCategories();

    useEffect(() => {
        if (isInitialLoad.current) {
            dispatch(setIsCategoriesLoading(true));        
            setTimeout(() => {            
                const fetchedCategories = [
                    { key: 'men', label: 'Men', id: 1 },
                    { key: 'women', label: 'Women', id: 2 },
                    { key: 'kids', label: 'Kids', id: 3 },
                ];
                dispatch(setCategories(fetchedCategories));
                dispatch(setIsCategoriesLoading(false));
                isInitialLoad.current = false;
            }, 1000);
        }
    }, [dispatch]);


    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            dispatch(setActiveCategoryTab({ categoryId: -1, categoryKey: '' }));
            setMenuListOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleTabChange = (event: React.SyntheticEvent | any, categoryId: number | undefined, categoryKey: string | undefined) => {
        dispatch(setActiveCategoryTab({ categoryId: categoryId || -1, categoryKey: categoryKey || "" }));
        fetchSubCategories(categoryId || -1);
        setMenuListOpen(true);
    };

    const navigateToProducts = () => {
        navigate(`/designs/${activeCategoryTab?.categoryKey}/${activeCategoryTab?.categoryId}`)
        setMenuListOpen(false)
        dispatch(setActiveCategoryTab({ categoryId: -1, categoryKey: '' }));
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
        setMenuListOpen(false);
    }

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        dispatch(setActiveCategoryTab({ categoryId: -1, categoryKey: '' }));
        setMenuListOpen(false);
    };

    return (
        <header className="fixed flex flex-row w-full justify-between px-[3.75rem] py-[1rem] items-center h-[10rem] z-30">
            <div className='flex items-center space-x-4'>
                <div onClick={handleDrawerOpen} className='cursor-pointer'>
                    <MenuIcon />
                </div>
                <div className='xxs:hidden lg:flex flex-col relative min-w-[30rem]' ref={modalRef}>
                    <div className={`absolute p-2 top-[-4rem] ${menuListOpen ? 'bg-white border border-[#646463] rounded-md' : ''}`}>
                        <HeaderLogo />
                        <MenuTabs
                            onTabChange={handleTabChange}
                        />
                        {(activeCategoryTab?.categoryId !== -1 && menuListOpen) && (
                            <SubCategoriesList
                                onItemClick={navigateToProducts}
                            />
                        )}
                    </div>
                </div>
            </div>
            <nav className="flex items-center">
                <HeaderIcons />
            </nav>
            <MenuDrawer
                open={drawerOpen}
                onClose={handleDrawerClose}
                onTabChange={handleTabChange}
            />
        </header>
    );
};

export default Header;