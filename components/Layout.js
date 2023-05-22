import Header from './Header';
import Footer from './Footer';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Layout({ children }) {
  const queryClient = new QueryClient();

  return (
    // <div>
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
      <Footer />
    </QueryClientProvider>
    //  </div>
  );
}
