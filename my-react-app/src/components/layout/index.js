import HeaderNav from "../header-nav";

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderNav />
      {children}
    </div>
  );
};

export default Layout;
