import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
const ACCESS_KEY = "QaJFZtvzwfdPro8UKSoHzVpYsjWLBiw6-glWKs1rfRY";
export const fetchImages = async (searchQuery, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: ACCESS_KEY,
      query: searchQuery,
      orientation: "landscape",
      hitsPerPage: 10,
      page: currentPage,
    },
  });

  return response.data.results;
};
