import React from 'react';
import MainLayout from './MainLayout';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <MainLayout>
      <section className="bg-gray-50 py-16">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="text-center lg:text-left">
              <img
                src="https://i.imgur.com/WbQnbas.png"
                alt="About Us"
                className="w-full h-auto object-cover rounded-lg  transform hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <div className="text-center lg:text-left">
              <span className="text-indigo-600 text-sm uppercase tracking-wider border-b-2 border-indigo-600">About Us</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-800">
                About <span className="text-indigo-600">Our Company</span>
              </h2>
              <p className="mt-6 text-gray-700 leading-relaxed">
              Postlt is a dynamic and user-friendly blogging platform designed to empower individuals and businesses to share their stories,
               insights, and expertise with the world. Our mission is to provide a seamless and engaging experience for both content creators
                and readers alike. With features like easy-to-use tools, responsive design, and robust security, Postlt makes it simple 
                to publish, manage, and promote your content.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto px-6 lg:px-8 mt-16">
          <div className="lg:w-1/2 mx-auto text-center">
            <span className="block text-lg font-semibold text-indigo-600">Why Choose Us</span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-800">
             We make our customers happy by giving great services.
            </h2>
            <p className="mt-6 text-gray-700 leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using great User-deisgn is that it has a more-or-less.
            </p>
            <p className="mt-6 text-gray-700 leading-relaxed">
            At Postlt, we make our customers happy by providing an intuitive platform that simplifies content creation and management while ensuring their stories reach a wide audience.
             We focus on delivering a seamless user experience, backed by responsive support and continuous improvements.
            </p>
           <Link to="/"
              className="inline-flex items-center justify-center mt-8 py-3 px-7 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md shadow-lg transition-all duration-300"
           >
              Get Started
              </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutUs;
