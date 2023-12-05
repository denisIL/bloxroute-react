import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { MasterLayout } from "./components/layout/MasterLayout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <CookiesProvider>
        <Provider store={store}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <MasterLayout></MasterLayout>
        </Provider>
      </CookiesProvider>
    </Router>
  );
}

export default App;
