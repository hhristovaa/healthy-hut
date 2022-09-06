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
import CreateArticle from './pages/articles/CreateArticle';
import FullArticle from './pages/articles/FullArticle';
import Footer from './components/Layout/Footer';
import './styles/Global.scss';
import EditArticle from './pages/articles/EditArticle';
import NotFound from './pages/404/NotFound';
import Vegan from './pages/recipes/Vegan';
import Diet from './pages/recipes/Diet';
import SearchResult from './pages/recipes/SearchResult';
import FullRecipe from './pages/recipes/FullRecipe';
import Favorites from './pages/favorites/Favorites';
import FavoritesProvider from './store/FavoritesProvider';

function App() {
  return (
    <>
    <FavoritesProvider>
      <Router>
      <Navbar />
        <Routes>
          {/* <Route path='/' element={<></>} /> */}
          <Route path='/' element={<Trending/>} />
          <Route exact path='/recipes' element={<Recipes />}>
            {/* <Route path='/recipes/:type' element={<Vegan/>}/> */}
            
            <Route path='/recipes/:type' element={<Recipes/>}/>

          </Route>
          <Route path='/articles' element={<Articles />} />
          <Route path='/search/:search' element={<SearchResult />} />
          <Route path='/recipe/:recipeId' element={<FullRecipe />} />
          <Route path='/vegan' element={<Vegan />} />
          <Route path='/diet' element={<Diet />} />
          <Route path='/diet/:type' element={<Diet />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/profile' element={<PrivateRoute />} >
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/favorites' element={<PrivateRoute />} >
          <Route path='/favorites' element={<Favorites />} />
          </Route>

          <Route path='/create-article' element={<CreateArticle />} />
          <Route path='/edit-article/:articleId' element={<EditArticle />} />
          <Route path='/articles/:articleId' element={<FullArticle />} />
          <Route path='/recipe/:recipeId' element={<Recipes />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        

      </Router>
      </FavoritesProvider>

      <ToastContainer position="top-right"
        autoClose={3000}
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
