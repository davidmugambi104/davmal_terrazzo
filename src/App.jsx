import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import DesignPortfolio from './pages/porfolio/design-portfolio';
import PatternCanvas from './pages/products/custom-design-lab/PatternCanvas';
import PatternControls from './pages/products/custom-design-lab/PatternControls';
import PatternGenerator from './pages/products/custom-design-lab/PatternGenerator';
import RealTimeRender from './pages/products/custom-design-lab/RealTimeRender';
import ProjectDetail from './pages/projects/[project]';
import Gallery from './pages/projects/gallery';
import { AboutUs } from './pages/about/about';
import ContactPage from './pages/contact/contactUs';
import BusinessPortfolio from './pages/porfolio/design-portfolio';
import  TerrazzoGallery from './pages/gallery';



const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Index />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/portfolio" element={<BusinessPortfolio />} />
                <Route path="/photos" element={<TerrazzoGallery />} />

                {/* <Route path="/account/design-portfolio" element={<DesignPortfolio />} /> */}
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

