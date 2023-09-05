import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import SearchHeader from "./components/SearchHeader";
import { YoutubeApiProvider } from "./context/YoutubeApiContext";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <SearchHeader />
      {/* SearchHeader는 네트워크 통신이 일어나지 않으므로 제일 근접한 부모는 Outlet! */}
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  );
}

export default App;
