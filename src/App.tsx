import "./App.css";
import { Route, Routes } from "react-router-dom";
import PATH from "@utils/routes/PATH";
import Home from "./pages/Home";
import BoardDetailView from "./pages/board/BoardDetailView";
import BoardPostPage from "./pages/board/BoardPostPage";

function App() {
  const { HOME, BOARD_POST } = PATH;

  return (
    <>
      <Routes>
        <Route path={HOME} element={<Home />}>
          <Route path=":page" element={<Home />} />
        </Route>
        <Route path=":category" element={<Home />}>
          <Route path=":page" element={<Home />} />
        </Route>
        <Route path={BOARD_POST} element={<BoardPostPage />}>
          <Route path=":boardId" element={<BoardPostPage />} />
        </Route>
        <Route path="board">
          <Route path=":boardId" element={<BoardDetailView />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
