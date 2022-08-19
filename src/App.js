import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/Layout/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import Trending from './pages/Trending';
import Recipes from './pages/recipes/Recipes';
import Articles from './pages/articles/Articles';
import Contacts from './pages/contacts/Contacts';
import Profile from './pages/profile/Profile';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import CreateArticle from './pages/articles/CreateArticle';
import FullArticle from './pages/articles/FullArticle';
import Footer from './components/Layout/Footer';
import './styles/Global.scss';
import EditArticle from './pages/articles/EditArticle';

function App() {
  return (
    <>
      <Router>
      <Navbar />
        <Routes>
          {/* <Route path='/' element={<></>} /> */}
          <Route path='/' element={<Trending/>} />
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
          <Route path='/edit-article/:articleId' element={<EditArticle />} />
          <Route path='/articles/:articleId' element={<FullArticle />} />
        </Routes>
        

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
        
        <Footer/>
</>
  );
}

export default App;
