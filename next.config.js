/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.myanimelist.net", "drive.google.com", "s4.anilist.co"]
  },
  redirects: async () => {
    return [
      {
        source: "/github",
        destination: "https://github.com/ghiwwwan/nekomoe",
        permanent: true,
      },
      {
        source: "/analytics",
        destination: "https://iwwwan-umami.vercel.app/share/HylRhqOOfpd5PURO/nekomoe",
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
