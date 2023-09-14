// pages/index.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the products list page
    router.push('/product-list');
  }, []);

  return null; // This component doesn't render anything, it's just for redirection.
};

export default Home;
