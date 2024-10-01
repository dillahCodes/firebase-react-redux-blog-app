import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useDetectLocation = () => {
  const location = useLocation();
  const locationPath = location.pathname;
  const [locationList, setLocationList] = useState({
    isAdminLocation: false,
    isAddArticleLocation: false,
    isProfileLocation: false,
    isHomePageLocation: false,
    isDetailArticleLocation: false,
    isMyArticlesLocation: false,
  });

  useEffect(() => {
    setLocationList((prev) => ({
      ...prev,
      isAdminLocation: locationPath.includes("/dashboard-admin"),
      isAddArticleLocation: locationPath.includes("/tambah-artikel"),
      isProfileLocation: locationPath.includes("/profil"),
      isHomePageLocation: locationPath === "/",
      isDetailArticleLocation: locationPath.includes("/detail-artikel"),
      isMyArticlesLocation: locationPath.includes("/artikelku"),
    }));
  }, [locationPath]);

  return {
    locationPath,
    isAdminLocation: locationList.isAdminLocation,
    isAddArticleLocation: locationList.isAddArticleLocation,
    isProfileLocation: locationList.isProfileLocation,
    isHomePageLocation: locationList.isHomePageLocation,
    isDetailArticleLocation: locationList.isDetailArticleLocation,
    isMyArticlesLocation: locationList.isMyArticlesLocation,
  };
};

export default useDetectLocation;
