export const WeekDays = {
  MONDAY: "Monday",
  TUESDAY: "Tuesday",
  WEDNESDAY: "Wednesday",
  THURSDAY: "Thursday",
  FRIDAY: "Friday",
};

export const collegePrograms = [
  { id: "CS", name: "Computer Science", minYear: 1, maxYear: 3 },
  { id: "MATH", name: "Mathematics", minYear: 1, maxYear: 3 },
  { id: "CTI", name: "CTI", minYear: 1, maxYear: 4 },
];


export let scheduleCells = [
  {
    day: WeekDays.MONDAY,
    cells: [
      {
        interval: "8-10",
        courses: {
          name:"POO",
          teacher_name:"I. Popescu",
          course_type: "Lecture",
          room: "Room 105"
          //course data for selected courses
        },
      },
      {
        interval: "10-12",
        courses: {
          name:"Web Development Fundamentals",
          teacher_name:"P. Ionescu",
          course_type: "Lecture",
          room: "Room 105"
          //course data for selected courses
        },
      },
      {
        interval: "12-14",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "14-16",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "16-18",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "18-20",
        courses: {
          //course data for selected courses
        },
      },
    ],
  },

  {
    day: WeekDays.TUESDAY,
    cells: [
      {
        interval: "8-10",
        courses: {
          
          //course data for selected courses
        },
      },
      {
        interval: "10-12",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "12-14",
        courses: {
          name:"Introduction to Programming with Python",
          teacher_name:"E. Stanescu",
          course_type: "Lecture",
          room: "Room 215"
          //course data for selected courses
        },
      },
      {
        interval: "14-16",
        courses: {
          name:"Introduction to Programming with Python",
          teacher_name:"P. Iancu",
          course_type: "Seminar",
          room: "Room 302"
          //course data for selected courses
        },
      },
      {
        interval: "16-18",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "18-20",
        courses: {
          //course data for selected courses
        },
      },
    ],
  },
  {
    day: WeekDays.WEDNESDAY,
    cells: [
      {
        interval: "8-10",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "10-12",
        courses: {
          name:"Web Development Fundamentals",
          teacher_name:"T. Bratosin",
          course_type: "Laboratory",
          room: "Room 216"
          //course data for selected courses
        },
      },
      {
        interval: "12-14",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "14-16",
        courses: {
          //course data for selected courses
          name:"POO",
          teacher_name:"D. Pop",
          course_type: "Laboratory",
          room: "Room 121"
        },
      },
      {
        interval: "16-18",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "18-20",
        courses: {
          //course data for selected courses
        },
      },
    ],
  },

  {
    day: WeekDays.THURSDAY,
    cells: [
      {
        interval: "8-10",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "10-12",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "12-14",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "14-16",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "16-18",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "18-20",
        courses: {
          //course data for selected courses
        },
      },
    ],
  },

  {
    day: WeekDays.FRIDAY,
    cells: [
      {
        interval: "8-10",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "10-12",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "12-14",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "14-16",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "16-18",
        courses: {
          //course data for selected courses
        },
      },
      {
        interval: "18-20",
        courses: {
          //course data for selected courses
        },
      },
    ],
  },
];

