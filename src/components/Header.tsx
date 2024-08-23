import React, { useRef, useState, useEffect } from 'react';
import MenuIcon from '../assets/svg/MenuIcon';
import HeaderIcons from './HeaderIcons';
import MenuTabs from './MenuTabs';
import HeaderLogo from './HeaderLogo';
import SubCategoriesList from './SubCategoriesList';
import MenuDrawer from './MenuDrawer';

const tabsData = [
    { key: 'tab1', label: 'Tab 1', id: 1 },
    { key: 'tab2', label: 'Tab 2', id: 2 },
    { key: 'tab3', label: 'Tab 3', id: 3 },
];

const Header: React.FC = () => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [selectedTab, setSelectedTab] = useState<{ categoryId: number; categoryKey: string }>({ categoryId: -1, categoryKey: '' });
    const [isSubCategoryLoading, setIsSubCategoryLoading] = useState(false);
    const [subCategories, setSubCategories] = useState<{ id: number, name: string }[]>([]);
    const [menuListOpen, setMenuListOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setSelectedTab({ categoryId: -1, categoryKey: '' });
            setMenuListOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchSubCategories = async (categoryId: number) => {
        setIsSubCategoryLoading(true);        
        setTimeout(() => {            
            const fetchedSubCategories = [
                { id: 1, name: `Subcategory 1 of Tab ${categoryId}` },
                { id: 2, name: `Subcategory 2 of Tab ${categoryId}` },
                { id: 3, name: `Subcategory 3 of Tab ${categoryId}` },
            ];
            setSubCategories(fetchedSubCategories);
            setIsSubCategoryLoading(false);
        }, 1000);
    };

    const handleTabChange = (event: React.SyntheticEvent | any, categoryId: number | undefined) => {
        setSelectedTab({ categoryId: categoryId || -1, categoryKey: event.currentTarget.id });
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
        setSelectedTab({ categoryId: -1, categoryKey: '' });
        setMenuListOpen(false);
    };

    return (
        <header className="fixed flex flex-row w-full justify-between px-[3.75rem] py-[1rem] items-center h-[10rem] z-10">
            <div className='flex items-center space-x-4'>
                <div onClick={handleDrawerOpen} className='cursor-pointer'>
                    <MenuIcon />
                </div>
                <div className='xxs:hidden lg:flex flex-col relative' ref={modalRef}>
                    <div className={`absolute p-2 top-[-4rem] ${menuListOpen ? 'bg-white border border-[#646463] rounded-md' : ''}`}>
                        <HeaderLogo />
                        <MenuTabs
                            tabs={tabsData}
                            value={selectedTab}
                            setValue={setSelectedTab}
                            onTabChange={handleTabChange}
                        />
                        {selectedTab?.categoryId !== -1 && (
                            <SubCategoriesList
                                subCategories={subCategories}
                                isLoading={isSubCategoryLoading}
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
                tabsData={tabsData}
                selectedTab={selectedTab}
                onTabChange={handleTabChange}
                subCategories={subCategories}
                isSubCategoryLoading={isSubCategoryLoading}
                setSelectedTab={setSelectedTab}
            />
        </header>
    );
};

export default Header;