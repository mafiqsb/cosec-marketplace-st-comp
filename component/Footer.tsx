'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 lg:py-8 bottom-0">
      <div className="container mx-auto px-1 lg:px-12">
        <div className="flex flex-col items-center text-center justify-center gap-6 px-4 lg:py-8">
          <div className=" mt-4 flex flex-col lg:flex-row items-center justify-between w-full max-w-[90%] xl:max-w-[60%]">
            {/* LOGO */}
            <div className="text-white flex items-center justify-center font-extrabold text-xl mb-4 md:mb-0">
              <img
                src="/AnyComp_Logo.png"
                alt="company logo"
                className="h-20 w-20 object-cover"
              />
            </div>

            {/* Description */}
            <div className=" lg:mt-0 flex flex-col items-center lg:max-w-md text-center">
              <p className="text-sm text-gray-400">
                The objectives of this project is to assess the skills of the
                Frontend Developer who will be working on Anycomp. We primarily
                want to see if the developer possesses the necessary Technology
                Stack to work on the project - Anycomp: Platform for Company
                incorporation and management.
              </p>
            </div>

            {/* Button */}
            <div className="flex items-center mt-4 lg:mt-0">
              <button className="bg-[#003366] text-white font-semibold p-2.5 rounded-lg shadow-md hover:bg-[#002255b9] transition-all duration-300 ease-in-out cursor-pointer">
                Find Your Company
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} ANYCOMP. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
