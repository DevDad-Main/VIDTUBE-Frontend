import { Outlet } from "react-router";
import { Header, Footer } from "./components";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <ToastContainer position="top-center" autoClose={5000} theme="dark" />
        <Outlet />
      <Footer />
    </div>
  );
}

export default App;
