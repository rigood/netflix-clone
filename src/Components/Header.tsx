import { useState, useEffect } from "react";
import {
  Link,
  useMatch,
  PathMatch,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useAnimation,
  AnimatePresence,
} from "framer-motion";

interface IForm {
  keyword: string;
}

function Header() {
  // Routing
  const homeMatch: PathMatch<string> | null = useMatch("browse/movie");
  const tvMatch: PathMatch<string> | null = useMatch("browse/tv");
  const mylistMatch: PathMatch<string> | null = useMatch("mylist");
  const location = useLocation();

  // Nav Scroll
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

  // Search-form
  const { register, handleSubmit, setFocus, setValue } = useForm<IForm>();
  const navigate = useNavigate();
  const onSearch = (data: IForm) => {
    navigate(`/search/movie?q=${data.keyword}`);
  };

  // Toggle Search-input
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen((prev) => !prev);

  useEffect(() => {
    if (location.pathname === "/search") return;
    setValue("keyword", "");

    if (searchOpen) {
      setSearchOpen((prev) => !prev);
    }
  }, [location]);

  return (
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
        <Menus>
          <Menu>
            <Link to="browse/movie">
              Home
              <AnimatePresence>
                {homeMatch && <Circle layoutId="circle" />}
              </AnimatePresence>
            </Link>
          </Menu>
          <Menu>
            <Link to="browse/tv">
              TV Shows
              <AnimatePresence>
                {tvMatch && <Circle layoutId="circle" />}
              </AnimatePresence>
            </Link>
          </Menu>
          <Menu>
            <Link to="mylist">
              My List
              <AnimatePresence>
                {mylistMatch && <Circle layoutId="circle" />}
              </AnimatePresence>
            </Link>
          </Menu>
        </Menus>
      </Col>
      <Col>
        <SearchForm onSubmit={handleSubmit(onSearch)}>
          <SearchIcon
            onClick={() => {
              toggleSearch();
              setFocus("keyword");
            }}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            ></path>
          </SearchIcon>
          <SearchInput
            {...register("keyword", { required: true, minLength: 1 })}
            minLength={1}
            placeholder="검색어를 입력하세요."
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ type: "linear" }}
          />
        </SearchForm>
      </Col>
    </Nav>
  );
}

export default Header;

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  padding-inline: 60px;
  z-index: 7;
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
  position: relative; // To align baseline with Circle
  bottom: -8px;
  width: 100px;
  height: 50px;
  margin-right: 30px;
  path {
    stroke: ${(props) => props.theme.red};
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
      // Copied the 'ease' value of Framer-Motion's Path example
      default: { duration: 5, ease: "easeInOut" }, // slow-fast-slow
      fill: { duration: 3, ease: [1, 0, 0.8, 1] },
    },
  },
  hover: {
    // Shrink logo due to fixed logo size
    scale: 0.9,
    transition: {
      // 'yoyo' is a type of repeatType
      yoyo: Infinity,
    },
  },
};

const Menus = styled.ul`
  display: flex;
  align-items: center;
`;

const Menu = styled.li`
  position: relative; // To position Circle
  font-size: 13px;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -10px;
  // CSS trick to align center horizontally
  // left 0, right 0, margin 0 auto
  left: 0;
  right: 0;
  margin-inline: auto;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
`;

const SearchInput = styled(motion.input)`
  position: absolute; // Fixed posiiton for expanding-motion
  right: 60px; // Nav's padding-right
  z-index: -1; // Input should be under the Search icon
  padding: 5px;
  padding-left: 40px; // space for Search icon
  border: 1px solid ${(porps) => porps.theme.white.darker};
  background-color: ${(porps) => porps.theme.black.lighter};
  font-size: 14px;
  color: ${(porps) => porps.theme.white.darker};
  transform-origin: right center;
  &::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 12px;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-text-fill-color: ${(porps) => porps.theme.white.darker} !important;
    caret-color: ${(porps) => porps.theme.white.darker};
  }
`;

const SearchIcon = styled(motion.svg)`
  width: 20px;
  cursor: pointer;
`;
