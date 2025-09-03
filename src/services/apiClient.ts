import axios from "axios";

const RAPID_API_KEY = process.env.EXPO_PUBLIC_RAPIDAPI_KEY;

const apiClient = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/v1",
  headers: {
    "X-RapidAPI-Key": RAPID_API_KEY!,
    "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
  },
});

export { apiClient };
