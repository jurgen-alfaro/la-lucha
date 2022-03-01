import { useContext, useState, useEffect } from "react";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative min-h-screen md:flex'>
      {/* Mobile Menu Bar */}
      <div className='bg-gray-800 text-gray-100 flex justify-between md:hidden'>
        {/* logo */}
        <a href='#' className='block p-4 text-white font-bold'>
          Better Dev
        </a>
        {/* logo menu button */}
        <button
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-700'
          onClick={handleClick}
        >
          <svg
            className='w-5 h-5'
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        </button>
      </div>

      {/* sidebar */}
      <div
        className={`sidebar bg-blue-800 text-blue-100 w-64 space-y-6 px-2 py-7 absolute md:relative md:translate-x-0 inset-y-0 left-0 transform ${
          isOpen ? `-translate-x-full` : ``
        } transition duration-200 ease-in-out`}
      >
        {/* logo */}
        <a href='#' className='text-white flex items-center space-x-2 px-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
            />
          </svg>
          <span className='text-2xl font-extrabold'>Better Dev</span>
        </a>
        {/* nav */}
        <nav>
          <a
            href=''
            className='block py-2.5 px-4 transition duration-200 rounded hover:bg-blue-700 hover:text-white'
          >
            Home
          </a>
          <a
            href=''
            className='block py-2.5 px-4 transition duration-200 rounded hover:bg-blue-700 hover:text-white'
          >
            About
          </a>
          <a
            href=''
            className='block py-2.5 px-4 transition duration-200 rounded hover:bg-blue-700 hover:text-white'
          >
            Features
          </a>
          <a
            href=''
            className='block py-2.5 px-4 transition duration-200 rounded hover:bg-blue-700 hover:text-white'
          >
            Pricing
          </a>
        </nav>
      </div>

      {/* content */}
      <div className='flex-1 p-10 text-2xl font-bold'></div>
    </div>
  );
}

export default Dashboard;
