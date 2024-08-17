import React, { useEffect} from 'react'
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/index/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducers";
import { images } from '../../constants';

const RegisterPage = () => {
const navigate = useNavigate();
const dispatch= useDispatch();
const userState = useSelector(state => state.user);

  const{ mutate, isLoading}= useMutation({
    mutationFn: ({name, email, password}) => {
      return signup({name, email, password});
    },
    onSuccess:(data) => {
      console.log(userActions);
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account',JSON.stringify(data));
    },
    onError: (error)=>{
      toast.error(error.message);
console.log(error);
    },
  });

  useEffect(() => {
    if(userState.userInfo){
      navigate("/"); 
    }
  }, [navigate, userState.userInfo]);
  

const {
  register,
  handleSubmit,
  formState:{errors, isValid },
  watch,
}= useForm({
  defaultValues:{
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
  },
 mode: "onChange",
});

const submitHandler = (data) => {
  console.log(data);
  const {name, email, password }=data;
  mutate({name, email, password})
};

const password = watch('password');

  return (
    <MainLayout>
    <section className="min-h-screen text-gray-900 flex justify-center mt-0">
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-0 sm:p-12">
            <div>
                <img src={images.Logo}
                    className="w-32 mx-auto" alt="logo" />
            </div>
            <div className=" flex flex-col items-center">
              
            <div className="container mx-auto px-2 py-10">
      <div className="w-full max-w-sm mx-auto">
      <h2 className="mt-6 text-center text-2xl font-roboto font-bold text-gray-900">
            Sign Up to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
               Or <span> </span>

            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Login to your account
            </Link>
        </p>
        <form onSubmit = { handleSubmit(submitHandler) } className="">
          <div className="flex flex-col mb-6 w-full">
             <label htmlFor ="name" className="text-[35a7184] font-semibold block">Name</label>
             <input type="text" id="name"
             {...register("name",{
              minLength:{
                value:1,
                message:"Name legth must be atleast 1 character"
              },
              required:{
                value:true,
                message:"Name is required ",
              }
             })}
             placeholder="Enter name"
             className={`placeholder:text-[3959ead] text-dark-hard mt-3 rounded-lg px-5 
              border  py-4 font-semibold block outline-none ${errors.name ? "border-red-500": "border-[#c3cad9]"}`} />
              { errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
          </div>
          <div className="flex flex-col mb-6 w-full">
             <label htmlFor ="Email" className="text-[35a7184] font-semibold block">Email</label>
             <input type="email" id="email" 
                {...register("email",{
                  pattern:{
                    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Please enter a valid email',
                  },
                  required:{
                    value:true,
                    message:"Email is required ",
                  },
                 })}
             placeholder="Enter email"
             className={`placeholder:text-[3959ead] text-dark-hard mt-3 rounded-lg px-5 
              border  py-4 font-semibold block outline-none ${errors.email ? "border-red-500": "border-[#c3cad9]"}`} />
               { errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
          </div>
          <div className="flex flex-col mb-6 w-full">
             <label htmlFor ="Password" className="text-[35a7184] font-semibold block">Password</label>
             <input type="password" id="password"
                {...register("password",{
                  required:{
                    value:true,
                    message:"Password is required ",
                  },
                  minLength:{
                    value:6,
                    message:"Password length must be atleast 6 characters",
                  },
                 })}
             placeholder="Enter Password"
             className={`placeholder:text-[3959ead] text-dark-hard mt-3 rounded-lg px-5 
              border  py-4 font-semibold block outline-none ${errors.password ? "border-red-500": "border-[#c3cad9]"}`} />
                { errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
          </div>
          <div className="flex flex-col mb-6 w-full">
             <label htmlFor ="confirmPassword" className="text-[35a7184] font-semibold block"> Confirm Password</label>
             <input type="password" id="confirmPassword" 
                {...register("confirmPassword",{
                  required:{
                    value:true,
                    message:"Confirm password is required ",
                  },
                  validate: (value) => {
                    if(value !==password){
                      return "Passwords do not match";
                    }
                   }
                 })}
             placeholder="Enter Confirm Password"
             className={`placeholder:text-[3959ead] text-dark-hard mt-3 rounded-lg px-5 
              border  py-4 font-semibold block outline-none ${errors.confirmPassword ? "border-red-500": "border-[#c3cad9]"}`} /> 
              { errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
              )}
          </div>
      
          <button type="submit" disabled={!isValid || isLoading} className="bg-primary text-white font-bold text-lg
            py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed" >
            Register
          </button>

          <div className="relative ">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white dark:bg-gray-700 px-2 text-gray-500 dark:text-white">Or continue with</span>
                        </div>
           </div>

           <div className="flex flex-col items-center mt-7">
                        <button
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                            <div className="bg-white p-2 rounded-full">
                                <svg className="w-4" viewBox="0 0 533.5 544.3">
                                    <path
                                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                        fill="#4285f4" />
                                    <path
                                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                        fill="#34a853" />
                                    <path
                                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                        fill="#fbbc04" />
                                    <path
                                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                        fill="#ea4335" />
                                </svg>
                            </div>
                            <span className="ml-4">
                                Sign Up with Google
                            </span>
                        </button>

                        <button
                            className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5">
                            <div className="bg-white p-1 rounded-full">
                                <svg className="w-6" viewBox="0 0 32 32">
                                    <path fillRule="evenodd"
                                        d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z" />
                                </svg>
                            </div>
                            <span className="ml-4">
                                Sign Up with GitHub
                            </span>
                        </button>
                    </div>


          <p className="text-sm font-semibold  text-center p-6 text-[#5a7184] ">
            You have an account ?{" "}
            <Link to="/login" className="text-primary">
            Login now
              </Link>
          </p>

        </form>
      </div>
      </div>  
               
            </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: " url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')" }}>
            </div>
        </div>
    </div>
</section>
   </MainLayout>
  )
}

export default RegisterPage