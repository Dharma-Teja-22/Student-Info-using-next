"use client";

import React, { useState } from 'react';
// import Navbar from '../navbar';
import Link from 'next/link';

const Page: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const data = {
    studentManagement: {
      title: 'Student Management',
      content: 'Easily manage your courses and track your gpa in one place.',
    },
    connectWithPeers: {
      title: 'Connect with Peers',
      content: 'Join study groups, collaborate on projects, and stay connected with classmates. Networking has never been easier with our integrated chat and forum features.',
    },
    accessResources: {
      title: 'Access Resources',
      content: 'Find all necessary academic resources, including lectures, notes, and more. You can also share your own materials and get feedback from peers.',
    },
  };

  const handleSectionClick = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  return (
    <div className="flex flex-col ">
      {/* <Navbar /> */}
      
      <main className="flex-grow container mx-auto p-6 mb-5">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to the Student Portal</h2>
          <p className="text-gray-700 mb-6">
            Access all your academic resources, track your progress, and connect with peers.
            Everything you need for your academic journey is right here.
          </p>
          <Link href={'/info'}>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500">
              Student Info
            </button>
          </Link>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded shadow-gray-400 shadow-xl cursor-pointer" onClick={() => handleSectionClick('studentManagement')}>
            <h3 className="text-xl font-semibold mb-2">Student Management</h3>
            <p className="text-gray-600">Manage student profiles, track academic progress, and streamline communication in one centralized platform.</p>
            {expandedSection === 'studentManagement' && (
              <p className="mt-2 text-gray-500">{data.studentManagement.content}</p>
            )}
          </div>

          <div className="bg-white p-6 rounded shadow-gray-400 shadow-xl cursor-pointer" onClick={() => handleSectionClick('connectWithPeers')}>
            <h3 className="text-xl font-semibold mb-2">Connect with Peers</h3>
            <p className="text-gray-600">Join study groups, collaborate on projects, and stay connected with classmates.</p>
            {expandedSection === 'connectWithPeers' && (
              <p className="mt-2 text-gray-500">{data.connectWithPeers.content}</p>
            )}
          </div>

          <div className="bg-white p-6 rounded shadow-gray-400 shadow-xl cursor-pointer" onClick={() => handleSectionClick('accessResources')}>
            <h3 className="text-xl font-semibold mb-2">Access Resources</h3>
            <p className="text-gray-600">Find all necessary academic resources, including lectures, notes, and more.</p>
            {expandedSection === 'accessResources' && (
              <p className="mt-2 text-gray-500 ">{data.accessResources.content}</p>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-16">
        <div className="container text-center">
          <p>&copy; 2024 Student Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
