import React from 'react'
import { images, stables } from "../constants";
import { BsCheckLg } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";


const ArticleCard = ({post,className}) => {
  return (
    <div className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${ className}`}>
       <Link to={`/blog/${post.slug}`}>
       <img className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60" src={post.photo ? 
          stables.UPLOAD_FOLDER_BASE_URL + post.photo 
          :images.samplePostImage} alt="title"/>
       </Link>
        <div className="p-5">
        <Link to={`/blog/${post.slug}`}>
        <h2 className="font-roboto font-bold text-xl text-dark-soft lg:text-[28px]">{post.title}</h2>
             <p className="text-dark-light mt-3 text-sm md:text-lg ">{post.caption}</p>
        </Link>
             <div className=" flex justify-between flex-nowrap items-center mt-6">
                <div className="flex items-center gap-x-2 md:gap-x-2.5">
                  <img  src={post.user.avatar ? 
          stables.UPLOAD_FOLDER_BASE_URL + post.user.avatar 
          :images.userImage} alt="postProfile" className="rounded-full w-9 h-9 md:w-10 md:h-10"/>
                  <div className="flex flex-col">
                    <h4 className="font-bold italic text-dark-soft md:text-base text-sm">
                      {post.user.name}
                    </h4>
                    <div className="flex items-center gap-x-2">
                      <span className={` ${post.user.verified ? "bg-[#36B37E]" :"bg-red-500"} w-fit bg-opacity-20 p-1.5 rounded-full`} >{post.user.verified ? <BsCheckLg  className="w-1.5 h-1.5 text-[#36B#&E]"/> : <MdOutlineClose className="w-1.5 h-1.5 text-red-500 " />}</span>
                      <span className="italic text-dark-light text-xs md:text-sm">{post.user.verified? "Verified" : "UnVerified"} Writer</span>
                    </div>
                  </div>
                </div>
                <span className="font-bold text-dark-light italic text-sm md:text-base">{new Date(post.createdAt).getDate()} { new Date(post.createdAt).toLocaleString("default", { month:"long"})}
                </span>
             </div>
        </div>
    </div>
  )
}

export default ArticleCard