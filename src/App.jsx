import {
  Account,
  Exam,
  Exams,
  NewExam,
  StExam,
  StLogin,
  StNotes,
  StRegister,
} from "./pages";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import CreateExam from "./pages/teacher/CreateExam";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/">
              <Route index path="/login" element={<StLogin />} replace />
              <Route path="/" element={<Exams />} />
              <Route path="/teacher/exam" element={<Exam />} />
              <Route path="/student/test" element={<StExam />} />
              <Route path="/teacher/add" element={<CreateExam />} />
              <Route path="/teacher/notes" element={<StNotes />} />
              <Route path="/register" element={<StRegister />} />
              <Route path="/account" element={<Account />} />
              <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
