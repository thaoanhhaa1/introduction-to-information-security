import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { v4 } from 'uuid';
import DefaultLayout from './layouts/DefaultLayout';
import routes from './routes';

function App() {
    return (
        <Router>
            <Routes>
                {routes.map((route) => {
                    const Layout = DefaultLayout;
                    const Element = route.element;

                    return (
                        <Route
                            key={v4()}
                            path={route.path}
                            element={
                                <Layout>
                                    <Element />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
