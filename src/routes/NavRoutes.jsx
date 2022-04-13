import React from 'react';
import Mockman from 'mockman-js';
import { Routes, Route } from 'react-router-dom';

import { Home, Explore } from 'pages';

const NavRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/mockman" element={<Mockman />} />
        </Routes>
    )
}

export { NavRoutes };