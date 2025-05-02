import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Spinner from "../Components/Spinner";

const AdminContext = createContext();

export const useAdmin = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === "mail@polarmotor.se") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginAsAdmin = () => {
    setIsAdmin(true);
  };

  const logoutAdmin = async () => {
    await signOut(auth);
    setIsAdmin(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AdminContext.Provider value={{ isAdmin, loginAsAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
