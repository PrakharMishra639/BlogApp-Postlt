import parseJsonToHtml from "../../utils/parseJsonToHtml";
import React, {useState, useEffect} from 'react';
import MainLayout from "../../components/MainLayout";

import BreadCrumbs from "../../components/BreadCrumbs";
import { useSelector } from "react-redux";

import { Link,useParams } from "react-router-dom";
import { images,stables } from "../../constants";
import SuggestedPosts from "./container/SuggestedPosts";// Correct import
import SocialShareButtons from "../../components/SocialShareButtons";
import CommentsContainer from "../../components/comments/CommentsContainer";
import { useQuery } from "@tanstack/react-query";
import {  getAllPosts, getSinglePost } from "../../services/index/posts";

import ArticleDetailSkeleton from './components/ArticleDetailSkeleton';
import ErrorMessage from '../../components/ErrorMessage';
import Editor from '../../components/editor/Editor';




const ArticleDetailPage = () => {

  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setbreadCrumbsData] = useState([]);
  const[body , setBody] = useState(null)
  
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
    onSuccess: (data) => {
      
    },
  });
  
  useEffect(() => {
    window.scrollTo(0,0);
    if (data) {
      setbreadCrumbsData([
        { name: "Home", link: "/" },
        { name: "Blog", link: "/blog" },
        { name: data.title, link: `/blog/${data.slug}` }, // Use actual title
      ]);
      setBody(parseJsonToHtml(data?.body));
    }
  }, [data]); // Trigger effect when data changes
  
   

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
   
  });
 


  

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton/>
      ) : isError ? <ErrorMessage  message="Couldn't fetch the post detail"/> :(
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start" > {/* Corrected className */}
        <article className="flex-1 ">
          <BreadCrumbs data={breadCrumbsData} /> {/* Corrected prop name */}
          <img className="rounded-xl w-full"
          src={
            data?.photo
              ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
              : images.samplePostImage
          } alt={data?.title} />
         <div className="flex gap-3 mt-4">
         {data?.categories.map((category) => (
            <Link to= {`/blog?category=${category.name}`} className="text-primary  md:text-base text-sm font-roboto inline-block mt-4">
             {category.name}
            </Link>
          ))}
         </div>
          <h1 className="text-xl  md:text-[26px]font-medium font-roboto mt-4 text-dark-hard">
          {data?.title}
          </h1>
          <div className="w-full">
            {!isLoading && !isError && 
            ( <Editor
              onDataChange={(data) => {
                setBody(data);
              }}
                 content={data?.body}
                  editable={false} 
                />)}
           
            </div>
       
          <div className="mt-4 prose prose-sm sm:prose-base">
           
            {body}
     
          </div>
          <CommentsContainer 
          comments={data?.comments}
          className="mt-10" logginedUserId={userState?.userInfo?._id}
          postSlug={slug}/>
        </article>
      <div>
      <SuggestedPosts header="Latest Article" posts={postsData?.data} tags={data?.tags} className="mt-8 lg:mt-0 lg:max-w-xs" />
      <div className="mt-7">
        <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">Share on:</h2>
        <SocialShareButtons 
        url={ encodeURI(window.location.href)}  
       title={encodeURIComponent(data?.title)}/>
      </div>
      </div>
      </section>
      )}
     
    </MainLayout>
  );
}

export default ArticleDetailPage;
