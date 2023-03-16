import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { IconlyProvider } from "react-iconly";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";
import Navigation from "./navigations";

import { queryClient } from "./services/reactQuery";

import "./styles/index.css";
import { useTranslation } from "react-i18next";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <IconlyProvider set="light">
          <Layout>
            <Navigation />
          </Layout>
          <Toaster position="top-right" />
        </IconlyProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
