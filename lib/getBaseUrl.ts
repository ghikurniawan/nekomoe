export const getBaseUrl = () => {
  const baseURL = process.env.BASE_URL || "http://localhost:3000"
  return baseURL
}