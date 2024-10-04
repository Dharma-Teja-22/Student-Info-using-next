"use client";

import { useEffect, useState } from "react";
import Navbar from "../navbar";

export interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: { [key: string]: any };
  email: string;
  phone: string;
  gpa: number;
  image: string;
}

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://freetestapi.com/api/v1/students");
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mt-4">
          Student Result List
        </h1>

        <div className="flex justify-end mr-4 mb-4">
          <label className="input input-bordered flex items-center w-96 gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-85"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="font-bold">
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal align-middle">
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Gender</th>
                <th className="py-3 px-6 text-left">Age</th>
                <th className="py-3 px-6 text-left">GPA / 5</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-6">{student.name}</td>
                  <td className="py-3 px-6">{student.email}</td>
                  <td className="py-3 px-6">{student.gender}</td>
                  <td className="py-3 px-6">{student.age}</td>
                  <td className="py-3 px-6">{student.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
