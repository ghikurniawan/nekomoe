/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.myanimelist.net", "drive.google.com", "s4.anilist.co", "media.discordapp.net"]
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
        destination: "https://analytics.umami.is/share/hUOE7PeyHAnRzWwQ/nekomoe",
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
