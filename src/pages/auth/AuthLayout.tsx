import Header from '../lp/components/Header';
import Footer from '../lp/components/Footer';
import { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Header />
      <main className="flex-1 px-4">
        <div className="max-w-7xl mx-auto py-12">
          <div className="mx-auto max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8 border border-gray-100">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
