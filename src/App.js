import "./App.css";
import Listing from "./components/Listing";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddData from "./components/addData";
import IssueDetail from "./components/issueDetail";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="/add_ticket" element={<AddData />} />
            <Route path="/issue_details/:id" element={<IssueDetail/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
