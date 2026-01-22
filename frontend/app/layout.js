import './globals.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export const metadata = {
  title: 'HRMS Lite | Admin Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground transition-colors duration-300">
        <div className="flex h-screen overflow-hidden">

          <Sidebar />

          <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">

            <Header />

            <main>
              <div className="p-4 mx-auto max-w-7xl md:p-6">
                {children}
              </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}