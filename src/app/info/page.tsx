"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

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

  const handleStudentClick = (id: number) => {
    console.log("Student ID:", id);
    router.push(`/student?id=${id}`);
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />

      <div className="flex justify-end mt-2 mr-4">
        <label className="input input-bordered flex items-center w-96 gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search by Nam"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredStudents.map(student => (
          <div
            key={student.id}
            className="bg-white shadow-xl rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleStudentClick(student.id)}
          >
            {/* {student.image && (
              <img
                src={student.image}
                alt={`${student.name}'s image`}
                className="w-full h-32 object-cover rounded-t-lg"
              />
            )} */}
            
            <h2 className="text-xl font-bold mt-2">{student.name}</h2>
            <p className="text-gray-600">Email: {student.email}</p>
            <p className="text-gray-600">Phone: {student.phone}</p>
            <p className="text-gray-600">Age: {student.age}</p>
            <p className="text-gray-600">Gender: {student.gender}</p>
          </div>
        ))}
      </div>
    </>
  );
}
