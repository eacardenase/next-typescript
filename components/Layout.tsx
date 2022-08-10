import { Container } from 'semantic-ui-react';
import Navbar from './Navbar';

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <div>
            <Navbar />

            <main
                style={{
                    background: '#212121',
                }}
            >
                <Container
                    style={{
                        padding: '2rem',
                        height: '90vh',
                    }}
                >
                    {children}
                </Container>
            </main>
        </div>
    );
};

export default Layout;
