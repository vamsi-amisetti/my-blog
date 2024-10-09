import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Typography, createTheme } from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import PortraitIcon from '@mui/icons-material/Portrait';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { AppProvider, DashboardLayout } from '@toolpad/core';
import type { Navigation, Router } from '@toolpad/core';
import Blog from './../Blog/Blog';
import About from './../About/About';
import Contact from './../Contact/Contact';

import './Home.css';

interface Props {
}

const Home: React.FC<Props> = ({ }) => {

    const NAVIGATION: Navigation = [
        {
            segment: '',
            title: 'Home',
            icon: <FeedIcon />,
        },
        {
            segment: 'about',
            title: 'About',
            icon: <PortraitIcon />,
        },
        {
            segment: 'contact',
            title: 'Contact',
            icon: <ContactPageIcon />,
        }
    ];

    const theme = createTheme({
        cssVariables: {
            colorSchemeSelector: 'data-toolpad-color-scheme',
        },
        colorSchemes: { light: true, dark: true },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 600,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    const [pathname, setPathname] = React.useState('/');

    const router = React.useMemo<Router>(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    function PageContent({ pathname }: { pathname: string }) {
        return (
            <Box
                sx={{
                    py: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                {
                    (pathname === '/') ? <Blog/> : (pathname === '/about') ? <About/> : (pathname === '/contact') ? <Contact/> : <Blog/>
                }
            </Box>
        );
    }

    return (
        // preview-start
        <AppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <Avatar src={process.env.PUBLIC_URL + "/logo.png"} alt="Vamsi Amisetti" />,
                title: 'Vamsi Amisetti',
            }}
            router={router}
            theme={theme}
        >
            <DashboardLayout>
                <PageContent pathname={pathname} />
            </DashboardLayout>
        </AppProvider>
        // preview-end
    );
};

export default Home;