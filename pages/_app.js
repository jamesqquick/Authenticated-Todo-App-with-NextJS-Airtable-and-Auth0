import '../styles/globals.css';
import { TodosProvider } from '../contexts/TodosContext.js';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
    return (
        <TodosProvider>
            <div className="container mx-auto my-6">
                <Component {...pageProps} />
            </div>
        </TodosProvider>
    );
}

export default MyApp;
