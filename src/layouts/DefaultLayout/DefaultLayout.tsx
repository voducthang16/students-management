import Footer from '../Footer';
import Header from '../Header';
import Sidebar from '../Sidebar';
function DefaultLayout({ children }) {
    return (
        <>
            <Sidebar />
            <main className="lg:ml-64 bg-[#f3f3f9]">
                <Header />
                <div className="p-4">{children}</div>
                <Footer />
            </main>
        </>
    );
}

export default DefaultLayout;
