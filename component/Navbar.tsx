'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { FaBars, FaGear, FaRegBell } from 'react-icons/fa6';
import { IoIosArrowForward } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems: {
  key: 'manage' | 'secretary' | 'incorporate' | 'sign';
  label: string;
  href: string;
  dropdown: { label: string; href: string }[];
}[] = [
  {
    key: 'manage',
    label: 'Manage Company',
    href: '/managecompany',
    dropdown: [
      { label: 'Company Profile', href: '/managecompany/profile' },
      { label: 'Directors', href: '/managecompany/directors' },
    ],
  },
  {
    key: 'secretary',
    label: 'Company Secretary',
    href: '/companysecretary',
    dropdown: [{ label: 'Secretary List', href: '/companysecretary/list' }],
  },
  {
    key: 'incorporate',
    label: 'Incorporate Company',
    href: '/incorporatecompany',
    dropdown: [
      { label: 'New Application', href: '/incorporatecompany/new' },
      { label: 'Track Status', href: '/incorporatecompany/status' },
    ],
  },
  {
    key: 'sign',
    label: 'Sign Documents',
    href: '/signdocuments',
    dropdown: [{ label: 'Pending Signatures', href: '/signdocuments/pending' }],
  },
];

export default function Navbar() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [isShrunk, setIsShrunk] = useState(false);
  const [menuState, setMenuState] = useState({
    manage: true,
    secretary: true,
    incorporate: true,
    sign: true,
  });

  const [shrinkMenu, setShrinkMenu] = useState(false);

  const handleToggle = () => {
    setIsShrunk((prev) => !prev);
  };

  const toggleMenu = (key: keyof typeof menuState) => {
    setMenuState((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col bg-white text-black">
      <div className=" hidden xl:flex w-[80%] mx-auto gap-8 items-center justify-center h-30 font-bold cursor-pointer sticky z-50">
        <div className="text-[#003366] font-extrabold text-xl">
          <Link href="/">
            <img
              src="/AnyComp_Logo.png"
              alt="company logo"
              className="h-20 w-20 object-cover"
            />
          </Link>
        </div>
        <div className=" flex space-x-4">
          <div className="flex space-x-10 items-center mr-12 relative z-50">
            {menuItems.map((item, index) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center cursor-pointer text-black font-bold hover:text-[#003366] transition-all duration-300 ease-in-out">
                  <Link href={item.href}>{item.label}</Link>
                  <BiChevronDown className="ml-1 w-4 h-4" />
                </div>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-8 bg-white shadow-lg rounded-md py-2 w-48"
                    >
                      {item.dropdown.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#f0f4f8]"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div>
            <div
              className={`border-2 border-[#d8dadd] rounded-3xl flex items-center justify-center transition-all duration-300 ${
                isShrunk ? 'w-[60px]' : 'w-[280px]'
              } h-[40px]`}
            >
              <div className="flex items-center justify-center gap-4 w-full">
                <div onClick={handleToggle} className="cursor-pointer">
                  <FaBars className="text-xl text-black" />
                </div>

                {!isShrunk && (
                  <>
                    <div>
                      <FaRegBell />
                    </div>
                    <div>
                      <FaGear />
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/profile.png"
                        alt="profile"
                        className="h-8 w-8 object-cover rounded-full"
                      />
                      <p className="font-light text-sm">Joachim Berthier</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small Tab Navbar */}
      <div className="z-10 flex flex-col xl:hidden font-bold cursor-pointer">
        <div className="z-5 flex justify-between items-center p-4 bg-white shadow-md">
          <div className="text-[#003366] font-extrabold text-xl ml-5">
            <img
              src="/AnyComp_Logo.png"
              alt="company logo"
              className="h-10 w-10 object-cover"
            />
          </div>
          <div className="relative flex items-center justify-center w-10 h-10 mr-5">
            <div
              onClick={() => setSideBarOpen(true)}
              className={`text-2xl cursor-pointer transition-all duration-300 ease-in-out transform absolute ${
                sideBarOpen ? 'scale-0 rotate-180' : 'scale-100 rotate-0'
              }`}
            >
              <FaBars />
            </div>
            <div
              onClick={() => {
                setSideBarOpen(false);
                setMenuState({
                  manage: true,
                  secretary: true,
                  incorporate: true,
                  sign: true,
                });
              }}
              className={`text-3xl cursor-pointer transition-all duration-300 ease-in-out transform absolute ${
                sideBarOpen ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
              }`}
            >
              <RxCross2 />
            </div>
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 h-screen bg-white w-[100%] shadow-lg transform transition-transform duration-500 ease-in-out ${
            sideBarOpen ? 'translate-x-0' : '-translate-x-full'
          } flex flex-col z-3`}
        >
          <div className="flex flex-col space-y-4 w-[80%] mt-24 lg:mt-40 ml-9 lg:ml-12 md:w-[90%] text-lg flex-grow transition-all duration-300">
            {menuItems.map((item) => (
              <div key={item.label}>
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggleMenu(item.key)}
                >
                  <a className="text-black font-bold hover:text-[#003366] transition-all duration-300 ease-in-out cursor-pointer">
                    {item.label}
                  </a>
                  <IoIosArrowForward
                    className={`transition-transform duration-300 ${
                      !menuState[item.key] ? 'rotate-90' : ''
                    }`}
                  />
                </div>

                {!menuState[item.key] && (
                  <div className="ml-4 mt-2 space-y-2 text-sm">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block text-gray-700 hover:text-[#003366] transition-all duration-300 ease-in-out"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-auto flex justify-end w-full mb-6">
            <div className="flex items-center justify-end gap-4 w-full mr-8">
              <div className="flex items-center gap-2">
                <p className="font-light text-sm">Joachim Berthier</p>
                <img
                  src="/profile.png"
                  alt="profile"
                  className="h-8 w-8 object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
