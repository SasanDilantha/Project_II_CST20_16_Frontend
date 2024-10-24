import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import jwtDecode from "jwt-decode";

const API_URL = "http://172.17.74.147:7070/realms/PoultryFarmSystem/protocol/openid-connect/token";

// Helper to decode JWT and check expiration
const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;
    const now = Date.now().valueOf() / 1000; // Current time in seconds
    return exp < now;
  } catch (error) {
    return true; // If decoding fails, consider the token expired
  }
};

const getNewAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      API_URL,
      new URLSearchParams({
        client_id: "poulty-farm-client",
        client_secret: "3wQojHPDn5DRWp2pokJ7QOM1AL3DvQEf",
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token, refresh_token } = response.data;

    // Save new tokens to AsyncStorage
    await AsyncStorage.setItem("refresh_token", access_token);
    await AsyncStorage.setItem("refresh_token", refresh_token);

    return access_token;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw new Error("Unable to refresh token");
  }
};

export const checkAndRefreshToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("access_token");
    const refreshToken = await AsyncStorage.getItem("refresh_token");

    if (!accessToken || !refreshToken) {
      throw new Error("Tokens not found");
    }

    // Check if access token is expired
    if (isTokenExpired(accessToken)) {
      console.log("Access token expired, refreshing...");
      return await getNewAccessToken(refreshToken); // Return new access token
    } else {
      return accessToken; // Return the current valid access token
    }
  } catch (error) {
    console.error("Error checking token:", error);
    throw error;
  }
};
