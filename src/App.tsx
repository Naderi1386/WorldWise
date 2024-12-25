import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";


// import Product from "./pages/Product";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Pricing from "./pages/Pricing";

import CitiList from "./components/CitiList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import FormCity from "./components/FormCity";

import Context from "./components/Contexts/Context";
import AuthProvider from "./components/Contexts/FakeAuthContext";
import SpinnerFullPage from "./components/SpinnerFullPage";
const Home = lazy(() => import("./pages/Home"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));






const App = () => {
  
  return (
    <>
      <AuthProvider>
        <Context>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Home />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="app" element={<AppLayout />}>
                  <Route index element={<Navigate to="cities" replace />} />
                  <Route path="cities" element={<CitiList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountriesList />} />
                  <Route path="form" element={<FormCity />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
                <Route path="login" element={<Login />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </Context>
      </AuthProvider>
    </>
  );
};

export default App;
