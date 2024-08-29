import React, { useRef, useState, useEffect } from 'react';
import MenuIcon from '../../assets/svg/home/MenuIcon';
import HeaderIcons from './HeaderIcons';
import HeaderLogo from './HeaderLogo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setActiveCategoryTab } from '../../redux/categoriesSlice';
import { useFetchSubCategories } from '../../hooks/useFetchSubCategories';
import MenuTabs from './MenuTabs';
import SubCategoriesList from './SubCategoriesList';
import { useNavigate } from 'react-router-dom';
import useFetchCategories from '../../hooks/useFetchCategories';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [menuListOpen, setMenuListOpen] = useState<boolean>(false);
    
    useFetchCategories();
    
    const { activeCategoryTab } = useSelector((state: RootState) => state.categories);
    const { fetchSubCategories } = useFetchSubCategories();
    

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

    const handleTabChange = (event: React.SyntheticEvent, categoryId: number | undefined, categoryKey: string | undefined) => {
        dispatch(setActiveCategoryTab({ categoryId: categoryId || -1, categoryKey: categoryKey || "" }));
        fetchSubCategories(categoryId || -1);
        setMenuListOpen(true);
    };

    const navigateToProducts = () => {
        if (activeCategoryTab.categoryKey && activeCategoryTab.categoryId) {
            navigate(`/designs/${activeCategoryTab.categoryKey}/${activeCategoryTab.categoryId}`);
            setMenuListOpen(false);
            dispatch(setActiveCategoryTab({ categoryId: -1, categoryKey: '' }));
        }
    };




    return (
        <header className={`fixed flex flex-row w-full justify-between px-[3.75rem] py-[1rem] items-center h-[10rem] z-30`}>
            <div className='flex items-center space-x-4'>
                <div className='cursor-pointer'>
                    <MenuIcon />
                </div>
                <div className='xxs:hidden lg:flex flex-col relative min-w-[30rem]' ref={modalRef}>
                    <div className={`absolute p-2 top-[-4rem] ${menuListOpen ? 'bg-white border border-[#646463] rounded-md' : ''}`}>
                        <HeaderLogo />
                        <MenuTabs onTabChange={handleTabChange} />
                        {(activeCategoryTab.categoryId !== -1 && menuListOpen) && (
                            <SubCategoriesList onItemClick={navigateToProducts} />
                        )}
                    </div>
                </div>
            </div>
            <nav className="flex items-center">
                <HeaderIcons />
            </nav>
            
        </header>
    );
};

export default Header;