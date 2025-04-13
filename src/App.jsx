import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import DesignPortfolio from './pages/porfolio/design-portfolio';
import PatternGenerator from './pages/products/custom-design-lab/PatternGenerator';
import RealTimeRender from './pages/products/custom-design-lab/RealTimeRender';
import TerrazzoGallery from './pages/gallery';
import { AboutUs } from './pages/about/about';
import BusinessPortfolio from './pages/porfolio/design-portfolio';
import ContactForm from './pages/contact/contactUs';




const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Index />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactForm />} />
                <Route path="/portfolio" element={<BusinessPortfolio />} />
                <Route path="/photos" element={<TerrazzoGallery />} />

                {/* <Route path="/account/design-portfolio" element={<DesignPortfolio />} /> */}
                <Route path="/products/custom-design-lab/pattern-generator" element={<PatternGenerator />} />
                <Route path="/products/custom-design-lab/real-time-render" element={<RealTimeRender />} />

                {/* <Route path="/photos" element={<TerrazzoGallery />} / */}
            </Routes>
        </Router>
    );
};

export default App;

