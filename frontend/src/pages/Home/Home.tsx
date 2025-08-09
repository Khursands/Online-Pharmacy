import React from 'react';
import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import FeaturedProducts from '../../components/Products/FeaturedProducts';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedProducts />
    </main>
  );
};

export default Home;