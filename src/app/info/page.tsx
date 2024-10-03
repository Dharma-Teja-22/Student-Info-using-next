"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

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

export default function page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try 
      {
        const res = await fetch("http://freetestapi.com/api/v1/students");
        if (!res.ok) 
        {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setStudents(data);
      } 
      catch (err) 
      {
        setError((err as Error).message);
      } 
      finally 
      {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleStudentClick = (id: number) => {
    console.log("Student ID:", id);
    
    router.push(`/student?id=${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {students.map((student) => (
        <div
          key={student.id}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => handleStudentClick(student.id)}
        >
          {/* <img src={student.image} alt={`${student.name}'s image`} className="w-full h-32 object-cover rounded-t-lg" /> */}
          {/* <img src="data:image/jpeg;base64,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" 
          alt={`${student.name}'s image`} className="w-full h-32 object-cover rounded-t-lg" /> */}
          <h2 className="text-xl font-bold mt-2">{student.name}</h2>
          <p className="text-gray-600">Email: {student.email}</p>
          <p className="text-gray-600">Phone: {student.phone}</p>
          <p className="text-gray-600">Age: {student.age}</p>
          <p className="text-gray-600">Gender: {student.gender}</p>
        </div>
      ))}
    </div>
  );
}
