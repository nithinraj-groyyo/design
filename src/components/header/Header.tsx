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
import NavigationBar from './NavigationBar';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [menuListOpen, setMenuListOpen] = useState<boolean>(false);

    const [opacity, setOpacity] = useState(1);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useFetchCategories();

    const { activeCategoryTab } = useSelector((state: RootState) => state.categories);
    const { fetchSubCategories } = useFetchSubCategories();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const clientHeight = document.documentElement.clientHeight;

            const isScrollingDown = scrollTop > lastScrollTop;

            if (isScrollingDown) {
                const newOpacity = 1 - Math.min(scrollTop / 100, 1); 
                setOpacity(newOpacity);
            }
            else if (!isScrollingDown) {
                if (scrollTop > 100) {
                    setOpacity(0);
                } else {
                    const newOpacity = 1 - (scrollTop / 100);
                    setOpacity(newOpacity);
                }
            }

            setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);


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

    const handleHeaderOpacity = () => {
        setOpacity(1)
    }

    const navigateToHomePage = () => {
        navigate("/")
    };

    return (
        <header
            className={`fixed hidden lg:flex flex-row w-full justify-between px-[3.75rem] py-[1rem] items-center h-[10rem] z-30 hover:bg-white hover:shadow-lg transition-all duration-500 ease-in-out p-6 rounded-lg`}
            style={{ opacity }}
            onMouseOver={handleHeaderOpacity}
        >
            <div className='flex items-center space-x-4'>
                <div className='cursor-pointer'>
                    <img
                        src="/images/Groyyo_Studio_Logo.png"
                        width={100} height={100}
                        // style={{mixBlen\dMode: "color-burn"}}
                        onClick={navigateToHomePage}
                    />
                </div>
                {/* <div className='xxs:hidden lg:flex flex-col relative min-w-[30rem]' ref={modalRef}>
                    <div className={`absolute p-2 top-[-4rem] ${menuListOpen ? 'bg-white border border-[#646463] rounded-md' : ''}`}>
                        <HeaderLogo />
                        <MenuTabs onTabChange={handleTabChange} />
                        {(activeCategoryTab.categoryId !== -1 && menuListOpen) && (
                            <SubCategoriesList onItemClick={navigateToProducts} />
                        )}
                    </div>
                </div> */}
                <NavigationBar />
            </div>
            <nav className="flex items-center">
                <HeaderIcons />
            </nav>

        </header>
    );
};

export default Header;