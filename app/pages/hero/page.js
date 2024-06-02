"use client";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Footer from "@/app/components/Footer";
import End from "@/app/components/End";
import { useState , useEffect, useRef } from "react";

export default function HeroPage() {
  const texts = ["somthing awesome", "something cool", "something interesting"];
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isVisible, setIsVisible] = useState(false);

  const speed = 100;
  const pause = 2000
  const divRef = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && charIndex < texts[currentIndex].length) {
        setCurrentText((prev) => prev + texts[currentIndex].charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText((prev) => prev.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === texts[currentIndex].length) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const typingInterval = setInterval(handleTyping, speed);

    return () => clearInterval(typingInterval);
  }, [charIndex, isDeleting, texts, currentIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1, // Adjust this value as needed
      }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);
  
  return (
    <>
      <div className="h-full rounded-md mb-8">
        <div className="h-[48vh] text-center m-2 p-1 my-6 text-slate-800 flex flex-col gap-24 ">
          <span className="">
            <h1 className="font-pizzeta text-5xl w-[44%] m-6 mx-auto">
              Ready to learn  <span id="changing-text">{currentText}</span>
            </h1>
            <p className="cursive text-gray-500 m-2">
              We create practical projects for awesome Students.
            </p>
          </span>
          <span>
            <input
              type="text"
              name=""
              placeholder="| Search our library, e.g learn Vue , Angular , React"
              id=""
              className="w-[80%] mx-auto bg-white shadow-xl my-8 shadow-gray-300 py-[14px] mt-4 text-start outline-none rounded-sm p-2"
            />
          </span>
        </div>
        <div ref={divRef}  className={`mx-auto w-[80%] h-44 m-8 my-16 flex justify-between items-start transition-transform duration-1000 ${
        isVisible ? 'animate-slideInLeft' : 'opacity-0'
      }`}>
          <span>
            <h1 className=" text-3xl font-pizzeta text-slate-800 my-2">
              Practical Projects to get you ahead.
            </h1>
            <p className="text-gray-500">
              Rather than to just teach theory.we focus on real code to inspire
              your next project.
            </p>
            <p className="text-gray-500">
              Learning shouldn't be boring, so let's have some fun.
            </p>
          </span>
          <span>
            <button className="flex justify-center items-center py-3 bg-blue-500 rounded-md text-white text-sm p-2">
              <SearchIcon style={{ width: "20px", height: "20px" }} />
              <p className="mx-1">Browse Library</p>
            </button>
          </span>
        </div>
        <div className="glassmorphism my-10 w-[67%] mx-auto items-center p-4 flex justify-start h-48">
          <span>
            <img
              className="rounded-full object-cover mx-4 mr-14"
              style={{ width: "100px", height: "100px" }}
              src="data:image/webp;base64,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"
              alt=""
            />
          </span>
          <span className="w-[40vw] text-gray-500">
            <p>
              My carer started as a programmer.Out of necessity I needed to
              learn how to handle the entire stack.Codecourse took me from
              basically no knowledge of development to being able to handle
              every aspect of it.
            </p>
            <pre>Elom musk, California, United States</pre>
          </span>
        </div>
        <div className="card overflow-hidden my-12 py-8 flex justify-between items-center">
          <div className="p-2 ml-16 flex flex-col ">
            <span>
              <h2 className="font-pizzeta text-2xl my-2">Latest Content</h2>
              <p className="text-gray-500">Fresh from library</p>
            </span>
            <span className="mt-12 my-2">
              <a
                className="hover:text-blue-400 text-blue-600 hover:cursor-pointer"
                href="/"
              >
                Browse everything
              </a>
              <ArrowRightAltIcon
                style={{ width: "20px", height: "20px", color: "blue" }}
              />
            </span>
          </div>
          <ul className="flex gap-4 flex-row relative right-[-5rem]">
            <div class="w-72 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>

            <div class="w-72 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>

            <div class="p-6 w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </ul>
        </div>
        <div className="my-8 py-8">
          <div class="w-[60vw] mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex gap-14  items-center">

            <span className="">
              <a href="#">
                <h5 class="mb-2 w-72 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </span>
            <span className="w-80">
              <a
                href="#"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Read more
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </span>
          </div>
          </div>
        </div>
        <div className="flex justify-around">
          

<div class="w-80  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
       <img className="w-full" src="data:image/png;base64,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" alt="" />
    </a>
    <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Watch Now</a>
        </div>
    </div>
</div>



<div class="w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
       <img className="w-full" src="data:image/jpeg;base64,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" alt="" />
    </a>
    <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Watch Now</a>
        </div>
    </div>
</div>



<div class="w-80 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdAApoARJFnMEsgg2Vu_VMw0rBLQfz-aknw&s" className="w-full" alt="" />
    </a>
    <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Watch Now</a>
        </div>
    </div>
</div>

        </div>
        <div>
        <div className="glassmorphism my-10 w-[67%] mx-auto items-center p-4 flex justify-start h-48">
          <span>
            <img
              className="rounded-full object-cover mx-4 mr-14"
              style={{ width: "100px", height: "100px" }}
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </span>
          <span className="w-[40vw] text-gray-500">
            <p>
              I credit CodeCourse as the single most benefecial learning resource to my development carrer. I have been using their courses for the past 2 years and I am very satisfied with the quality of the courses. I highly recommend CodeCourse to anyone who is looking to learn web development.
            </p>
            <pre>Andrew Tate,  Romania</pre>
          </span>
        </div>
        </div>
        <div>
          <End />
        </div>
        <Footer />
      </div>
    </>
  );
}
