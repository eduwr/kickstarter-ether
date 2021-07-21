import { Header } from "./Header";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
