import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SRP from './principles/single-responsibility';
import OCP from './principles/open-closed';
import LSP from './principles/liskov-substitution';
import ISP from './principles/interface-segregation';
import DIP from './principles/dependency-inversion';
const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* <SRP /> */}
            {/* <OCP /> */}
            {/* <LSP /> */}
            {/* <ISP /> */}
            {/* <DIP /> */}
        </QueryClientProvider>
    );
}

export default App; 