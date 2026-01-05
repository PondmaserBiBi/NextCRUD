const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastly.picsum.photos", // เปลี่ยนเป็นโดเมนจริงของคุณ
        port: "",
        pathname: "/**", // รองรับทุก path
      },
    ],
  },
};

export default nextConfig;
