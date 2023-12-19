import { Base64 } from "js-base64";

export function decodeToken(token) {
  try {
    // Split the token into its parts (header, payload, and signature)
    const parts = token?.split(".");

    // Ensure that we have at least two parts (header and payload)
    if (parts.length < 2) {
      throw new Error("Invalid token format");
    }

    // Extract and decode the payload part (the middle part)
    const encodedPayload = parts[1];
    const decodedPayload = Base64.decode(encodedPayload);

    // Parse the payload as JSON to get the object
    const tokenObject = JSON.parse(decodedPayload);

    return tokenObject;
  } catch (error) {

    return null;
  }
}
