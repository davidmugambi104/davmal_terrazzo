import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import ArtisanNetwork from './pages/about/artisan-network';
import Sustainability from './pages/about/sustainability';
import DesignPortfolio from './pages/account/design-portfolio';
import OrderTracking from './pages/account/order-tracking';
import ProductDetail from './pages/products/[slug]';
import MaterialDNASelector from './pages/products/custom-design-lab/MaterialDNASelector';
import PatternCanvas from './pages/products/custom-design-lab/PatternCanvas';
import PatternControls from './pages/products/custom-design-lab/PatternControls';
import PatternGenerator from './pages/products/custom-design-lab/PatternGenerator';
import RealTimeRender from './pages/products/custom-design-lab/RealTimeRender';
import ProjectDetail from './pages/projects/[project]';
import Gallery from './pages/projects/gallery';
import { AboutPage } from './pages/about/about';
import ContactPage from './pages/contact/contactUs';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />

                <Route path="/about/artisan-network" element={<ArtisanNetwork />} />
                <Route path="/about/sustainability" element={<Sustainability />} />
                <Route path="/account/design-portfolio" element={<DesignPortfolio />} />
                <Route path="/account/order-tracking" element={<OrderTracking />} />
                <Route path="/products/:slug" element={<ProductDetail />} />
                <Route path="/products/custom-design-lab/material-dna-selector" element={<MaterialDNASelector />} />
                <Route path="/products/custom-design-lab/pattern-canvas" element={<PatternCanvas />} />
                <Route path="/products/custom-design-lab/pattern-controls" element={<PatternControls />} />
                <Route path="/products/custom-design-lab/pattern-generator" element={<PatternGenerator />} />
                <Route path="/products/custom-design-lab/real-time-render" element={<RealTimeRender />} />
                <Route path="/projects/:project" element={<ProjectDetail />} />
                <Route path="/projects/gallery" element={<Gallery />} />
            </Routes>
        </Router>
    );
};

export default App;

