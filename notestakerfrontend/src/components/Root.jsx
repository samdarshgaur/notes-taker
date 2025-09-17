import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from './Navbar';

const Root = () => {
    const navigation = useNavigation();

    return (
        <>
            <Navbar />
            <main>
                {navigation.state === 'loading' && <p>Loading...</p>}
                <Outlet />
            </main>
        </>
    )
}

export default Root;