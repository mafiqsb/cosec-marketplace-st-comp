'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
          <div className="text-2xl font-extrabold">AnyComp</div>

          <div className="text-gray-400 text-sm leading-relaxed text-center lg:text-left max-w-xl">
            This project evaluates the skills of a Frontend Developer for
            AnyComp — a platform for company incorporation and management. We're
            assessing the developer's capability with modern frontend
            technologies and UI design.
          </div>

          <div>
            <button className="bg-[#003366] hover:bg-[#002255] text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out">
              Contact Us
            </button>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AnyComp. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
