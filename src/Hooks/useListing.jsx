import axios from "axios";
import { useEffect, useState } from "react";

const useListing = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios("http://localhost:3000/listings")
      .then((data) => {
        console.log(data.data);
        setListings(data.data);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { listings, loading, error };
};

export default useListing;
