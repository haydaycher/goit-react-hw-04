import axios from "axios";

const API_KEY = "XoC21bF4fyu-XEDDJIFj0KqVS__8CLwklnDr3Ayok8g";

const BASE_URL = "https://api.unsplash.com/";

export const fetchArticles = async (page, query) => {
  const response = await axios.get(`${BASE_URL}search/photos`, {
    params: {
      query,
      page,
      per_page: 10,
      client_id: API_KEY,
      orientation: "landscape",
    },
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("Failed to fetch articles");
  }
};
