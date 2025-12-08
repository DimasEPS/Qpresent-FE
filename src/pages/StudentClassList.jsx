import React from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "@/layouts/StudentLayout";
import StudentClassCard from "@/components/student/StudentClassCard";

const classList = [
  {
    code: "CS201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sarah Johnson",
    term: "Fall 2024",
  },
  {
    code: "CS201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sarah Johnson",
    term: "Fall 2024",
  },
  {
    code: "CS201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sarah Johnson",
    term: "Fall 2024",
  },
  {
    code: "CS201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sarah Johnson",
    term: "Fall 2024",
  },
  {
    code: "CS201",
    title: "Data Structures & Algorithms",
    instructor: "Dr. Sarah Johnson",
    term: "Fall 2024",
  },
];

function StudentClassList() {
  const navigate = useNavigate();

  const handleClassClick = (classCode) => {
    navigate(`/student/class/${classCode}`);
  };

  return (
    <StudentLayout title="My Classes" activeMenu="classes">
      <div className="space-y-4 md:space-y-5">
        {classList.map((item, index) => (
          <StudentClassCard
            key={`${item.code}-${index}`}
            {...item}
            onClick={() => handleClassClick(item.code)}
          />
        ))}
      </div>
    </StudentLayout>
  );
}

export default StudentClassList;
