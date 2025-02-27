import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { logo } from "./assets";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />

      <header className="w-full flex justify-between items-center bg-gray-100 sm:px-8 px-4 py-4 border-b border-gray-300">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>
        <Link to="/create-post" className="font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Create</Link>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-gray-100 min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