export const dummyCourses = [
  {
    id: 8,
    name: "Web Development Fundamentals",
    teacherId: 104,
    year: 1,
    program: "Computer Science",
    show: true,
  },
  {
    id: 9,
    name: "Introduction to Programming with Python",
    teacherId: 105,
    year: 1,
    program: "Computer Science",

    show: true,
  },
  {
    id: 10,
    name: "Computer Systems and Hardware",
    teacherId: 106,
    year: 1,
    program: "Computer Science",
    show: true,
  },
  {
    id: 11,
    name: "Digital Logic and Circuits",
    teacherId: 107,
    year: 1,
    program: "Computer Science",
    show: true,
  },
  {
    id: 12,
    name: "Introduction to Software Engineering",
    teacherId: 108,
    year: 1,
    program: "Computer Science",
    show: true,
  },

  // Year 2
  {
    id: 20,
    name: "Database Management Systems",
    teacherId: 109,
    year: 2,
    program: "Computer Science",
    show: true,
  },
  {
    id: 21,
    name: "Operating Systems Principles",
    teacherId: 110,
    year: 2,
    program: "Computer Science",
    show: true,
  },
  {
    id: 22,
    name: "Object-Oriented Programming in Java",
    teacherId: 111,
    year: 2,
    program: "Computer Science",
    show: true,
  },
  {
    id: 23,
    name: "Networks and Data Communication",
    teacherId: 112,
    year: 2,
    program: "Computer Science",
    show: true,
  },
  {
    id: 24,
    name: "Software Development Methodologies",
    teacherId: 113,
    year: 2,
    program: "Computer Science",
    show: true,
  },

  // Year 3
  {
    id: 30,
    name: "Artificial Intelligence Fundamentals",
    teacherId: 114,
    year: 3,
    program: "Computer Science",
    show: true,
  },
  {
    id: 31,
    name: "Mobile App Development",
    teacherId: 115,
    year: 3,
    program: "Computer Science",
    show: true,
  },
  {
    id: 32,
    name: "Advanced Algorithms and Complexity",
    teacherId: 116,
    year: 3,
    program: "Computer Science",
    show: true,
  },
  {
    id: 33,
    name: "Cybersecurity and Cryptography",
    teacherId: 117,
    year: 3,
    program: "Computer Science",
    show: true,
  },
  {
    id: 34,
    name: "Cloud Computing Concepts",
    teacherId: 118,
    year: 3,
    program: "Computer Science",
    show: true,
  },
  {
    id: 14,
    name: "Introduction to Statistics",
    teacherId: 219,
    year: 1,
    program: "Mathematics",
    show: true,
  },
  {
    id: 15,
    name: "Geometry and Trigonometry",
    teacherId: 220,
    year: 1,
    program: "Mathematics",
    show: true,
  },
  {
    id: 16,
    name: "Mathematical Proof Techniques",
    teacherId: 221,
    year: 1,
    program: "Mathematics",
    show: true,
  },
  {
    id: 17,
    name: "Discrete Mathematics",
    teacherId: 222,
    year: 1,
    program: "Mathematics",
    show: true,
  },
  {
    id: 18,
    name: "Calculus II",
    teacherId: 223,
    year: 1,
    program: "Mathematics",
    show: true,
  },

  // Year 2
  {
    id: 25,
    name: "Differential Equations",
    teacherId: 224,
    year: 2,
    program: "Mathematics",
    show: true,
  },
  {
    id: 26,
    name: "Abstract Algebra",
    teacherId: 225,
    year: 2,
    program: "Mathematics",
    show: true,
  },
  {
    id: 27,
    name: "Real Analysis",
    teacherId: 226,
    year: 2,
    program: "Mathematics",
    show: true,
  },
  {
    id: 28,
    name: "Mathematical Modeling",
    teacherId: 227,
    year: 2,
    program: "Mathematics",
    show: true,
  },
  {
    id: 29,
    name: "Number Theory and Cryptography",
    teacherId: 228,
    year: 2,
    program: "Mathematics",
    show: true,
  },

  // Year 3
  {
    id: 36,
    name: "Advanced Probability Theory",
    teacherId: 229,
    year: 3,
    program: "Mathematics",
    show: true,
  },
  {
    id: 37,
    name: "Complex Analysis",
    teacherId: 230,
    year: 3,
    program: "Mathematics",
    show: true,
  },
  {
    id: 38,
    name: "Topology and Topological Spaces",
    teacherId: 231,
    year: 3,
    program: "Mathematics",
    show: true,
  },
  {
    id: 39,
    name: "Numerical Analysis",
    teacherId: 232,
    year: 3,
    program: "Mathematics",
    show: true,
  },
  {
    id: 40,
    name: "Applied Linear Algebra",
    teacherId: 233,
    year: 3,
    program: "Mathematics",
    show: true,
  },
  {
    id: 41,
    name: "Introduction to Networking",
    teacherId: 234,
    year: 1,
    program: "CTI",
    show: true,
  },
  {
    id: 42,
    name: "Database Fundamentals",
    teacherId: 235,
    year: 1,
    program: "CTI",
    show: true,
  },
  {
    id: 43,
    name: "Introduction to Programming",
    teacherId: 236,
    year: 1,
    program: "CTI",
    show: true,
  },
  {
    id: 44,
    name: "Cybersecurity Basics",
    teacherId: 237,
    year: 1,
    program: "CTI",
    show: true,
  },
  {
    id: 45,
    name: "IT Project Management",
    teacherId: 238,
    year: 1,
    program: "CTI",
    show: true,
  },

  // Year 2
  {
    id: 46,
    name: "Network Security",
    teacherId: 239,
    year: 2,
    program: "CTI",
    show: true,
  },
  {
    id: 47,
    name: "Database Administration",
    teacherId: 240,
    year: 2,
    program: "CTI",
    show: true,
  },
  {
    id: 48,
    name: "Web Application Development",
    teacherId: 241,
    year: 2,
    program: "CTI",
    show: true,
  },
  {
    id: 49,
    name: "Ethical Hacking",
    teacherId: 242,
    year: 2,
    program: "CTI",
    show: true,
  },
  {
    id: 50,
    name: "IT Governance",
    teacherId: 243,
    year: 2,
    program: "CTI",
    show: true,
  },

  // Year 3
  {
    id: 51,
    name: "Cloud Infrastructure Management",
    teacherId: 244,
    year: 3,
    program: "CTI",
    show: true,
  },
  {
    id: 52,
    name: "Advanced Database Systems",
    teacherId: 245,
    year: 3,
    program: "CTI",
    show: true,
  },
  {
    id: 53,
    name: "Mobile Security",
    teacherId: 246,
    year: 3,
    program: "CTI",
    show: true,
  },
  {
    id: 54,
    name: "Blockchain Technology",
    teacherId: 247,
    year: 3,
    program: "CTI",
    show: true,
  },
  {
    id: 55,
    name: "IT Strategic Planning",
    teacherId: 248,
    year: 3,
    program: "CTI",
    show: true,
  },
  {
    id: 56,
    name: "Big Data Analytics",
    teacherId: 249,
    year: 4,
    program: "CTI",
    show: true,
  },
  {
    id: 57,
    name: "Machine Learning and AI Applications",
    teacherId: 250,
    year: 4,
    program: "CTI",
    show: true,
  },
  {
    id: 58,
    name: "Advanced Cybersecurity",
    teacherId: 251,
    year: 4,
    program: "CTI",
    show: true,
  },
  {
    id: 59,
    name: "IoT Solutions and Security",
    teacherId: 252,
    year: 4,
    program: "CTI",
    show: true,
  },
  {
    id: 60,
    name: "IT Innovation and Entrepreneurship",
    teacherId: 253,
    year: 4,
    program: "CTI",
    show: true,
  },
];

