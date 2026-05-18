import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/layout/Body";
import { Provider } from "react-redux";
import { store } from "./utils/appStore";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Feed from "./pages/Feed/Feed";
import Requests from "./pages/Requests/Requests";
import Chat from "./pages/Chat/Chat";
import Shipping from "./pages/Shipping/Shipping";
import Refund from "./pages/Refund/Refund";
import Terms from "./pages/Terms/Terms";
import Privacy from "./pages/Privacy/Privacy";
import Premium from "./pages/Premium/Premium";
import Connections from "./pages/Connections/Connections";

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
            <Route path="/premium" element={<Premium />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
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
