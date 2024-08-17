import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { getSingleCategory, updateCategory } from '../../../../services/index/postCategories';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditCategories = () => {

const userState =useSelector((state) =>state.user);
const [categoryTitle, setCategoryTitle]= useState("");
const queryClient =useQueryClient();
const navigate = useNavigate();
const { slug } = useParams();


const {data, isLoading, isError} = useQuery({
    queryFn: async () => getSingleCategory({ slug }),
    queryKey: ["category", slug],
    onSuccess: (data) => {
     
      
     
    },
    refetchOnWindowFocus: false,
  });

  useEffect(()=> {
    setCategoryTitle(data?.title)
  },[data])

const {mutate: mutateUpdateCategory, isLoading:isLoadingUpdateCategory} = useMutation({
    mutationFn:({title, slug, token})=>{
      return updateCategory({
        title,
        slug,
        token,
      })  
    },
    onSuccess: (data) => {
    queryClient.invalidateQueries(["categories", slug]);
    toast.success("Category is updated");
    navigate(`/admin/categories/manage/edit/${data._id}`, {replace:true})
    },
    onError: (error) =>{
      toast.error(error.message);
      console.log(error);
    },
  });
  const handleUpdateCategory = () => {
    if(!categoryTitle) return;
    mutateUpdateCategory({
        title:categoryTitle,
        slug,
        token:userState.userInfo.token,
    });
  }

  return (
    <div className="col-span-4 py-8">
     <h4 className="text-lg leading-tight">Update Category</h4>
     <div className="d-form-control w-full mt-6">
           <input
           value={categoryTitle}
          onChange = {(e) => setCategoryTitle(e.target.value)}
          placeholder="category title"
         className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl  md:text-[26px]font-medium font-roboto  text-dark-hard" />
           <button disabled={isLoadingUpdateCategory || isLoading || isError} type="button " onClick={handleUpdateCategory} className="disabled:cursor-not-allowed mt-3 disabled:opacity-70 w-fit bg-green-500 text-white font-semibold rounded-lg px-4 py-2">
            Update Category
          </button>
         </div>
   </div>
  )
}

export default EditCategories