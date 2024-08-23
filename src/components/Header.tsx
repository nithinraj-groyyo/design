import React, { useRef, useState, useEffect } from 'react';
import MenuIcon from '../assets/svg/MenuIcon';
import HeaderIcons from './HeaderIcons';
import MenuTabs from './MenuTabs';
import HeaderLogo from './HeaderLogo';
import SubCategoriesList from './SubCategoriesList';
import MenuDrawer from './MenuDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setActiveCategoryTab, setCategories, setIsCategoriesLodaing, setIsSubCategoriesLoading, setSubCategories } from '../redux/categoriesSlice';
import { useFetchSubCategories } from '../hooks/useFetchCategories';

const Header: React.FC = () => {
    const dispatch = useDispatch();

    const modalRef = useRef<HTMLDivElement | null>(null);
    const [menuListOpen, setMenuListOpen] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    const { activeCategoryTab } = useSelector((state: RootState) => state.categories);

    const { fetchSubCategories } = useFetchSubCategories();

    useEffect(() => {
        dispatch(setIsCategoriesLodaing(true));        
        setTimeout(() => {            
            const fetchedCategories = [
                { key: 'tab1', label: 'Tab 1', id: 1 },
                { key: 'tab2', label: 'Tab 2', id: 2 },
                { key: 'tab3', label: 'Tab 3', id: 3 },
            ];
            dispatch(setCategories(fetchedCategories));
            dispatch(setIsCategoriesLodaing(false));
        }, 1000);
    },[])

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


    const handleTabChange = (event: React.SyntheticEvent | any, categoryId: number | undefined) => {
        dispatch(setActiveCategoryTab({ categoryId: categoryId || -1, categoryKey: event.currentTarget.id }));
        fetchSubCategories(categoryId || -1);
        setMenuListOpen(true);
    };

    const navigateToProducts = () => {
        console.log('Navigating to products page...');
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
                        {activeCategoryTab?.categoryId !== -1 && (
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