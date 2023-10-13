import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./context/AuthContext";

import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
