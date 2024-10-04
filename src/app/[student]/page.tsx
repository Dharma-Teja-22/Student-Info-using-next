"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface Student {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: Address;
  email: string;
  phone: string;
  courses: string[];
  gpa: number;
  image: string;
}

export default function Page(id: any) {

  console.log(id,"dhkalfklaml---------------------")
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      // if (!id.searchParams.id) return "No ID, do not fetch";
      try {
        const res = await fetch(`http://freetestapi.com/api/v1/students/${id.searchParams.id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        } 
        const data = await res.json();
        setStudent(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;
  if (!student) return <p className="text-center">No student found.</p>;

  return (
    <>
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-20000">
      
      <Link
        href='/info' 
        className="mb-4 p-2 mr-[1240px] "
      >
        ← Back
      </Link>

      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105">
        <div className="flex items-center mb-4">
          {/* <img src={student.image} alt={student.name} className="w-32 h-32 rounded-full shadow-lg" /> */}
          <div className="flex-1 ml-4">
            <h1 className="text-3xl font-bold text-blue-600">{student.name}</h1>
            <p className="text-gray-700"><strong>Age:</strong> {student.age}</p>
            <p className="text-gray-700"><strong>Gender:</strong> {student.gender}</p>
            <p className="text-gray-700"><strong>Email:</strong> {student.email}</p>
            <p className="text-gray-700"><strong>Phone:</strong> {student.phone}</p>
            <p className="text-gray-700"><strong>GPA:</strong> {student.gpa}</p>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-4 ml-4 pt-4">
          <h3 className="font-semibold text-lg">Address</h3>
          <p><strong><i>street:</i></strong> {student.address.street}</p>
          <p><strong><i>city:</i></strong> {student.address.city}, {student.address.zip}</p>
          <p><strong><i>country:</i></strong> {student.address.country}</p>
        </div>

        <div className="border-t border-gray-300 mt-4 ml-4 pt-4">
          <h3 className="font-semibold text-lg">Courses</h3>
          <ul className="list-disc list-inside">
            {student.courses.map((course, index) => (
              <li key={index} className="text-gray-700 hover:text-blue-500 transition-colors duration-300">{course}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
}
