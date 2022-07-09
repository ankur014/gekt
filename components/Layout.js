import Meta from './Meta';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      {/* <Nav /> */}
      <div className="flex flex-col h-screen">
        <Header />
        <main className="px-5 py-4 flex-1 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
