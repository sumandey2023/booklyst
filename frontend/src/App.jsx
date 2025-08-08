import MainRoute from "./routes/MainRoute";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import MuiThemeProvider from "./components/providers/MuiThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <MuiThemeProvider>
      <Nav />
      <MainRoute />
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </MuiThemeProvider>
  );
};

export default App;
