module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    env: {
      infuraURL: "YOUR INFURA URL",
      contractAddress: "YOUR CONTRACT ADDRESS",
    },
  };
  return nextConfig;
};
