"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  authAPI,
  userAPI,
  setToken,
  getToken,
  clearToken,
} from "@/lib/apiClient";
import { syncCartFromServer } from "@/lib/cartBus";
import { addToCart } from "@/lib/cartBus";
import { sendFirebaseOtp, verifyFirebaseOtp } from "@/lib/firebase";

const AuthContext = createContext(null);
const GUEST_WISHLIST_KEY = "dpack_guest_wishlist";

function readGuestWishlist() {
  if (typeof window === "undefined") return [];
  try {
    const wishlist = JSON.parse(localStorage.getItem(GUEST_WISHLIST_KEY) || "[]");
    return Array.isArray(wishlist) ? wishlist : [];
  } catch (error) {
    console.error("Could not read saved wishlist:", error);
    return [];
  }
}

function getProductId(product) {
  return String(product?._id || product?.id || "");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [wishlist, setWishlistState] = useState([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginIntent, setLoginIntent] = useState(null);

  const loginWithToken = useCallback(async (token) => {
    setToken(token);
    try {
      const data = await authAPI.me();
      setUser(data.user);
      await syncCartFromServer();
      const guestWishlist = readGuestWishlist();
      for (const product of guestWishlist) {
        const id = getProductId(product);
        if (/^[0-9a-fA-F]{24}$/.test(id)) {
          await userAPI.addToWishlist(id);
        }
      }
      const wishlistData = await userAPI.getWishlist();
      setWishlistState(wishlistData.wishlist || []);
      localStorage.removeItem(GUEST_WISHLIST_KEY);
    } catch {
      clearToken();
      throw new Error("Failed to verify token");
    }
  }, []);

  useEffect(() => {
    const handleCartAdd = (event) => {
      if (event.detail?.name) {
        addToCart(event.detail, event.detail.quantity || 1);
      }
    };
    window.addEventListener("dpack-cart-add", handleCartAdd);
    return () => window.removeEventListener("dpack-cart-add", handleCartAdd);
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (token) {
        try {
          const data = await authAPI.me();
          setUser(data.user);
          await syncCartFromServer();
          const guestWishlist = readGuestWishlist();
          for (const product of guestWishlist) {
            const id = getProductId(product);
            if (/^[0-9a-fA-F]{24}$/.test(id)) {
              await userAPI.addToWishlist(id);
            }
          }
          const wl = await userAPI.getWishlist();
          setWishlistState(wl.wishlist || []);
          localStorage.removeItem(GUEST_WISHLIST_KEY);
        } catch {
          clearToken();
        }
      } else {
        setWishlistState(readGuestWishlist());
      }
      setHydrated(true);
    };
    init();
  }, []);

  const openLogin = useCallback((intent = null) => {
    setLoginIntent(intent);
    setLoginOpen(true);
  }, []);

  const closeLogin = useCallback(() => {
    setLoginOpen(false);
    setLoginIntent(null);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setWishlistState([]);
  }, []);

  const sendOtp = useCallback(async (mobile) => {
    const phone = `+91${mobile}`;
    const result = await sendFirebaseOtp(phone, "recaptcha-container");

    if (!result.success) {
      return { ok: false, error: result.error?.message || "Failed to send OTP" };
    }
    return { ok: true, message: "OTP sent" };
  }, []);

  const loginWithOtp = useCallback(
    async (mobile, otp) => {
      const result = await verifyFirebaseOtp(otp);
      if (!result.success) {
        return { ok: false, error: result.error?.message || "Invalid OTP" };
      }

      try {
        const idToken = await result.user.getIdToken();
        const res = await authAPI.firebaseLogin(idToken);
        setToken(res.token);
        setUser(res.user);
        await syncCartFromServer();

        if (loginIntent?.type === "wishlist" && loginIntent.productId) {
          await userAPI.addToWishlist(loginIntent.productId);
        }

        const guestWishlist = readGuestWishlist();
        for (const product of guestWishlist) {
          const id = getProductId(product);
          if (/^[0-9a-fA-F]{24}$/.test(id)) {
            await userAPI.addToWishlist(id);
          }
        }
        const wl = await userAPI.getWishlist();
        setWishlistState(wl.wishlist || []);
        localStorage.removeItem(GUEST_WISHLIST_KEY);
        closeLogin();
        return { ok: true, user: res.user };
      } catch (e) {
        return { ok: false, error: e.message || "Login failed" };
      }
    },
    [loginIntent, closeLogin]
  );

  const isWishlisted = useCallback(
    (id) => wishlist.some((product) => getProductId(product) === String(id)),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    async (product) => {
      const id = getProductId(product);
      if (!id) return { added: false, error: "Product ID is missing." };

      if (!user) {
        const exists = wishlist.some((saved) => getProductId(saved) === id);
        const next = exists
          ? wishlist.filter((saved) => getProductId(saved) !== id)
          : [{ ...product, _id: id }, ...wishlist];
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(next));
        setWishlistState(next);
        return { added: !exists, requiresLogin: false };
      }

      const alreadyIn = isWishlisted(id);

      try {
        if (alreadyIn) {
          await userAPI.removeFromWishlist(id);
          setWishlistState((prev) => prev.filter((saved) => getProductId(saved) !== id));
          return { added: false, requiresLogin: false };
        } else {
          await userAPI.addToWishlist(id);
          const wl = await userAPI.getWishlist();
          setWishlistState(wl.wishlist || []);
          return { added: true, requiresLogin: false };
        }
      } catch (error) {
        console.error("Wishlist update failed:", error);
        return { added: false, requiresLogin: false, error: error.message };
      }
    },
    [user, wishlist, isWishlisted]
  );

  const removeWishlistItem = useCallback(
    async (productId) => {
      const id = String(productId);
      if (!user) {
        const next = wishlist.filter((saved) => getProductId(saved) !== id);
        localStorage.setItem(GUEST_WISHLIST_KEY, JSON.stringify(next));
        setWishlistState(next);
        return;
      }
      try {
        await userAPI.removeFromWishlist(id);
        setWishlistState((prev) =>
          prev.filter((saved) => getProductId(saved) !== id)
        );
      } catch (error) {
        console.error("Could not remove wishlist item:", error);
      }
    },
    [user, wishlist]
  );

  const clearWishlist = useCallback(async () => {
    try {
      if (user) {
        await Promise.all(
          wishlist.map((product) => userAPI.removeFromWishlist(getProductId(product)))
        );
      }
      localStorage.removeItem(GUEST_WISHLIST_KEY);
      setWishlistState([]);
    } catch (error) {
      console.error("Could not clear wishlist:", error);
      throw error;
    }
  }, [user, wishlist]);

  const value = useMemo(
    () => ({
      user,
      hydrated,
      isLoggedIn: !!user,
      wishlist,
      wishlistCount: wishlist.length,
      isWishlisted,
      toggleWishlist,
      removeWishlistItem,
      clearWishlist,
      loginOpen,
      openLogin,
      closeLogin,
      loginIntent,
      sendOtp,
      loginWithOtp,
      loginWithToken,
      logout,
    }),
    [
      user, hydrated, wishlist,
      isWishlisted, toggleWishlist, removeWishlistItem,
      clearWishlist,
      loginOpen, openLogin, closeLogin, loginIntent,
      sendOtp, loginWithOtp, loginWithToken, logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}