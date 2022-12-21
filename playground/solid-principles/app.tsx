// import { SRP } from "./principles/SRP";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SRP from './single-responsibility';

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <SRP />
            {/* <OCP /> */}
            {/* <LSP /> */}
            {/* <DIP /> */}
        </QueryClientProvider>
    );
}

export default App; 