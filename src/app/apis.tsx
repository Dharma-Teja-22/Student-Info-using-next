import { StudInfo } from "./types/studInfo";

const baseUrl = "http://freetestapi.com/api/v1/students";

export const getAllStudents = async (): Promise<StudInfo[]> => {
  console.log(
    baseUrl,
    "Base URL ------------------------------------------------------------"
  );
  const res = await fetch(baseUrl);
  console.log(res, "Res");
  const result = await res.json();
  console.log(result, "Result");
  return result;
};
