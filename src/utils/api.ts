import axios from "axios";
import { Match } from "../constants/types";

const API_URL = process.env.REACT_APP_API_URL;

export const getMatches = async (): Promise<Match[]> => {
  if (!API_URL) {
    throw new Error("API URL is not defined");
  }
  try {
    const response = await axios.get(API_URL);
    const updatedData = response.data.map((data) => ({ ...data, MBS: "4" }));
    return updatedData;
  } catch (error) {
    console.error("Error getting data:", error);
    throw error;
  }
};
