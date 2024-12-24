import React, { useRef, useState, useEffect } from "react";
import HeaderIcons from "./HeaderIcons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setActiveCategoryTab } from "../../redux/categoriesSlice";
import { useFetchSubCategories } from "../../hooks/useFetchSubCategories";
import { useNavigate } from "react-router-dom";
import useFetchCategories from "../../hooks/useFetchCategories";
import NavigationBar from "./NavigationBar";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const urlContainsCatalogue = window.location.href.includes("catalogue");
  const [isCatalogueDetailPage, setIsCatalogueDetailPage] = useState(urlContainsCatalogue);

  useEffect(()=>{
    if (urlContainsCatalogue) {
      setIsCatalogueDetailPage(true); 
    } else {
      setIsCatalogueDetailPage(false);
    }
  },[isCatalogueDetailPage])



  const [opacity, setOpacity] = useState(1);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;

      const isScrollingDown = scrollTop > lastScrollTop;

      if (isScrollingDown) {
        const newOpacity = 1 - Math.min(scrollTop / 100, 1);
        setOpacity(newOpacity);
      } else if (!isScrollingDown) {
        if (scrollTop > 100) {
          setOpacity(0);
        } else {
          const newOpacity = 1 - scrollTop / 100;
          setOpacity(newOpacity);
        }
      }

      setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      dispatch(setActiveCategoryTab({ categoryId: -1, categoryKey: "" }));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleHeaderOpacity = () => {
    setOpacity(1);
  };

  const navigateToHomePage = () => {
    navigate("/");
  };

  return (
    <header
      className={`fixed hidden lg:flex ${isCatalogueDetailPage ? "bg-white" : ""} flex-row w-full justify-between px-[3.75rem] py-[1rem] items-center h-[10rem] z-30  hover:shadow-lg transition-all duration-500 ease-in-out p-6 rounded-lg`}
      style={{ opacity }}
      onMouseOver={handleHeaderOpacity}
    >
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer">
          <img
            src="/images/Groyyo_Studio_Logo.png"
            className="md:w-24 md:h-24"
            alt="image1"
            onClick={navigateToHomePage}
          />
        </div>
        <NavigationBar />
      </div>
      <nav className="flex items-center">
        <HeaderIcons />
      </nav>
    </header>
  );
};

export default Header;