export let rooms = [
  { id: 1, name: "Room 101", show: true },
  { id: 2, name: "Room 102", show: true },
  { id: 3, name: "Room 103", show: true },
  { id: 4, name: "Room 104", show: true },
  { id: 5, name: "Room 105", show: true },
  { id: 6, name: "Room 201", show: true },
  { id: 7, name: "Room 202", show: true },
  { id: 8, name: "Room 203", show: true },
  { id: 9, name: "Room 204", show: true },
  { id: 10, name: "Room 205", show: true },
  { id: 11, name: "Room 301", show: true },
  { id: 12, name: "Room 302", show: true },
  { id: 13, name: "Room 303", show: true },
  { id: 14, name: "Room 304", show: true },
  { id: 15, name: "Room 305", show: true },
  { id: 16, name: "Room 401", show: true },
  { id: 17, name: "Room 402", show: true },
  { id: 18, name: "Room 403", show: true },
  { id: 19, name: "Room 404", show: true },
  { id: 20, name: "Room 405", show: true },
  { id: 21, name: "Room 501", show: true },
  { id: 22, name: "Room 502", show: true },
  { id: 23, name: "Room 503", show: true },
  { id: 24, name: "Room 504", show: true },
  { id: 25, name: "Room 505", show: true },
  { id: 26, name: "Room 601", show: true },
  { id: 27, name: "Room 602", show: true },
  { id: 28, name: "Room 603", show: true },
  { id: 29, name: "Room 604", show: true },
  { id: 30, name: "Room 605", show: true },
]

export const handleProgram = (user) => {
  if( user ) {
      switch (user.program){
          case "MATH":
              return "Mathematics";
          case "CS":
              return "Computer Science";
          case "CTI":
              return "CTI";
          default:
              break;
      }
      
  }
}

export const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status, data } = error.response;
    console.log("Error status:", status);
    console.log("Error message:", data.message);
    // Update state with the error message for displaying on the sign-in page
  } else if (error.request) {
      // The request was made but no response was received
      console.log("No response received:", error.request);
  } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error:", error);
  }
}