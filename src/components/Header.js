import React, { useState } from 'react';
import { images } from "../constants";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch} from "react-redux";
import { logout } from "../store/actions/user";
import { useNavigate, Link } from "react-router-dom";

const navItemInfo = [
    { name: "Home", type: "link", href:"/" },
    { name: "Blog", type: "link", href: "/blog" },
    { name: "Pages", type: "dropdown", items: [{title:"About us", href:"/about"}, {title:"Contact us", href:"/contact"}] },
    { name: "Pricing", type: "link", href:"/pricing" },
    { name: "Faq", type: "link", href:"/faq" },
];

   

const NavItem = ({ item }) => {
    const [dropdown, setDropdown] = useState(false);
  
    const toggleDropdownHandler = () => {
      setDropdown((curState) => {
        return !curState;
      });
    };

    return (
        <li className="relative group">
            {item.type === "link" ? (
                <>
                    <Link to={item.href} className="px-4 py-2" >
                        {item.name}
                    </Link>
                    <span className="text-blue-500 cursor-pointer absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
                        /
                    </span>
                </>
            ) : (
                <div className="flex flex-col items-center">
                    <button className="px-4 py-2 flex gap-x-1 items-center" onClick={toggleDropdownHandler}>
                        {item.name}
                        <MdKeyboardArrowDown />
                    </button>
                    <div className={`${dropdown ? "block" :"hidden"} lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}>
                        <ul className="flex  bg-dark-soft lg:bg-transparent text-ceter flex-col shadow-lg rounded-lg overflow-hidden">
                            {item.items.map((page,index) => (
                                
                                    <Link to={page.href} key={index}  className="hover:bg-dark-hard hover:text-white px-4 py-2 lg:bg-dark-soft">
                                        {page.title}
                                    </Link>
                                
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </li>
    );
};

const Header = () => {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const [navIsVisible, setNavIsVisible] = useState(false);
    const userState =useSelector(state =>state.user);
    const [profileDropdown, setProfileDropdown ]= useState(false);

    const navVisibilityHandler = () => {
        setNavIsVisible((currState) => !currState);
    };
    
    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <section className=" sticky top-0 left-0 right-0 z-50 bg-white">
            <header className="container mx-auto px-5 flex justify-between items-center">
                 <Link to="/">
                 <img className="h-[70px] w-[170px]" src={images.Logo} alt="logo" />
                 </Link>
                <div className="z-[50] lg:hidden">
                    {navIsVisible ? (
                        <AiOutlineClose className="w-6 h-6" onClick={navVisibilityHandler} />
                    ) : (
                        <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
                    )}
                </div>
                <div className={` ${navIsVisible ? "right-0" : "-right-full"} transition-all duration-300 mt-[70px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] 
                flex fixed top-0 w-full flex-col lg:flex-row justify-center lg:w-auto lg:justify-right bottom-0 lg:static gap-x-9 items-center`}>
                    <ul className="flex text-white gap-y-5 lg:text-dark-soft flex-col lg:flex-row gap-x-2 items-center font-semibold">
                        {navItemInfo.map((item) => (
                            <NavItem key={item.name} item={item} />
                        ))}
                    </ul>
                    {userState.userInfo ? (<div className="flex text-white gap-y-5 lg:text-dark-soft flex-col lg:flex-row gap-x-2 items-center font-semibold">
                       <div className="relative group">
                       <div className="flex flex-col items-center">
                    <button className=" flex gap-x-1 items-center align-middle border-2 mt-5 lg:mt-0 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold
                     hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer" onClick={() => setProfileDropdown(!profileDropdown)}>
                        <span>Account</span>
                        <MdKeyboardArrowDown />
                    </button>
                    <div className={`${profileDropdown ? "block" :"hidden"} lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}>
                        <ul className="flex  bg-dark-soft lg:bg-transparent text-ceter flex-col shadow-lg rounded-lg overflow-hidden">
                            {userState?.userInfo?.admin && ( <button
                                   onClick={()=>navigate("/admin")} 
                                      type="button"
                                      className="hover:bg-dark-hard hover:text-white px-4 py-2 lg:bg-dark-soft">
                                    Admin Dashboard
                                    </button>
                                )}
                                  
                                    <button
                                   onClick={()=>navigate("/profile")} 
                                      type="button"
                                      className="hover:bg-dark-hard hover:text-white px-4 py-2 lg:bg-dark-soft">
                                        Profile Page
                                    </button>
                                    <button
                                      onClick={logoutHandler}
                                      type="button"
                                      className="hover:bg-dark-hard hover:text-white px-4 py-2 lg:bg-dark-soft">
                                        Logout
                                    </button>
                         
                        </ul>
                    </div>
                </div>
                       </div>
                       
                    </div>):
                     ( <button 
                    onClick={()=>navigate("/login")} 
                    className="align-middle border-2 mt-5 lg:mt-0 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300 cursor-pointer">
                        Sign In
                    </button>)}
                </div>
            </header>
        </section>
    );
}

export default Header;
