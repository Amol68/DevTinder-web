import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import { store } from "./utils/appStore";
import Feed from "./components/Feed";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import Terms from "./pages/Terms";
import Refund from "./pages/Refund";
import Privacy from "./pages/Privacy";
import Shipping from "./pages/Shipping";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/privacy-policy" element={<Privacy />} />
<Route path="/terms-and-conditions" element={<Terms />} />
<Route path="/refund-policy" element={<Refund />} />

<Route path="/shipping-policy" element={<Shipping />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
