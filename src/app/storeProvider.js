"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "@/store/store";
import { useEffect, useState } from "react";
import { setWishList } from "@/store/wishlistSlice";
import { setCredentials } from "@/store/authSlice";
function WishlistStorage(){
  const dispatch = useDispatch();
  const wishlistItem = useSelector(
    (state) => state.wishlist.items
  );

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if(savedWishlist){
      dispatch(setWishList(JSON.parse(savedWishlist)));
    }
  }, [dispatch]);

  useEffect(() =>{
    localStorage.setItem(
      'wishlist',
      JSON.stringify(wishlistItem)
    );
  }, [wishlistItem]);

  return null;
}

function AuthStorage(){
  const dispatch = useDispatch();
  const { user, token, isLogginIn } = useSelector((state) => state.auth);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if(savedAuth){
      try{
        const parsedAuth = JSON.parse(savedAuth);
        if(parsedAuth.user && parsedAuth.token){
          dispatch(setCredentials(parsedAuth));
        }
      }catch(error){
        localStorage.removeItem('auth');
      }
    }
    setIsHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if(!isHydrated) return;

    if(isLogginIn && user && token){
      localStorage.setItem('auth', JSON.stringify({ user, token }));
    }else{
      localStorage.removeItem('auth');
    }
  }, [isHydrated, isLogginIn, token, user]);

  return null;
}
export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <WishlistStorage/>
      <AuthStorage/>
      {children}
    </Provider>
  );
}