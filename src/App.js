import './index.css';
import './App.css';
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage"
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import RegisterPage from "./pages/register/RegisterPage";
import {Toaster} from 'react-hot-toast';
import Login from "./pages/login/Login";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import Admin from './pages/admin/screens/Admin';
import Comments from './pages/admin/screens/comments/Comments';
import ManagePost from './pages/admin/screens/posts/ManagePost';
import EditPost from './pages/admin/screens/posts/EditPost';
import Categories from './pages/admin/screens/categories/Categories';
import EditCategories from './pages/admin/screens/categories/EditCategories';
import Users from './pages/admin/screens/users/Users';
import BlogPage from './pages/blog/BlogPage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Pricing from './components/Pricing';
import Faq from './components/Faq';



function App() {
  return (
    <div className="App font-opensans">
       <Routes>
        <Route index path="/" element={<HomePage/>}/>
        <Route  path="/blog/" element={<BlogPage/>}/>
        <Route  path="/about" element={<AboutUs/>}/>
        <Route  path="/contact" element={<ContactUs/>}/>
        <Route  path="/pricing" element={<Pricing/>}/>
        <Route  path="/faq" element={<Faq/>}/>
        <Route  path="/blog/:slug" element={<ArticleDetailPage/>}/>
        <Route  path="/register" element={<RegisterPage/>}/>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/profile" element={<ProfilePage/>}/>
        <Route  path="/admin" element={<AdminLayout/>}>
        <Route imdex  element={<Admin/>} />
        <Route path="comments" element={<Comments/>} />
        <Route path="posts/manage" element={<ManagePost/>} />
        <Route path="posts/edit/:slug" element={<EditPost/>} />
        <Route path="categories/manage" element={<Categories/>} />
        <Route path="categories/manage/edit/:slug" element={<EditCategories/>} />
        <Route path="users/manage" element={<Users/>} />
        </Route>
       </Routes>

       <Toaster/>
    </div>
  );
}

export default App;
