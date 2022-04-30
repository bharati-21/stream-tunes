import { CategoryList, Header } from 'components';
import React from 'react';

const Home = () => {
    return (
        <main className="main landing-page-main">
            <Header />
            <CategoryList />
        </main>
    )
}

export { Home };