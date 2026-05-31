import Facilities from '@/pages/Home/Facilities';
import FeaturedFacilities from '@/pages/Home/FeaturedFacilities';
import Hero from '@/pages/Home/Hero';
import StatsGrid from '@/pages/Home/StatsGrid';
import React from 'react';
// Adjust this path based on exactly where you saved Hero.jsx

export default function Home() {
  return (
    <>
      {/* Premium Hero Banner Section */}
      <Hero></Hero>
      <FeaturedFacilities></FeaturedFacilities>
      <StatsGrid></StatsGrid>
      <Facilities></Facilities>
      {/* 
        Your future sections (like Features, Facilities Grid, etc.) 
        will go right below here as you build them out! 
      */}
    </>
  );
}