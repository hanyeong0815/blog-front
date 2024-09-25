import "./App.css";
import { Route, Routes } from "react-router-dom";
import PATH from "@utils/routes/PATH";
import Home from "./pages/Home";
import BoardDetailView from "./pages/board/BoardDetailView";
import BoardPostPage from "./pages/board/BoardPostPage";
import BlogHome from "./pages/BlogHome";

function App() {
  const { HOME, BOARD_POST } = PATH;

  return (
    <>
      <Routes>
        <Route path={HOME} element={<Home />}>
          <Route path=":page" element={<Home />} />
        </Route>
        <Route path=":domain" element={<BlogHome />}>
          <Route path=":boardId" element={<BlogHome />} />
        </Route>
        <Route path=":domain/post" element={<BoardPostPage />} />
      </Routes>
    </>
  );
}

export default App;
