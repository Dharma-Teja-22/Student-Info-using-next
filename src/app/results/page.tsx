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

export default function Page() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">Student Result List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="font-bold">
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal align-middle">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Gender</th>
              <th className="py-3 px-6 text-left">Age</th>
              <th className="py-3 px-6 text-left">GPA  / 5</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {students.map((student) => (
              <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-100 transition-colors">
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
  );
}
