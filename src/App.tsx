import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import LeadCapture from './components/LeadCapture';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import AutoChatbot from './components/AutoChatbot';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <LeadCapture />
      <Footer />
      <CTABanner />
      <AutoChatbot />
    </div>
  );
}

export default App;