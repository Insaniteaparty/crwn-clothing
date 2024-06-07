import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import CartIcon from "../../components/cart-icon/cart-icon.component";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
  Leading,
} from "./navigation.styles";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const [isHomepage, setIsHomepage] = useState(true);

  useEffect(() => {
    console.log("path:", window.location.pathname);
    const isThisAnHomepage = window.location.pathname === "/";
    setIsHomepage(isThisAnHomepage);
  }, [location]);

  const navigateBack = () => navigate(-1);
  return (
    <Fragment>
      <NavigationContainer>
        <Leading>
          {!isHomepage && <h2 onClick={navigateBack}>&#10094;</h2>}
          <LogoContainer to="/">
            <CrownLogo className="logo" />
          </LogoContainer>
        </Leading>
        <NavLinksContainer>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink
              as="span"
              onClick={async () => {
                await signOutUser();
              }}
            >
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
