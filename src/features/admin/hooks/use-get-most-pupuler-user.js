import { collection, query, where, limit as queryLimit, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../../firebase/firebase-services";
import { useState, useEffect } from "react";

const useGetMostPopularUser = (limitValue, filter) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGetMostPopularUser = async () => {
    if (!limitValue || !filter) {
      setError("Limit dan filter dibutuhkan.");
      setLoading(false);
      return;
    }

    try {
      const userRef = collection(db, "users-role");
      // Asumsikan filter untuk angka > 0
      const querySearch = query(userRef, where(filter, ">", 0), orderBy(filter, "desc"), queryLimit(limitValue));

      const querySnapshot = await getDocs(querySearch);
      const data = querySnapshot.docs.map((doc) => ({
        doc_id: doc.id,
        ...doc.data(),
      }));
      setUserData(data);
    } catch (error) {
      console.error("Error during get most popular user:", error);
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMostPopularUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limitValue, filter]);

  return { userData, loading, error };
};

export default useGetMostPopularUser;
