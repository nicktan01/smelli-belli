import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import HomePage from "./HomePage";
import About from "./About";
import BodyQuiz from "./quizzes/BodyQuiz";
import HomeQuiz from "./quizzes/HomeQuiz";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/bodyquiz" element={<BodyQuiz />} />
        <Route path="/homequiz" element={<HomeQuiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
