import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { AiFillRedditSquare } from "react-icons/ai";
import { FaWhatsappSquare } from "react-icons/fa";

const SocialShareButtons = ({url,title}) => {
  return (
    <div className="w-full flex justify-between mt-8">
      <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/dialog/share?app_id=1180206992856877&display=popup&href=${url}`}>
      <FaFacebook className="text-[#3b5998] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${url}`}>
      <FaTwitterSquare className="text-[#00acee] w-12 h-auto" />
      </a>
      <a target="_blank" rel="noreferrer" href={`http://www.reddit.com/submit?url=${url}&title=${title}`}>
      <AiFillRedditSquare className="text-[#ff4500] w-12 h-auto"  />
      </a>
      <a target="_blank" rel="noreferrer" href={`https://api.whatsapp.com/send/?text=${url}`}>
      <FaWhatsappSquare className="text-[#25D366] w-12 h-auto"  />
      </a>
    </div>
  )
}

export default SocialShareButtons