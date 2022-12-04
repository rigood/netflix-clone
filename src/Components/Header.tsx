import { useState, useEffect } from "react";
import { Link, useMatch, PathMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled, { css } from "styled-components";
import {
  motion,
  useScroll,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import LanguageSelect from "./LanguageSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface IForm {
  keyword: string;
}

function Header() {
  // Nav scroll animation
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, []);

  // Menu indicator animation
  const MovieMatch: PathMatch<string> | null = useMatch("browse/movie");
  const tvMatch: PathMatch<string> | null = useMatch("browse/tv");
  const mylistMatch: PathMatch<string> | null = useMatch("mylist");

  // MenuBar
  const [menuBarOpen, setMenuBarOpen] = useState(false);

  const openMenuBar = () => {
    setMenuBarOpen(true);
  };

  const closeMenuBar = () => {
    setMenuBarOpen(false);
  };

  // SearchBar
  const { register, handleSubmit, setFocus, setValue } = useForm<IForm>();
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const openSearchBar = () => {
    setSearchBarOpen((prev) => !prev);
    setFocus("keyword");
  };

  const closeSearchBar = () => {
    setSearchBarOpen((prev) => !prev);
    setValue("keyword", "");
  };

  const navigate = useNavigate();
  const onSearchSubmit = (data: IForm) => {
    closeSearchBar();
    navigate(`/search/movie?q=${data.keyword}`);
  };

  // Language Select
  const { t } = useTranslation();
  const searchBarText = t("search.placeholder");

  return (
    <>
      <Nav variants={navVariants} initial="top" animate={navAnimation}>
        <Col>
          <Link to="/">
            <Logo
              xmlns="http://www.w3.org/2000/svg"
              width="1024"
              height="276.742"
              viewBox="0 0 1024 276.742"
            >
              <motion.path
                variants={logoVariants}
                initial="start"
                animate="end"
                whileHover="hover"
                d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
              />
            </Logo>
          </Link>
          <MenuContainer $open={menuBarOpen}>
            <Menu>
              <Link to="browse/movie" onClick={closeMenuBar}>
                {t("menu.movie")}
                <AnimatePresence>
                  {MovieMatch && <Circle layoutId="circle" />}
                </AnimatePresence>
              </Link>
            </Menu>
            <Menu>
              <Link to="browse/tv" onClick={closeMenuBar}>
                {t("menu.tv")}
                <AnimatePresence>
                  {tvMatch && <Circle layoutId="circle" />}
                </AnimatePresence>
              </Link>
            </Menu>
            <Menu>
              <Link to="mylist" onClick={closeMenuBar}>
                {t("menu.mylist")}
                <AnimatePresence>
                  {mylistMatch && <Circle layoutId="circle" />}
                </AnimatePresence>
              </Link>
            </Menu>
            <Menu>
              <LanguageSelect />
            </Menu>
          </MenuContainer>
        </Col>
        <Col>
          <SearchForm onSubmit={handleSubmit(onSearchSubmit)}>
            <SearchIcon
              icon={faMagnifyingGlass}
              $hide={searchBarOpen}
              onClick={openSearchBar}
            />
            <SearchInput
              {...register("keyword", { required: true, minLength: 1 })}
              minLength={1}
              animate={{ scaleX: searchBarOpen ? 1 : 0 }}
              transition={{ type: "linear" }}
              placeholder={searchBarText}
            ></SearchInput>
          </SearchForm>
          <MenuIcon icon={faBars} onClick={openMenuBar} />
        </Col>
        <Overlay
          $open={searchBarOpen || menuBarOpen}
          onClick={searchBarOpen ? closeSearchBar : closeMenuBar}
        />
      </Nav>
    </>
  );
}

export default Header;

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  // MenuContainer(mobile 999) > SearchForm(998) > Overlay(997) > Nav(996)
  z-index: 996;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* Responsive */
  padding: 20px 60px;
  @media (max-width: 767px) {
    padding: 15px 40px;
  }
  @media (max-width: 479px) {
    padding: 10px 20px;
  }
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  position: relative;
  bottom: -10px;
  width: 100px;
  height: 100%;
  margin-right: 30px;
  path {
    stroke: ${({ theme }) => theme.red};
    stroke-width: 5px;
  }
`;

const logoVariants = {
  start: {
    pathLength: 0,
    fill: "rgba(229, 16, 19, 0)",
  },
  end: {
    pathLength: 1,
    fill: "rgba(229, 16, 19, 1)",
    transition: {
      default: { duration: 5, ease: "easeInOut" },
      fill: { duration: 3, ease: [1, 0, 0.8, 1] },
    },
  },
  hover: {
    scale: 0.9,
    transition: {
      yoyo: Infinity,
    },
  },
};

const MenuContainer = styled.ul<{ $open: boolean }>`
  display: flex;
  align-items: center;
  /* Responsive */
  @media (max-width: 479px) {
    display: none;
    ${(props) =>
      props.$open &&
      css`
        position: fixed;
        top: 0px;
        right: 0;
        // MenuContainer(mobile 999) > SearchForm(998) > Overlay(997) > Nav(996)
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 50%;
        height: 100%;
        padding: 20px;
        background-color: ${({ theme }) => theme.gray};
        transition: all 0.3s ease-in;
        ${Menu} {
          margin-bottom: 20px;
          font-weight: 700;
        }
      `}
  }
`;

const Menu = styled.li`
  position: relative;
  margin-right: 20px;
  font-size: 14px;
  @media (hover: hover) {
    &:hover {
      color: white;
    }
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.red};
  /* Responsive */
  @media (max-width: 479px) {
    top: 0;
    bottom: 0;
    left: -10px;
    right: 0;
    margin: 0;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  // MenuContainer(mobile 999) > SearchForm(998) > Overlay(997) > Nav(996)
  z-index: 998;
`;

const SearchInput = styled(motion.input)`
  position: absolute;
  right: 60px;
  /* Responsive */
  @media (max-width: 767px) {
    right: 40px;
  }
  @media (max-width: 479px) {
    right: 60px;
  }
  width: 210px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.gray};
  color: white;
  transform-origin: right center;
  font-size: 15px;
  &::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 15px;
  }
  ${({ theme }) => theme.RemoveAutoFill("white")}
`;

const SearchIcon = styled(FontAwesomeIcon)<{ $hide: boolean }>`
  cursor: pointer;
  display: ${({ $hide }) => $hide && "none"};
  width: 20px;
`;

const MenuIcon = styled(FontAwesomeIcon)`
  display: none;
  @media (max-width: 479px) {
    cursor: pointer;
    display: block;
    width: 20px;
    margin-left: 20px;
  }
`;

const Overlay = styled.div<{ $open: boolean }>`
  display: none;
  // MenuContainer(mobile 999) > SearchForm(998) > Overlay(997) > Nav(996)
  z-index: 997;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: ${({ $open }) => $open && "block"};
  transition: all 0.3s ease-in;
`;
