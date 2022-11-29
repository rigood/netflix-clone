import { useState, useEffect } from "react";
import { Link, useMatch, PathMatch, useNavigate } from "react-router-dom";
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
  // Nav-bar indicator animation
  const MovieMatch: PathMatch<string> | null = useMatch("browse/movie");
  const tvMatch: PathMatch<string> | null = useMatch("browse/tv");
  const mylistMatch: PathMatch<string> | null = useMatch("mylist");

  // Nav-bar scroll animation
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

  // Search-bar
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

  // Go to search results page
  const navigate = useNavigate();
  const onSearchSubmit = (data: IForm) => {
    navigate(`/search/movie?q=${data.keyword}`);
  };

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
          <MenuContainer>
            <Menu>
              <Link to="browse/movie">
                Movie
                <AnimatePresence>
                  {MovieMatch && <Circle layoutId="circle" />}
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
          </MenuContainer>
        </Col>
        <Col>
          <SearchForm onSubmit={handleSubmit(onSearchSubmit)}>
            <SearchIcon
              isHiding={searchBarOpen ? true : false}
              onClick={openSearchBar}
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
              placeholder="입력 후 Enter를 누르세요."
              animate={{ scaleX: searchBarOpen ? 1 : 0 }}
              transition={{ type: "linear" }}
            ></SearchInput>
          </SearchForm>
        </Col>
        <Overlay
          isShow={searchBarOpen ? true : false}
          onClick={closeSearchBar}
        />
      </Nav>
    </>
  );
}

export default Header;

const Nav = styled(motion.nav)`
  // 양 사이드 정렬
  display: flex;
  justify-content: space-between;
  align-items: center;
  // 상단 고정
  position: fixed;
  top: 0;
  // 크기 고정
  width: 100%;
  height: 80px;
  // 모달보다 아래, 슬라이더보다 위
  z-index: 995;
  // 반응형 패딩
  padding-inline: 60px;
  @media (max-width: 768px) {
    padding-inline: 40px;
  }
  @media (max-width: 480px) {
    padding-inline: 20px;
  }
  @media (max-width: 320px) {
    padding-inline: 10px;
  }
`;

// 스크롤 시 투명->검정 배경
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
  // 빨간점이랑 높이 맞추기
  position: relative;
  bottom: -10px;
  // 반응형 크기
  width: 100px;
  @media (max-width: 480px) {
    width: 80px;
  }
  @media (max-width: 320px) {
    width: 75px;
  }
  // 부모 영역 초과 X
  height: 100%;
  // 반응형 마진
  margin-right: 30px;
  @media (max-width: 480px) {
    margin-right: 15px;
  }
  @media (max-width: 320px) {
    margin-right: 10px;
  }
  // path 애니메이션
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

const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
`;

const Menu = styled.li`
  // 빨간점 배치
  position: relative;
  // 색상
  color: rgba(255, 255, 255, 0.9);
  &:hover {
    color: white;
  }
  // 반응형 폰트
  font-size: 13px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
  @media (max-width: 320px) {
    font-size: 11px;
  }
  // 반응형 마진
  &:not(:last-child) {
    margin-right: 15px;
  }
  @media (max-width: 480px) {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
`;

const Circle = styled(motion.span)`
  // 메뉴 텍스트 아래에 위치
  position: absolute;
  bottom: -10px;
  // 가운데 정렬
  left: 0;
  right: 0;
  margin-inline: auto;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.red};
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  // Nav 내에서 메뉴 텍스트보다 위
  z-index: 997;
`;

const SearchInput = styled(motion.input)`
  // 반응형 패딩
  position: absolute;
  right: 60px;
  @media (max-width: 768px) {
    right: 40px;
  }
  @media (max-width: 480px) {
    right: 20px;
  }
  @media (max-width: 320px) {
    right: 10px;
  }
  // 스타일
  padding: 5px 10px;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.gray};
  color: white;
  transform-origin: right center;
  // 반응형 폰트
  font-size: 13px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
  @media (max-width: 320px) {
    font-size: 11px;
  }
  &::placeholder {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 11px;
  }
  @media (max-width: 320px) {
    font-size: 10px;
  }
  // autofill 제거
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    transition: background-color 5000s;
    -webkit-text-fill-color: ${(porps) => porps.theme.white.darker} !important;
    caret-color: ${(porps) => porps.theme.white.darker};
  }
`;

const SearchIcon = styled.svg<{ isHiding: boolean }>`
  cursor: pointer;
  // searchBar 열리면 안보이게
  display: ${({ isHiding }) => isHiding && "none"};
  // 반응형 크기
  width: 20px;
  @media (max-width: 480px) {
    width: 17px;
  }
  @media (max-width: 320px) {
    width: 14px;
  }
`;

const Overlay = styled.div<{ isShow: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  background: rgba(0, 0, 0, 0.5);
  // 클릭 시 searchBar 닫힘
  cursor: pointer;
  // Nav 위, form 아래
  z-index: 996;
  // searchBar 열리면 보이게
  display: ${({ isShow }) => isShow && "block"};
  transition: all 0.3s ease-in;
`;
