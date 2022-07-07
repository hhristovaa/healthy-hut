import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/Layout/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Trending from './pages/Trending';
import Recipes from './pages/Recipes';
import Articles from './pages/articles/Articles';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CreateArticle from './pages/articles/CreateArticle';
import FullArticle from './pages/articles/FullArticle';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Trending />} />
          <Route path='/recipes' element={<Recipes />} />
          <Route path='/articles' element={<Articles />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/profile' element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile />} />

            </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/create-article' element={<CreateArticle />} />
          <Route path='/articles/:articleId' element={<FullArticle />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </>
  );
}

export default App;
