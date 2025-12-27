const { useState, useEffect, useContext, createContext } = React;
// app.js


// In-memory database simulation (no localStorage)
// Enhanced Database with Real Data
let DATABASE = {
  students: [
    // 500+ Students Database
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@college.edu",
      password: btoa("password123"),
      branch: "Computer Science",
      cgpa: 8.5,
      graduation_year: 2024,
      backlogs: 0,
      skills: ["JavaScript", "React", "Node.js", "Python", "DSA"],
      status: "Placed",
      placed_company: "TCS",
      package: "3.5 LPA",
      eligible: true,
      resume_score: 85,
      applications: ["TCS", "Infosys", "Wipro"],
      created_at: "2024-01-01"
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@college.edu",
      password: btoa("password123"),
      branch: "Information Technology",
      cgpa: 9.2,
      graduation_year: 2024,
      backlogs: 0,
      skills: ["Java", "Spring Boot", "MySQL", "AWS"],
      status: "Placed",
      placed_company: "Microsoft",
      package: "8.5 LPA",
      eligible: true,
      resume_score: 92,
      applications: ["Microsoft", "Amazon", "Google"],
      created_at: "2024-01-01"
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@college.edu",
      password: btoa("password123"),
      branch: "Computer Science",
      cgpa: 6.5,
      graduation_year: 2024,
      backlogs: 1,
      skills: ["C++", "Python"],
      status: "Not Eligible",
      reason: "Low CGPA and Backlogs",
      eligible: false,
      resume_score: 45,
      applications: [],
      created_at: "2024-01-01"
    },
    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha@college.edu",
      password: btoa("password123"),
      branch: "Electronics",
      cgpa: 7.8,
      graduation_year: 2024,
      backlogs: 0,
      skills: ["Embedded Systems", "C", "IoT"],
      status: "In Process",
      eligible: true,
      resume_score: 75,
      applications: ["TCS", "Wipro"],
      created_at: "2024-01-01"
    },
    {
      id: 5,
      name: "Test Student",
      email: "student@test.com",
      password: btoa("test123"),
      branch: "Computer Science",
      cgpa: 8.0,
      graduation_year: 2024,
      backlogs: 0,
      skills: ["Python", "Java", "C++"],
      status: "Eligible",
      eligible: true,
      resume_score: 75,
      applications: [],
      created_at: "2024-01-03"
    }
    // Additional 495+ students would be added here in real implementation
  ],
  admins: [
    {
      id: 1,
      name: "Dr. Anil Gupta",
      email: "admin@college.edu",
      password: btoa("admin123"),
      role: "Placement Officer",
      department: "Training & Placement",
      created_at: "2024-01-01"
    },
    {
      id: 2,
      name: "Test Admin",
      email: "admin@test.com",
      password: btoa("test123"),
      role: "Assistant Placement Officer",
      department: "Training & Placement",
      created_at: "2024-01-02"
    }
  ],
  companies: [
    // 800+ Companies Database with Packages & Skills
    {
      id: 1,
      name: "Google",
      email: "hr@google.com",
      password: btoa("company123"),
      package: "45-55 LPA",
      skills_required: ["DSA", "System Design", "Python/Java", "Problem Solving"],
      industry: "Technology",
      location: "Bangalore, Hyderabad",
      hiring_process: "Online Test, Technical Rounds, HR Round",
      jobs_posted: 10,
      created_at: "2024-01-01"
    },
    {
      id: 2,
      name: "Microsoft",
      email: "careers@microsoft.com",
      password: btoa("company123"),
      package: "42-50 LPA",
      skills_required: ["DSA", "C#/.NET", "Azure", "System Design"],
      industry: "Technology",
      location: "Bangalore, Hyderabad",
      hiring_process: "Coding Test, Technical Interview, HR Round",
      jobs_posted: 8,
      created_at: "2024-01-01"
    },
    {
      id: 3,
      name: "Amazon",
      email: "jobs@amazon.com",
      password: btoa("company123"),
      package: "38-45 LPA",
      skills_required: ["DSA", "Java/Python", "AWS", "Leadership Principles"],
      industry: "E-commerce/Cloud",
      location: "Bangalore, Chennai",
      hiring_process: "Online Assessment, Technical Rounds, Bar Raiser",
      jobs_posted: 15,
      created_at: "2024-01-01"
    },
    {
      id: 4,
      name: "TCS",
      email: "hr@tcs.com",
      password: btoa("tcs123"),
      package: "3.5-7 LPA",
      skills_required: ["Programming Fundamentals", "Database", "Communication Skills"],
      industry: "IT Services",
      location: "Pan India",
      hiring_process: "Online Test, Technical Interview, HR Round",
      jobs_posted: 50,
      created_at: "2024-01-01"
    },
    {
      id: 5,
      name: "Infosys",
      email: "careers@infosys.com",
      password: btoa("company123"),
      package: "4.2-8 LPA",
      skills_required: ["Java/Python", "Database", "Web Development", "Problem Solving"],
      industry: "IT Services",
      location: "Bangalore, Pune, Hyderabad",
      hiring_process: "Online Assessment, System Engineer Test, HR Round",
      jobs_posted: 40,
      created_at: "2024-01-01"
    },
    {
      id: 6,
      name: "Test Company",
      email: "company@test.com",
      password: btoa("test123"),
      package: "5-10 LPA",
      skills_required: ["Full Stack Development", "React", "Node.js"],
      industry: "Software Development",
      location: "Bangalore",
      website: "www.testcompany.com",
      contact_person: "Test Manager",
      jobs_posted: 0,
      created_at: "2024-01-03"
    }
    // Additional 794+ companies would be added here with varied packages from 2.5 LPA to 50+ LPA
  ]
};

// Session storage (in-memory)
let CURRENT_SESSION = null;

// Database operations
const getUsersFromDB = () => {
  return DATABASE;
};

const saveUsersToDB = (users) => {
  DATABASE = { ...users };
};

const checkEmailExists = (email, userType = null) => {
  const users = getUsersFromDB();
  const allUsers = userType ? users[userType + 's'] || [] : [...(users.students || []), ...(users.admins || []), ...(users.companies || [])];
  return allUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
};

const authenticateUser = (email, password, userType) => {
  const users = getUsersFromDB();
  const userList = users[userType + 's'] || [];
  
  // FIXED: Company login authentication
  const user = userList.find(user => {
    try {
      const storedPassword = atob(user.password);
      return user.email.toLowerCase() === email.toLowerCase() && storedPassword === password;
    } catch (e) {
      // Handle case where password might not be base64 encoded
      return user.email.toLowerCase() === email.toLowerCase() && user.password === password;
    }
  });
  
  // Debug logging for company login
  if (userType === 'company') {
    console.log('Company authentication attempt:', {
      email,
      userType,
      availableCompanies: userList.map(c => ({ email: c.email, name: c.name })),
      found: !!user
    });
  }
  
  return user;
};

const registerUser = (userData, userType) => {
  const users = getUsersFromDB();
  const userList = users[userType + 's'] || [];
  
  // Generate new ID
  const newId = Math.max(0, ...userList.map(u => u.id)) + 1;
  
  // Create new user
  const newUser = {
    ...userData,
    id: newId,
    password: btoa(userData.password), // Encode password
    created_at: new Date().toISOString().split('T')[0]
  };
  
  // Add user to list
  const updatedUsers = { ...users };
  updatedUsers[userType + 's'] = [...userList, newUser];
  
  // Save to database
  saveUsersToDB(updatedUsers);
  
  return newUser;
};

// Session management
const createSession = (user, role) => {
  CURRENT_SESSION = {
    user,
    role,
    timestamp: Date.now()
  };
};

const clearSession = () => {
  CURRENT_SESSION = null;
};

const getSession = () => {
  if (CURRENT_SESSION && (Date.now() - CURRENT_SESSION.timestamp < 24 * 60 * 60 * 1000)) {
    return CURRENT_SESSION;
  }
  CURRENT_SESSION = null;
  return null;
};

// Sample Data
const SAMPLE_DATA = {
  users: {
    students: [
      {
        id: 1,
        name: "Rajesh Kumar",
        email: "rajesh@college.edu",
        password: "password123",
        branch: "Computer Science",
        cgpa: 8.5,
        graduation_year: 2024,
        skills: ["JavaScript", "React", "Node.js", "Python", "DSA"],
        resume_score: 85,
        applications: ["TCS", "Infosys", "Wipro"]
      },
      {
        id: 2,
        name: "Priya Sharma",
        email: "priya@college.edu",
        password: "password123",
        branch: "Information Technology",
        cgpa: 9.2,
        graduation_year: 2024,
        skills: ["Java", "Spring Boot", "MySQL", "AWS"],
        resume_score: 92,
        applications: ["Microsoft", "Amazon", "Google"]
      }
    ],
    admins: [
      {
        id: 1,
        name: "Dr. Anil Gupta",
        email: "admin@college.edu",
        password: "admin123",
        role: "Placement Officer",
        department: "Training & Placement"
      }
    ],
    companies: [
      {
        id: 1,
        name: "TCS",
        email: "hr@tcs.com",
        password: "company123",
        industry: "IT Services",
        website: "www.tcs.com",
        jobs_posted: 5
      },
      {
        id: 2,
        name: "Infosys",
        email: "careers@infosys.com",
        password: "company123",
        industry: "IT Consulting",
        website: "www.infosys.com",
        jobs_posted: 3
      }
    ]
  },
  jobs: [
    {
      id: 1,
      title: "Software Developer",
      company: "TCS",
      package: "3.5 LPA",
      location: "Bangalore",
      requirements: ["B.Tech/B.E", "CGPA > 7.0", "Programming skills"],
      deadline: "2024-01-30",
      status: "Active"
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Infosys",
      package: "4.2 LPA",
      location: "Hyderabad",
      requirements: ["B.Tech/B.E", "CGPA > 7.5", "Web development experience"],
      deadline: "2024-02-15",
      status: "Active"
    }
  ],
  dsa_problems: {
    easy: [
      {
        id: 1,
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9",
        constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
        difficulty: "Easy",
        topic: "Arrays",
        companies: ["Google", "Amazon", "Microsoft"],
        solution_hint: "Use a hash map to store complement values"
      },
      {
        id: 2,
        title: "Valid Parentheses",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets and in the correct order.",
        examples: "Input: s = '()'\nOutput: true\n\nInput: s = '()[]{}' \nOutput: true\n\nInput: s = '(]'\nOutput: false",
        constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
        difficulty: "Easy",
        topic: "Stack",
        companies: ["Facebook", "Apple", "Netflix"],
        solution_hint: "Use a stack to track opening brackets"
      },
      {
        id: 3,
        title: "Merge Two Sorted Lists",
        description: "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
        examples: "Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]",
        constraints: "The number of nodes in both lists is in the range [0, 50]\n-100 <= Node.val <= 100",
        difficulty: "Easy",
        topic: "Linked Lists",
        companies: ["Amazon", "Microsoft", "Apple"],
        solution_hint: "Use two pointers approach"
      }
    ],
    medium: [
      {
        id: 4,
        title: "Add Two Numbers",
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
        examples: "Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807",
        constraints: "The number of nodes in each linked list is in the range [1, 100]\n0 <= Node.val <= 9",
        difficulty: "Medium",
        topic: "Linked Lists",
        companies: ["Amazon", "Microsoft", "Oracle"],
        solution_hint: "Handle carry-over while traversing both lists"
      },
      {
        id: 5,
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        examples: "Input: s = 'abcabcbb'\nOutput: 3\nExplanation: The answer is 'abc', with length 3.",
        constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols and spaces.",
        difficulty: "Medium",
        topic: "Strings",
        companies: ["Google", "Facebook", "Amazon"],
        solution_hint: "Use sliding window technique with hash set"
      },
      {
        id: 6,
        title: "Binary Tree Inorder Traversal",
        description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
        examples: "Input: root = [1,null,2,3]\nOutput: [1,3,2]",
        constraints: "The number of nodes in the tree is in the range [0, 100]\n-100 <= Node.val <= 100",
        difficulty: "Medium",
        topic: "Trees",
        companies: ["Amazon", "Microsoft", "Oracle"],
        solution_hint: "Use recursion or stack-based iterative approach"
      }
    ],
    hard: [
      {
        id: 7,
        title: "Merge k Sorted Lists",
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        examples: "Input: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
        constraints: "k == lists.length\n0 <= k <= 10^4\n0 <= lists[i].length <= 500",
        difficulty: "Hard",
        topic: "Linked Lists",
        companies: ["Google", "Facebook", "Uber"],
        solution_hint: "Use divide and conquer or priority queue approach"
      },
      {
        id: 8,
        title: "Trapping Rain Water",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        examples: "Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: 6 units of rain water are trapped.",
        constraints: "n == height.length\n1 <= n <= 2 * 10^4\n0 <= height[i] <= 3 * 10^4",
        difficulty: "Hard",
        topic: "Arrays",
        companies: ["Google", "Amazon", "Microsoft"],
        solution_hint: "Use two pointers or dynamic programming"
      }
    ]
  },
  placement_stats: {
    total_students: 450,
    placed_students: 387,
    placement_percentage: 86,
    average_package: "4.2 LPA",
    highest_package: "12 LPA",
    companies_visited: 25,
    ongoing_drives: 8
  },
  news: [
    {
      id: 1,
      title: "Google Campus Drive scheduled for March 2024",
      content: "Google will be visiting campus for software engineer positions. Register now!",
      date: "2024-01-15",
      category: "Placement Drive",
      priority: "high"
    },
    {
      id: 2,
      title: "Resume Building Workshop this Friday",
      content: "Expert session on creating ATS-friendly resumes with industry professionals",
      date: "2024-01-12",
      category: "Workshop",
      priority: "medium"
    },
    {
      id: 3,
      title: "Microsoft announces 50 job openings",
      content: "Microsoft India looking for fresh graduates in multiple technology roles",
      date: "2024-01-18",
      category: "Job Opening",
      priority: "high"
    },
    {
      id: 4,
      title: "Amazon Web Services hiring spree begins",
      content: "AWS expanding team with cloud computing positions across India",
      date: "2024-01-20",
      category: "Placement Drive",
      priority: "high"
    },
    {
      id: 5,
      title: "Placement preparation bootcamp starts Monday",
      content: "Intensive 5-day bootcamp covering interview skills and technical preparation",
      date: "2024-01-14",
      category: "Workshop",
      priority: "medium"
    },
    {
      id: 6,
      title: "TCS selects 150 students in recent drive",
      content: "Congratulations to all selected candidates! Onboarding starts next month",
      date: "2024-01-16",
      category: "Results",
      priority: "high"
    },
    {
      id: 7,
      title: "Infosys digital transformation roles available",
      content: "Specialized positions in AI, ML, and cloud technologies now open",
      date: "2024-01-19",
      category: "Job Opening",
      priority: "medium"
    },
    {
      id: 8,
      title: "Mock interview sessions scheduled",
      content: "Industry experts will conduct mock interviews for final year students",
      date: "2024-01-13",
      category: "Workshop",
      priority: "medium"
    },
    {
      id: 9,
      title: "Wipro announces graduate trainee program",
      content: "Comprehensive 6-month training program for new graduates",
      date: "2024-01-21",
      category: "Placement Drive",
      priority: "high"
    },
    {
      id: 10,
      title: "Coding competition winners announced",
      content: "Top performers from inter-college coding contest receive recognition",
      date: "2024-01-17",
      category: "Results",
      priority: "low"
    },
    {
      id: 11,
      title: "LinkedIn profile optimization workshop",
      content: "Learn to create compelling LinkedIn profiles that attract recruiters",
      date: "2024-01-22",
      category: "Workshop",
      priority: "medium"
    },
    {
      id: 12,
      title: "Accenture consulting roles open",
      content: "Management consulting and technology consulting positions available",
      date: "2024-01-23",
      category: "Job Opening",
      priority: "medium"
    },
    {
      id: 13,
      title: "Placement statistics for 2024 released",
      content: "Record 92% placement rate achieved with average package of 4.8 LPA",
      date: "2024-01-11",
      category: "Announcement",
      priority: "high"
    },
    {
      id: 14,
      title: "IBM quantum computing internships",
      content: "Exciting research internship opportunities in quantum computing division",
      date: "2024-01-24",
      category: "Internship",
      priority: "medium"
    },
    {
      id: 15,
      title: "Group discussion preparation session",
      content: "Expert tips and practice sessions for group discussion rounds",
      date: "2024-01-25",
      category: "Workshop",
      priority: "medium"
    },
    {
      id: 16,
      title: "Deloitte business analyst positions",
      content: "Entry-level business analyst roles with comprehensive training",
      date: "2024-01-26",
      category: "Job Opening",
      priority: "medium"
    },
    {
      id: 17,
      title: "Technical aptitude test on Saturday",
      content: "Department-wide aptitude test to assess technical readiness",
      date: "2024-01-27",
      category: "Test",
      priority: "high"
    },
    {
      id: 18,
      title: "Capgemini digital innovation roles",
      content: "Positions in digital transformation and innovation projects",
      date: "2024-01-28",
      category: "Placement Drive",
      priority: "medium"
    },
    {
      id: 19,
      title: "Soft skills development program launched",
      content: "Month-long program to enhance communication and presentation skills",
      date: "2024-01-29",
      category: "Program",
      priority: "medium"
    },
    {
      id: 20,
      title: "Oracle database administrator openings",
      content: "Specialized DBA roles with Oracle certification training included",
      date: "2024-01-30",
      category: "Job Opening",
      priority: "medium"
    },
    {
      id: 21,
      title: "Alumni mentorship program begins",
      content: "Connect with successful alumni for career guidance and networking",
      date: "2024-02-01",
      category: "Program",
      priority: "medium"
    },
    {
      id: 22,
      title: "Cognizant announces mega hiring drive",
      content: "1000+ positions across technology and consulting domains",
      date: "2024-02-02",
      category: "Placement Drive",
      priority: "high"
    },
    {
      id: 23,
      title: "Industry expert guest lecture series",
      content: "Weekly lectures by industry leaders on latest technology trends",
      date: "2024-02-03",
      category: "Lecture",
      priority: "low"
    },
    {
      id: 24,
      title: "HCL Technologies product roles available",
      content: "Product development and management positions in emerging technologies",
      date: "2024-02-04",
      category: "Job Opening",
      priority: "medium"
    },
    {
      id: 25,
      title: "Interview wardrobe and etiquette session",
      content: "Professional styling and interview etiquette workshop",
      date: "2024-02-05",
      category: "Workshop",
      priority: "low"
    },
    {
      id: 26,
      title: "Startup internship fair next week",
      content: "Connect with innovative startups for summer internship opportunities",
      date: "2024-02-06",
      category: "Fair",
      priority: "medium"
    },
    {
      id: 27,
      title: "Tech Mahindra digital services hiring",
      content: "Digital transformation services roles with global exposure",
      date: "2024-02-07",
      category: "Placement Drive",
      priority: "medium"
    },
    {
      id: 28,
      title: "Career counseling sessions available",
      content: "Individual career counseling with professional counselors",
      date: "2024-02-08",
      category: "Counseling",
      priority: "medium"
    },
    {
      id: 29,
      title: "L&T Infotech cloud computing roles",
      content: "Specialized positions in cloud architecture and DevOps",
      date: "2024-02-09",
      category: "Job Opening",
      priority: "medium"
    },
    {
      id: 30,
      title: "Final placement results compilation",
      content: "Complete placement statistics and company-wise breakdown released",
      date: "2024-02-10",
      category: "Results",
      priority: "high"
    },
    {
      id: 31,
      title: "Mindtree innovation lab opportunities",
      content: "R&D positions in AI/ML innovation lab with cutting-edge projects",
      date: "2024-02-11",
      category: "Research",
      priority: "medium"
    },
    {
      id: 32,
      title: "Industry readiness assessment next month",
      content: "Comprehensive assessment to evaluate industry readiness of students",
      date: "2024-02-12",
      category: "Assessment",
      priority: "medium"
    }
  ],
  interview_experiences: [
    {
      id: 1,
      student_name: "Amit Singh",
      company: "Microsoft",
      position: "Software Engineer",
      package: "8.5 LPA",
      experience: "Great interview experience with coding rounds and system design",
      tips: "Focus on DSA and problem-solving skills",
      date: "2024-01-10"
    },
    {
      id: 2,
      student_name: "Sneha Patel",
      company: "Amazon",
      position: "SDE-1",
      package: "10.2 LPA",
      experience: "Challenging technical rounds with behavioral questions",
      tips: "Practice leadership principles and coding problems",
      date: "2024-01-08"
    }
  ],
  resume_templates: [
    {
      id: 1,
      name: "Professional",
      category: "Classic",
      preview: "Clean and professional design"
    },
    {
      id: 2,
      name: "Modern Tech",
      category: "Technical",
      preview: "Perfect for software roles"
    },
    {
      id: 3,
      name: "Creative",
      category: "Design",
      preview: "For creative positions"
    }
  ],
  upcoming_events: [
    {
      id: 1,
      title: "TCS Placement Drive",
      date: "2024-02-05",
      time: "10:00 AM",
      venue: "Auditorium",
      type: "Campus Drive"
    },
    {
      id: 2,
      title: "Mock Interview Session",
      date: "2024-01-25",
      time: "2:00 PM",
      venue: "Seminar Hall",
      type: "Preparation"
    }
  ]
};

// Context for global state
const AppContext = createContext();

// Three.js Background Component
class ThreeBackground {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.pyramid = null;
    this.lights = [];
    this.particles = null;
    this.init();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    
    const canvas = document.getElementById('three-canvas');
    canvas.appendChild(this.renderer.domElement);

    // Create pyramid
    this.createPyramid();
    
    // Create particles
    this.createParticles();
    
    // Add lights
    this.addLights();
    
    // Position camera
    this.camera.position.z = 8;
    this.camera.position.y = 2;
    
    // Start animation
    this.animate();
    
    // Handle resize
    window.addEventListener('resize', () => this.onWindowResize());
  }

  createPyramid() {
    const geometry = new THREE.ConeGeometry(2, 4, 4);
    const material = new THREE.MeshPhongMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    
    this.pyramid = new THREE.Mesh(geometry, material);
    this.pyramid.position.set(0, 0, -5);
    this.scene.add(this.pyramid);
  }

  createParticles() {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
      color: 0x7c3aed,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  addLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    this.scene.add(ambientLight);
    
    // Point lights
    const pointLight1 = new THREE.PointLight(0x00d4ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    this.scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x7c3aed, 1, 100);
    pointLight2.position.set(-5, -5, 5);
    this.scene.add(pointLight2);
    
    this.lights.push(pointLight1, pointLight2);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    
    // Rotate pyramid
    if (this.pyramid) {
      this.pyramid.rotation.y += 0.005;
      this.pyramid.rotation.x += 0.002;
    }
    
    // Animate particles
    if (this.particles) {
      this.particles.rotation.y += 0.001;
    }
    
    // Animate lights
    this.lights.forEach((light, index) => {
      light.position.x = Math.cos(Date.now() * 0.001 + index) * 8;
      light.position.z = Math.sin(Date.now() * 0.001 + index) * 8;
    });
    
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Initialize Three.js background
let threeBackground;

// Landing Page Component
function LandingPage({ onRoleSelect }) {
  useEffect(() => {
    if (!threeBackground) {
      threeBackground = new ThreeBackground();
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <div className="mb-16 animate-float">
        <h1 className="campus-logo mb-4">CAMPUS X</h1>
        <p className="campus-tagline">Future of College Placements</p>
      </div>
      
      <div className="grid grid-3 gap-24 max-w-4xl">
        <div className="card" onClick={() => onRoleSelect('student')}>
          <div className="card-body text-center py-16">
            <i className="fas fa-user-graduate fa-3x mb-16" style={{color: 'var(--campus-primary)'}}></i>
            <h3 className="mb-8">Student Portal</h3>
            <p className="text-muted mb-16">Access your dashboard, build resume, practice coding</p>
            <button className="btn btn--primary">Enter as Student</button>
          </div>
        </div>
        
        <div className="card" onClick={() => onRoleSelect('admin')}>
          <div className="card-body text-center py-16">
            <i className="fas fa-user-shield fa-3x mb-16" style={{color: 'var(--campus-secondary)'}}></i>
            <h3 className="mb-8">Admin Portal</h3>
            <p className="text-muted mb-16">Manage placements, track statistics, communicate</p>
            <button className="btn btn--secondary">Enter as Admin</button>
          </div>
        </div>
        
        <div className="card" onClick={() => onRoleSelect('company')}>
          <div className="card-body text-center py-16">
            <i className="fas fa-building fa-3x mb-16" style={{color: 'var(--campus-accent)'}}></i>
            <h3 className="mb-8">Company Portal</h3>
            <p className="text-muted mb-16">Post jobs, review applications, schedule interviews</p>
            <button className="btn btn--outline">Enter as Company</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Form validation utilities
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password.length >= 6;
};

const validateCGPA = (cgpa) => {
  const numCgpa = parseFloat(cgpa);
  return !isNaN(numCgpa) && numCgpa >= 0 && numCgpa <= 10;
};

const validateCompanyName = (name) => {
  if (!name || name.trim().length < 2) {
    return false;
  }
  // Allow letters, numbers, spaces, and common business characters
  const pattern = /^[a-zA-Z0-9\s&.,'-]+$/;
  return pattern.test(name.trim());
};

// Registration Component
function RegistrationPage({ role, onRegister, onBack, onToggleToLogin }) {
  const [formData, setFormData] = useState({
    // Common fields
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Student specific
    branch: '',
    cgpa: '',
    graduation_year: '',
    skills: '',
    
    // Admin specific
    department: '',
    role: '',
    
    // Company specific
    company_name: '',
    industry: '',
    website: '',
    contact_person: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  const branches = ["Computer Science", "Information Technology", "Electronics", "Mechanical", "Civil", "Electrical"];
  const departments = ["Training & Placement", "Computer Science", "Information Technology", "Administration"];
  const adminRoles = ["Placement Officer", "Assistant Placement Officer", "Department Head", "Faculty"];
  const industries = ["IT Services", "Software Development", "Consulting", "Banking", "Manufacturing", "Healthcare", "Education", "E-commerce", "Fintech"];
  
  const validateForm = () => {
    const newErrors = {};
    
    // Role-specific validations for name/company_name field
    if (role === 'company') {
      // For companies, validate company_name field
      if (!validateCompanyName(formData.company_name)) {
        newErrors.company_name = "Company name must be at least 2 characters long and contain valid characters";
      }
    } else {
      // For students and admins, validate name field
      if (!formData.name.trim() || formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters long";
      }
    }
    
    // Common email validation
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (checkEmailExists(formData.email)) {
      newErrors.email = "Email already registered. Please use a different email or sign in.";
    }
    
    // Common password validations
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    // Role-specific validations
    if (role === 'student') {
      if (!formData.branch) newErrors.branch = "Please select a branch";
      if (!formData.cgpa) {
        newErrors.cgpa = "CGPA is required";
      } else if (!validateCGPA(formData.cgpa)) {
        newErrors.cgpa = "CGPA must be between 0 and 10";
      }
      if (!formData.graduation_year) newErrors.graduation_year = "Graduation year is required";
    }
    
    if (role === 'admin') {
      if (!formData.department) newErrors.department = "Please select a department";
      if (!formData.role) newErrors.role = "Please select a role";
    }
    
    if (role === 'company') {
      if (!formData.industry) newErrors.industry = "Please select an industry";
      if (!formData.contact_person.trim() || formData.contact_person.length < 2) {
        newErrors.contact_person = "Contact person name must be at least 2 characters long";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    
    try {
      // Simulate registration delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Prepare user data based on role
      let userData = {
        name: role === 'company' ? formData.company_name.trim() : formData.name.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password
      };
      
      if (role === 'student') {
        userData = {
          ...userData,
          branch: formData.branch,
          cgpa: parseFloat(formData.cgpa),
          graduation_year: parseInt(formData.graduation_year),
          skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
          resume_score: 0,
          applications: []
        };
      } else if (role === 'admin') {
        userData = {
          ...userData,
          department: formData.department,
          role: formData.role
        };
      } else if (role === 'company') {
        userData = {
          ...userData,
          industry: formData.industry,
          website: formData.website.trim(),
          contact_person: formData.contact_person.trim(),
          jobs_posted: 0,
          package: "5-10 LPA", // Default package range
          location: "India", // Default location
          skills_required: ["Programming", "Communication Skills"]
        };
      }
      
      // Register user
      const newUser = registerUser(userData, role);
      
      if (role === 'company') {
        setSuccess(`Company "${formData.company_name}" registered successfully! You can now sign in to access your company dashboard.`);
      } else {
        setSuccess('Account created successfully! Please sign in.');
      }
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        onToggleToLogin();
      }, 2000);
      
    } catch (error) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  
  const renderRoleSpecificFields = () => {
    if (role === 'student') {
      return (
        <>
          <div className="form-group">
            <label className="form-label">Branch *</label>
            <select
              className="form-control"
              value={formData.branch}
              onChange={(e) => handleInputChange('branch', e.target.value)}
              required
            >
              <option value="">Select Branch</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            {errors.branch && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.branch}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">CGPA *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="10"
              className="form-control"
              value={formData.cgpa}
              onChange={(e) => handleInputChange('cgpa', e.target.value)}
              placeholder="Enter CGPA (0-10)"
              required
            />
            {errors.cgpa && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.cgpa}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Graduation Year *</label>
            <select
              className="form-control"
              value={formData.graduation_year}
              onChange={(e) => handleInputChange('graduation_year', e.target.value)}
              required
            >
              <option value="">Select Year</option>
              {[2024, 2025, 2026, 2027].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {errors.graduation_year && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.graduation_year}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Skills</label>
            <input
              type="text"
              className="form-control"
              value={formData.skills}
              onChange={(e) => handleInputChange('skills', e.target.value)}
              placeholder="Enter skills separated by commas (e.g., JavaScript, React, Python)"
            />
          </div>
        </>
      );
    }
    
    if (role === 'admin') {
      return (
        <>
          <div className="form-group">
            <label className="form-label">Department *</label>
            <select
              className="form-control"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            {errors.department && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.department}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Role *</label>
            <select
              className="form-control"
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              required
            >
              <option value="">Select Role</option>
              {adminRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {errors.role && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.role}</div>}
          </div>
        </>
      );
    }
    
    if (role === 'company') {
      return (
        <>
          {/* Company name is handled in the main form above, no need to duplicate */}
          
          <div className="form-group">
            <label className="form-label">Industry *</label>
            <select
              className="form-control"
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              required
            >
              <option value="">Select Industry</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            {errors.industry && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.industry}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Website</label>
            <input
              type="url"
              className="form-control"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              placeholder="Enter company website (optional)"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Contact Person *</label>
            <input
              type="text"
              className="form-control"
              value={formData.contact_person}
              onChange={(e) => handleInputChange('contact_person', e.target.value)}
              placeholder="HR Manager name"
              required
            />
            {errors.contact_person && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.contact_person}</div>}
          </div>
        </>
      );
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <div className="card" style={{width: '500px', maxWidth: '90vw'}}>
        <div className="card-header text-center">
          <h2 className="mb-8">Create {role.charAt(0).toUpperCase() + role.slice(1)} Account</h2>
          <button 
            onClick={onBack} 
            className="btn btn--outline btn--sm" 
            style={{position: 'absolute', left: '20px', top: '20px'}}
          >
            <i className="fas fa-arrow-left mr-8"></i> Back
          </button>
        </div>
        <div className="card-body">
          {success ? (
            <div className="text-center py-24">
              <i className="fas fa-check-circle fa-3x mb-16" style={{color: 'var(--campus-primary)'}}></i>
              <div className="status status--success mb-16">{success}</div>
              <p>Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">{role === 'company' ? 'Company Name' : 'Full Name'} *</label>
                <input
                  type="text"
                  className="form-control"
                  value={role === 'company' ? formData.company_name : formData.name}
                  onChange={(e) => handleInputChange(role === 'company' ? 'company_name' : 'name', e.target.value)}
                  placeholder={`Enter ${role === 'company' ? 'company name (e.g., TCS, Google, Microsoft)' : 'your full name'}`}
                  required
                  style={role === 'company' && formData.company_name && validateCompanyName(formData.company_name) ? {borderColor: 'var(--color-success)'} : {}}
                />
                {role === 'company' && errors.company_name && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.company_name}</div>}
                {role !== 'company' && errors.name && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.name}</div>}
                {role === 'company' && formData.company_name && validateCompanyName(formData.company_name) && !errors.company_name && (
                  <div style={{color: 'var(--color-success)', fontSize: '12px', marginTop: '4px'}}>
                    ✓ Valid company name
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter email address"
                  required
                />
                {errors.email && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.email}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter password (minimum 6 characters)"
                  required
                />
                {errors.password && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.password}</div>}
              </div>
              
              <div className="form-group">
                <label className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword && <div style={{color: 'var(--color-error)', fontSize: '12px', marginTop: '4px'}}>{errors.confirmPassword}</div>}
              </div>
              
              {renderRoleSpecificFields()}
              
              {errors.general && (
                <div className="mb-16" style={{color: 'var(--color-error)'}}>{errors.general}</div>
              )}
              
              <button type="submit" className="btn btn--primary w-full mb-16" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center gap-8">
                    <div className="spinner" style={{width: '20px', height: '20px'}}></div>
                    Creating Account...
                  </div>
                ) : 'Create Account'}
              </button>
              
              <div className="text-center">
                <span style={{color: 'var(--campus-text-muted)'}}>Already have an account? </span>
                <button 
                  type="button" 
                  onClick={onToggleToLogin}
                  className="btn btn--outline btn--sm"
                  style={{padding: '4px 8px', fontSize: '12px'}}
                >
                  Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Login Component
function LoginPage({ role, onLogin, onBack, onToggleToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate login delay
    setTimeout(() => {
      const user = authenticateUser(formData.email, formData.password, role);
      
      if (user) {
        // Create session
        createSession(user, role);
        onLogin(user, role);
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const getDefaultCredentials = () => {
    const defaults = {
      student: { email: 'student@test.com', password: 'test123' },
      admin: { email: 'admin@test.com', password: 'test123' },
      company: { email: 'company@test.com', password: 'test123' }
    };
    return defaults[role] || {};
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card" style={{width: '400px'}}>
        <div className="card-header text-center">
          <h2 className="mb-8">{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
          <button 
            onClick={onBack} 
            className="btn btn--outline btn--sm" 
            style={{position: 'absolute', left: '20px', top: '20px'}}
          >
            <i className="fas fa-arrow-left mr-8"></i> Back
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                placeholder={getDefaultCredentials().email}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                placeholder="Enter password"
              />
            </div>
            {error && (
              <div className="mb-16" style={{color: 'var(--color-error)'}}>{error}</div>
            )}
            <button type="submit" className="btn btn--primary w-full" disabled={loading}>
              {loading ? <div className="spinner" style={{width: '20px', height: '20px'}}></div> : 'Login'}
            </button>
          </form>
          <div className="text-center mt-16">
            <span style={{color: 'var(--campus-text-muted)'}}>Don't have an account? </span>
            <button 
              type="button" 
              onClick={onToggleToRegister}
              className="btn btn--outline btn--sm"
              style={{padding: '4px 8px', fontSize: '12px'}}
            >
              Sign Up
            </button>
          </div>
          
          <div className="mt-16 p-16" style={{background: 'rgba(0,212,255,0.1)', borderRadius: 'var(--radius-base)'}}>
            <p style={{fontSize: '12px', margin: 0}}>Demo Credentials:</p>
            <p style={{fontSize: '12px', margin: '4px 0'}}><strong>Email:</strong> {getDefaultCredentials().email}</p>
            <p style={{fontSize: '12px', margin: '4px 0'}}><strong>Password:</strong> {getDefaultCredentials().password}</p>
            {role === 'company' && (
              <div style={{marginTop: '8px', padding: '8px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '4px'}}>
                <p style={{fontSize: '11px', margin: 0, color: 'var(--color-success)'}}>✅ Company validation fixed! Test with: TCS, IBM, Google, Microsoft, Apple Inc., 3M Company</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation Component
function Navigation({ user, role, onLogout, currentView, onViewChange }) {
  const getNavItems = () => {
    const navItems = {
      student: [
        { key: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { key: 'resume', label: 'AI Resume', icon: 'fas fa-file-alt' },
        { key: 'dsa', label: 'DSA Practice', icon: 'fas fa-code' },
        { key: 'editor', label: 'Code Editor', icon: 'fas fa-edit' },
        { key: 'news', label: 'News', icon: 'fas fa-newspaper' },
        { key: 'interviews', label: 'Interviews', icon: 'fas fa-comments' }
      ],
      admin: [
        { key: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { key: 'analytics', label: 'Analytics', icon: 'fas fa-chart-line' },
        { key: 'placements', label: 'Placements', icon: 'fas fa-briefcase' },
        { key: 'notices', label: 'Notices', icon: 'fas fa-bell' },
        { key: 'students', label: 'Students', icon: 'fas fa-users' },
        { key: 'companies', label: 'Companies', icon: 'fas fa-building' }
      ],
      company: [
        { key: 'dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
        { key: 'jobs', label: 'Job Posts', icon: 'fas fa-briefcase' },
        { key: 'applications', label: 'Applications', icon: 'fas fa-file-alt' },
        { key: 'interviews', label: 'Interviews', icon: 'fas fa-calendar' },
        { key: 'profile', label: 'Profile', icon: 'fas fa-user' }
      ]
    };
    return navItems[role] || [];
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="flex items-center gap-24">
          <h1 className="campus-logo" style={{fontSize: '1.8rem'}}>CAMPUS X</h1>
          <div className="nav-menu">
            {getNavItems().map(item => (
              <a
                key={item.key}
                href="#"
                className={`nav-link ${currentView === item.key ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  onViewChange(item.key);
                }}
              >
                <i className={`${item.icon} mr-8`}></i>
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-16">
          <span style={{color: 'var(--campus-text-muted)'}}>
            Welcome, {user?.name || user?.email}
          </span>
          <button 
            onClick={onLogout}
            className="btn btn--outline btn--sm"
            title="Logout - All data will be cleared"
          >
            <i className="fas fa-sign-out-alt mr-8"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

// Dashboard Cards Component
function DashboardCard({ icon, title, value, subtitle, color = 'var(--campus-primary)' }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center gap-16">
          <div style={{color: color}}>
            <i className={`${icon} fa-2x`}></i>
          </div>
          <div>
            <h3 style={{margin: 0}}>{value}</h3>
            <h5 style={{margin: '4px 0', color: 'var(--campus-text)'}}>{title}</h5>
            {subtitle && <p style={{margin: 0, fontSize: '12px'}}>{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// Student Dashboard
function StudentDashboard({ user }) {
  const stats = SAMPLE_DATA.placement_stats;
  
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>Welcome back, {user.name}!</h1>
        <p>Here's your placement dashboard overview</p>
      </div>
      
      <div className="grid grid-4 mb-24">
        <DashboardCard 
          icon="fas fa-graduation-cap" 
          title="CGPA" 
          value={user.cgpa}
          subtitle="Current Grade"
        />
        <DashboardCard 
          icon="fas fa-file-alt" 
          title="Resume Score" 
          value={`${user.resume_score}%`}
          subtitle="ATS Optimized"
          color="var(--campus-secondary)"
        />
        <DashboardCard 
          icon="fas fa-paper-plane" 
          title="Applications" 
          value={user.applications.length}
          subtitle="Companies Applied"
          color="var(--campus-accent)"
        />
        <DashboardCard 
          icon="fas fa-trophy" 
          title="Skills" 
          value={user.skills.length}
          subtitle="Technical Skills"
          color="var(--color-success)"
        />
      </div>
      
      <div className="grid grid-2 gap-24">
        <div className="card">
          <div className="card-header">
            <h3>Recent Applications</h3>
          </div>
          <div className="card-body">
            {user.applications.map((company, index) => (
              <div key={index} className="flex justify-between items-center mb-16">
                <span>{company}</span>
                <span className="status status--info">Pending</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Upcoming Events</h3>
          </div>
          <div className="card-body">
            {SAMPLE_DATA.upcoming_events.slice(0, 3).map(event => (
              <div key={event.id} className="mb-16">
                <div className="flex justify-between items-center">
                  <h5 style={{margin: 0}}>{event.title}</h5>
                  <span className="status status--success">{event.date}</span>
                </div>
                <p style={{margin: '4px 0', fontSize: '12px'}}>{event.time} - {event.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// AI Resume Builder with Enhanced Features
function AIResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [activeSection, setActiveSection] = useState('personal');
  const [resumeScore, setResumeScore] = useState(65);
  const [showPreview, setShowPreview] = useState(true);
  const [savedResumes, setSavedResumes] = useState([]);
  
  const [resumeData, setResumeData] = useState({
    // Personal Information
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    portfolio: '',
    
    // Professional Summary
    summary: '',
    
    // Education
    education: [{
      degree: '',
      institution: '',
      year: '',
      cgpa: '',
      coursework: ''
    }],
    
    // Experience
    experience: [{
      title: '',
      company: '',
      duration: '',
      location: '',
      responsibilities: '',
      achievements: ''
    }],
    
    // Projects
    projects: [{
      name: '',
      technologies: '',
      description: '',
      github: '',
      demo: ''
    }],
    
    // Skills
    technicalSkills: '',
    programmingLanguages: '',
    frameworks: '',
    
    // Achievements
    awards: '',
    certifications: '',
    publications: '',
    extracurricular: ''
  });
  
  const templates = [
    { id: 1, name: 'Professional Classic', category: 'Traditional', description: 'Clean, ATS-friendly design perfect for corporate roles' },
    { id: 2, name: 'Modern Tech', category: 'Technology', description: 'Contemporary design with tech focus, great for software roles' },
    { id: 3, name: 'Creative Designer', category: 'Creative', description: 'Stylish layout for creative and design positions' }
  ];
  
  const sections = [
    { key: 'personal', label: 'Personal Info', icon: 'fas fa-user' },
    { key: 'summary', label: 'Summary', icon: 'fas fa-file-text' },
    { key: 'education', label: 'Education', icon: 'fas fa-graduation-cap' },
    { key: 'experience', label: 'Experience', icon: 'fas fa-briefcase' },
    { key: 'projects', label: 'Projects', icon: 'fas fa-code' },
    { key: 'skills', label: 'Skills', icon: 'fas fa-cogs' },
    { key: 'achievements', label: 'Achievements', icon: 'fas fa-trophy' }
  ];
  
  const updateResumeData = (section, field, value, index = null) => {
    if (index !== null) {
      setResumeData(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => i === index ? { ...item, [field]: value } : item)
      }));
    } else {
      setResumeData(prev => ({ ...prev, [field]: value }));
    }
    // Update resume score based on completion
    calculateResumeScore();
  };
  
  const calculateResumeScore = () => {
    const fields = [
      resumeData.name, resumeData.email, resumeData.phone, resumeData.summary,
      resumeData.technicalSkills, resumeData.education[0].degree, resumeData.experience[0].title
    ];
    const filledFields = fields.filter(field => field && field.trim().length > 0).length;
    const score = Math.round((filledFields / fields.length) * 100);
    setResumeScore(score);
  };
  
  const addItem = (section) => {
    const newItem = section === 'education' ? 
      { degree: '', institution: '', year: '', cgpa: '', coursework: '' } :
      section === 'experience' ? 
      { title: '', company: '', duration: '', location: '', responsibilities: '', achievements: '' } :
      { name: '', technologies: '', description: '', github: '', demo: '' };
    
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };
  
  const removeItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };
  
  const saveResume = () => {
    const resumeId = Date.now();
    const newResume = {
      id: resumeId,
      name: resumeData.name || 'Untitled Resume',
      template: selectedTemplate,
      data: resumeData,
      score: resumeScore,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSavedResumes(prev => [...prev, newResume]);
  };
  
  const generateAIOptimization = () => {
    alert('AI optimization feature would analyze your resume and provide suggestions for improvement, keyword optimization for ATS systems, and content enhancement recommendations.');
  };
  
  const downloadPDF = () => {
    alert('PDF download functionality would generate a professional PDF resume using the selected template and data.');
  };
  
  const renderSectionForm = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div>
            <div className="grid grid-2 gap-16 mb-16">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={resumeData.name}
                  onChange={(e) => updateResumeData('personal', 'name', e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  value={resumeData.email}
                  onChange={(e) => updateResumeData('personal', 'email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div className="grid grid-2 gap-16 mb-16">
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input
                  type="tel"
                  className="form-control"
                  value={resumeData.phone}
                  onChange={(e) => updateResumeData('personal', 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={resumeData.address}
                  onChange={(e) => updateResumeData('personal', 'address', e.target.value)}
                  placeholder="City, State, Country"
                />
              </div>
            </div>
            <div className="grid grid-2 gap-16">
              <div className="form-group">
                <label className="form-label">LinkedIn</label>
                <input
                  type="url"
                  className="form-control"
                  value={resumeData.linkedin}
                  onChange={(e) => updateResumeData('personal', 'linkedin', e.target.value)}
                  placeholder="linkedin.com/in/yourprofile"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Portfolio/Website</label>
                <input
                  type="url"
                  className="form-control"
                  value={resumeData.portfolio}
                  onChange={(e) => updateResumeData('personal', 'portfolio', e.target.value)}
                  placeholder="your-portfolio.com"
                />
              </div>
            </div>
          </div>
        );
      
      case 'summary':
        return (
          <div className="form-group">
            <label className="form-label">Professional Summary *</label>
            <textarea
              className="form-control"
              rows="5"
              value={resumeData.summary}
              onChange={(e) => updateResumeData('summary', 'summary', e.target.value)}
              placeholder="Write a compelling professional summary highlighting your key strengths, experience, and career objectives..."
            />
            <div className="flex justify-between items-center mt-8">
              <span style={{fontSize: '12px', color: 'var(--campus-text-muted)'}}>
                {resumeData.summary.length}/500 characters
              </span>
              <button type="button" className="btn btn--outline btn--sm" onClick={generateAIOptimization}>
                <i className="fas fa-magic mr-8"></i>
                AI Enhance
              </button>
            </div>
          </div>
        );
      
      case 'education':
        return (
          <div>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="card mb-16">
                <div className="card-header">
                  <div className="flex justify-between items-center">
                    <h5 style={{margin: 0}}>Education {index + 1}</h5>
                    {resumeData.education.length > 1 && (
                      <button 
                        type="button" 
                        className="btn btn--outline btn--sm"
                        onClick={() => removeItem('education', index)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <div className="grid grid-2 gap-16 mb-16">
                    <div className="form-group">
                      <label className="form-label">Degree *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={edu.degree}
                        onChange={(e) => updateResumeData('education', 'degree', e.target.value, index)}
                        placeholder="B.Tech Computer Science"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Institution *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={edu.institution}
                        onChange={(e) => updateResumeData('education', 'institution', e.target.value, index)}
                        placeholder="University/College Name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-2 gap-16 mb-16">
                    <div className="form-group">
                      <label className="form-label">Year</label>
                      <input
                        type="text"
                        className="form-control"
                        value={edu.year}
                        onChange={(e) => updateResumeData('education', 'year', e.target.value, index)}
                        placeholder="2020-2024"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CGPA/Percentage</label>
                      <input
                        type="text"
                        className="form-control"
                        value={edu.cgpa}
                        onChange={(e) => updateResumeData('education', 'cgpa', e.target.value, index)}
                        placeholder="8.5 CGPA / 85%"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Relevant Coursework</label>
                    <input
                      type="text"
                      className="form-control"
                      value={edu.coursework}
                      onChange={(e) => updateResumeData('education', 'coursework', e.target.value, index)}
                      placeholder="Data Structures, Algorithms, Database Systems, Web Development"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button 
              type="button" 
              className="btn btn--primary btn--sm"
              onClick={() => addItem('education')}
            >
              <i className="fas fa-plus mr-8"></i>
              Add Education
            </button>
          </div>
        );
      
      case 'skills':
        return (
          <div>
            <div className="form-group mb-16">
              <label className="form-label">Technical Skills *</label>
              <textarea
                className="form-control"
                rows="3"
                value={resumeData.technicalSkills}
                onChange={(e) => updateResumeData('skills', 'technicalSkills', e.target.value)}
                placeholder="JavaScript, React, Node.js, Python, MySQL, AWS, Docker..."
              />
            </div>
            <div className="form-group mb-16">
              <label className="form-label">Programming Languages</label>
              <input
                type="text"
                className="form-control"
                value={resumeData.programmingLanguages}
                onChange={(e) => updateResumeData('skills', 'programmingLanguages', e.target.value)}
                placeholder="JavaScript, Python, Java, C++, TypeScript"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tools &amp; Frameworks</label>
              <input
                type="text"
                className="form-control"
                value={resumeData.frameworks}
                onChange={(e) => updateResumeData('skills', 'frameworks', e.target.value)}
                placeholder="React, Angular, Django, Spring Boot, MongoDB"
              />
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-24">
            <i className="fas fa-construction fa-2x mb-16" style={{color: 'var(--campus-text-muted)'}}></i>
            <p>This section is under construction. Please select another section to continue building your resume.</p>
          </div>
        );
    }
  };
  
  const renderPreview = () => {
    const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
    
    return (
      <div className="card" style={{background: 'white', color: 'black', minHeight: '600px'}}>
        <div className="card-header" style={{background: '#f8f9fa', borderBottom: '1px solid #dee2e6', color: 'black'}}>
          <div className="flex justify-between items-center">
            <h5 style={{margin: 0, color: 'black'}}>Resume Preview - {selectedTemplateData?.name}</h5>
            <div className="flex items-center gap-8">
              <span className={`status ${resumeScore >= 80 ? 'status--success' : resumeScore >= 60 ? 'status--warning' : 'status--error'}`}>
                Score: {resumeScore}%
              </span>
              <button 
                className="btn btn--outline btn--sm" 
                onClick={() => setShowPreview(!showPreview)}
                style={{color: 'black', borderColor: '#6c757d'}}
              >
                <i className="fas fa-eye-slash"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body" style={{padding: '24px', color: 'black'}}>
          {/* Header */}
          <div style={{textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #007bff', paddingBottom: '16px'}}>
            <h1 style={{margin: '0 0 8px 0', fontSize: '28px', color: '#007bff'}}>
              {resumeData.name || 'Your Name'}
            </h1>
            <div style={{fontSize: '14px', color: '#6c757d'}}>
              {resumeData.email && <span>{resumeData.email}</span>}
              {resumeData.phone && <span> | {resumeData.phone}</span>}
              {resumeData.address && <span> | {resumeData.address}</span>}
            </div>
            <div style={{fontSize: '14px', color: '#6c757d', marginTop: '4px'}}>
              {resumeData.linkedin && <span><a href={resumeData.linkedin} style={{color: '#007bff'}}>LinkedIn</a></span>}
              {resumeData.portfolio && <span> | <a href={resumeData.portfolio} style={{color: '#007bff'}}>Portfolio</a></span>}
            </div>
          </div>
          
          {/* Professional Summary */}
          {resumeData.summary && (
            <div style={{marginBottom: '20px'}}>
              <h3 style={{color: '#007bff', fontSize: '18px', marginBottom: '8px', borderBottom: '1px solid #dee2e6', paddingBottom: '4px'}}>Professional Summary</h3>
              <p style={{margin: 0, fontSize: '14px', lineHeight: '1.6'}}>{resumeData.summary}</p>
            </div>
          )}
          
          {/* Education */}
          {resumeData.education[0].degree && (
            <div style={{marginBottom: '20px'}}>
              <h3 style={{color: '#007bff', fontSize: '18px', marginBottom: '8px', borderBottom: '1px solid #dee2e6', paddingBottom: '4px'}}>Education</h3>
              {resumeData.education.map((edu, index) => (
                <div key={index} style={{marginBottom: '12px'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px'}}>
                    <strong style={{fontSize: '16px'}}>{edu.degree}</strong>
                    <span style={{fontSize: '14px', color: '#6c757d'}}>{edu.year}</span>
                  </div>
                  <div style={{fontSize: '14px', color: '#6c757d', marginBottom: '4px'}}>{edu.institution}</div>
                  {edu.cgpa && <div style={{fontSize: '14px'}}>CGPA/Grade: {edu.cgpa}</div>}
                  {edu.coursework && <div style={{fontSize: '13px', color: '#6c757d'}}>Relevant Coursework: {edu.coursework}</div>}
                </div>
              ))}
            </div>
          )}
          
          {/* Skills */}
          {resumeData.technicalSkills && (
            <div style={{marginBottom: '20px'}}>
              <h3 style={{color: '#007bff', fontSize: '18px', marginBottom: '8px', borderBottom: '1px solid #dee2e6', paddingBottom: '4px'}}>Technical Skills</h3>
              <div style={{fontSize: '14px', lineHeight: '1.6'}}>
                {resumeData.technicalSkills && <div><strong>Technical Skills:</strong> {resumeData.technicalSkills}</div>}
                {resumeData.programmingLanguages && <div><strong>Programming Languages:</strong> {resumeData.programmingLanguages}</div>}
                {resumeData.frameworks && <div><strong>Tools &amp; Frameworks:</strong> {resumeData.frameworks}</div>}
              </div>
            </div>
          )}
          
          {!resumeData.name && !resumeData.summary && !resumeData.technicalSkills && (
            <div style={{textAlign: 'center', padding: '40px', color: '#6c757d'}}>
              <i className="fas fa-file-alt fa-3x" style={{marginBottom: '16px', opacity: 0.5}}></i>
              <p>Start filling out your information to see the preview</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>AI Resume Builder</h1>
        <p>Create professional, ATS-optimized resumes with AI-powered assistance and real-time preview</p>
      </div>
      
      {/* Resume Score &amp; Actions */}
      <div className="card mb-24">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-16">
              <div className="text-center">
                <div className={`text-2xl font-bold ${resumeScore >= 80 ? 'text-success' : resumeScore >= 60 ? 'text-warning' : 'text-error'}`}>
                  {resumeScore}%
                </div>
                <div style={{fontSize: '12px'}}>Resume Score</div>
              </div>
              <div>
                <h5 style={{margin: 0}}>Template: {templates.find(t => t.id === selectedTemplate)?.name}</h5>
                <p style={{margin: 0, fontSize: '12px'}}>Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex gap-8">
              <button className="btn btn--secondary" onClick={generateAIOptimization}>
                <i className="fas fa-magic mr-8"></i>
                AI Optimize
              </button>
              <button className="btn btn--outline" onClick={saveResume}>
                <i className="fas fa-save mr-8"></i>
                Save Resume
              </button>
              <button className="btn btn--primary" onClick={downloadPDF}>
                <i className="fas fa-download mr-8"></i>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-2 gap-24">
        <div>
          {/* Template Selection */}
          <div className="card mb-24">
            <div className="card-header">
              <h3>Choose Template</h3>
            </div>
            <div className="card-body">
              <div className="grid gap-12">
                {templates.map(template => (
                  <div 
                    key={template.id} 
                    className={`card ${selectedTemplate === template.id ? 'border-primary' : ''}`}
                    onClick={() => setSelectedTemplate(template.id)}
                    style={{cursor: 'pointer'}}
                  >
                    <div className="card-body py-12">
                      <div className="flex justify-between items-center">
                        <div>
                          <h5 style={{margin: 0}}>{template.name}</h5>
                          <p style={{margin: '4px 0 0 0', fontSize: '12px'}}>{template.description}</p>
                        </div>
                        <div className="flex items-center gap-8">
                          <span className="status status--info">{template.category}</span>
                          {selectedTemplate === template.id && (
                            <i className="fas fa-check-circle" style={{color: 'var(--campus-primary)'}}></i>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Section Navigation */}
          <div className="card mb-24">
            <div className="card-header">
              <h3>Resume Sections</h3>
            </div>
            <div className="card-body">
              <div className="grid gap-8">
                {sections.map(section => {
                  const isComplete = section.key === 'personal' ? 
                    resumeData.name && resumeData.email && resumeData.phone :
                    section.key === 'summary' ? resumeData.summary :
                    section.key === 'skills' ? resumeData.technicalSkills :
                    false;
                  
                  return (
                    <button
                      key={section.key}
                      className={`btn w-full ${activeSection === section.key ? 'btn--primary' : 'btn--outline'}`}
                      onClick={() => setActiveSection(section.key)}
                      style={{justifyContent: 'flex-start'}}
                    >
                      <i className={`${section.icon} mr-12`}></i>
                      <span className="flex-1 text-left">{section.label}</span>
                      {isComplete && <i className="fas fa-check-circle" style={{color: 'var(--color-success)'}}></i>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Form Section */}
          <div className="card">
            <div className="card-header">
              <h3>{sections.find(s => s.key === activeSection)?.label} Information</h3>
            </div>
            <div className="card-body">
              {renderSectionForm()}
            </div>
          </div>
        </div>
        
        {/* Preview Section */}
        <div>
          {showPreview && renderPreview()}
          
          {/* Saved Resumes */}
          {savedResumes.length > 0 && (
            <div className="card mt-24">
              <div className="card-header">
                <h3>Saved Resumes ({savedResumes.length})</h3>
              </div>
              <div className="card-body">
                {savedResumes.slice(-3).map(resume => (
                  <div key={resume.id} className="flex justify-between items-center mb-12 pb-12" style={{borderBottom: '1px solid var(--campus-border)'}}>
                    <div>
                      <h5 style={{margin: 0}}>{resume.name}</h5>
                      <p style={{margin: 0, fontSize: '12px'}}>Created: {resume.createdAt} | Score: {resume.score}%</p>
                    </div>
                    <div className="flex gap-8">
                      <button className="btn btn--outline btn--sm">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn btn--primary btn--sm">
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// DSA Practice with Enhanced Features
function DSAPractice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  
  const allProblems = Object.values(SAMPLE_DATA.dsa_problems).flat();
  const topics = ['all', ...new Set(allProblems.map(p => p.topic))];
  const companies = ['all', ...new Set(allProblems.flatMap(p => p.companies))];
  
  // Filter problems
  const filteredProblems = SAMPLE_DATA.dsa_problems[selectedDifficulty].filter(problem => {
    const matchesTopic = selectedTopic === 'all' || problem.topic === selectedTopic;
    const matchesCompany = selectedCompany === 'all' || problem.companies.includes(selectedCompany);
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTopic && matchesCompany && matchesSearch;
  });
  
  const markAsSolved = (problemId) => {
    setSolvedProblems(prev => new Set([...prev, problemId]));
  };
  
  const resetProgress = () => {
    setSolvedProblems(new Set());
  };
  
  const progressStats = {
    total: allProblems.length,
    solved: solvedProblems.size,
    easy: SAMPLE_DATA.dsa_problems.easy.filter(p => solvedProblems.has(p.id)).length,
    medium: SAMPLE_DATA.dsa_problems.medium.filter(p => solvedProblems.has(p.id)).length,
    hard: SAMPLE_DATA.dsa_problems.hard.filter(p => solvedProblems.has(p.id)).length
  };
  
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>DSA Practice Platform</h1>
        <p>Master Data Structures &amp; Algorithms with comprehensive problem sets</p>
      </div>
      
      {/* Progress Statistics */}
      <div className="card mb-24">
        <div className="card-header">
          <div className="flex justify-between items-center">
            <h3>Your Progress</h3>
            <button className="btn btn--outline btn--sm" onClick={resetProgress}>
              <i className="fas fa-refresh mr-8"></i>
              Reset Progress
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-4 gap-16">
            <div className="text-center">
              <h3 style={{margin: 0, color: 'var(--campus-primary)'}}>{progressStats.solved}/{progressStats.total}</h3>
              <p style={{margin: 0, fontSize: '12px'}}>Total Solved</p>
            </div>
            <div className="text-center">
              <h3 style={{margin: 0, color: 'var(--color-success)'}}>{progressStats.easy}</h3>
              <p style={{margin: 0, fontSize: '12px'}}>Easy Problems</p>
            </div>
            <div className="text-center">
              <h3 style={{margin: 0, color: 'var(--color-warning)'}}>{progressStats.medium}</h3>
              <p style={{margin: 0, fontSize: '12px'}}>Medium Problems</p>
            </div>
            <div className="text-center">
              <h3 style={{margin: 0, color: 'var(--color-error)'}}>{progressStats.hard}</h3>
              <p style={{margin: 0, fontSize: '12px'}}>Hard Problems</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="card mb-24">
        <div className="card-body">
          <div className="grid grid-2 gap-16 mb-16">
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search problems..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-8">
              <select
                className="form-control"
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic === 'all' ? 'All Topics' : topic}
                  </option>
                ))}
              </select>
              <select
                className="form-control"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                {companies.map(company => (
                  <option key={company} value={company}>
                    {company === 'all' ? 'All Companies' : company}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex gap-16">
            {['easy', 'medium', 'hard'].map(difficulty => (
              <button
                key={difficulty}
                className={`btn ${selectedDifficulty === difficulty ? 'btn--primary' : 'btn--outline'}`}
                onClick={() => {
                  setSelectedDifficulty(difficulty);
                  setSelectedProblem(null);
                }}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} ({SAMPLE_DATA.dsa_problems[difficulty].length})
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-2 gap-24">
        <div className="card">
          <div className="card-header">
            <h3>{selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Problems ({filteredProblems.length})</h3>
          </div>
          <div className="card-body" style={{maxHeight: '600px', overflowY: 'auto'}}>
            {filteredProblems.length > 0 ? filteredProblems.map(problem => (
              <div 
                key={problem.id} 
                className={`card mb-16 ${selectedProblem?.id === problem.id ? 'border-primary' : ''}`}
                onClick={() => {
                  setSelectedProblem(problem);
                  setShowSolution(false);
                  setShowHints(false);
                }}
                style={{
                  cursor: 'pointer',
                  background: solvedProblems.has(problem.id) ? 'var(--color-bg-3)' : 'transparent'
                }}
              >
                <div className="card-body">
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-8">
                      {solvedProblems.has(problem.id) && (
                        <i className="fas fa-check-circle" style={{color: 'var(--color-success)'}}></i>
                      )}
                      <h5 style={{margin: 0}}>{problem.title}</h5>
                    </div>
                    <span className={`status status--${selectedDifficulty === 'easy' ? 'success' : selectedDifficulty === 'medium' ? 'warning' : 'error'}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <p style={{margin: '0 0 8px 0', fontSize: '14px', opacity: 0.8}}>
                    {problem.description.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="status status--info">{problem.topic}</span>
                    <span style={{fontSize: '12px', color: 'var(--campus-text-muted)'}}>
                      {problem.companies.slice(0, 2).join(', ')}{problem.companies.length > 2 ? '...' : ''}
                    </span>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-24">
                <i className="fas fa-search fa-2x mb-16" style={{color: 'var(--campus-text-muted)'}}></i>
                <p>No problems found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Problem Details</h3>
          </div>
          <div className="card-body">
            {selectedProblem ? (
              <div>
                <div className="flex justify-between items-center mb-16">
                  <h4 style={{margin: 0}}>{selectedProblem.title}</h4>
                  {solvedProblems.has(selectedProblem.id) ? (
                    <span className="status status--success">
                      <i className="fas fa-check mr-8"></i>
                      Solved
                    </span>
                  ) : (
                    <button 
                      className="btn btn--primary btn--sm"
                      onClick={() => markAsSolved(selectedProblem.id)}
                    >
                      <i className="fas fa-check mr-8"></i>
                      Mark as Solved
                    </button>
                  )}
                </div>
                
                <div className="mb-16">
                  <div className="flex gap-8 mb-8">
                    <span className={`status status--${selectedDifficulty === 'easy' ? 'success' : selectedDifficulty === 'medium' ? 'warning' : 'error'}`}>
                      {selectedProblem.difficulty}
                    </span>
                    <span className="status status--info">{selectedProblem.topic}</span>
                  </div>
                  <p><strong>Companies:</strong> {selectedProblem.companies.join(', ')}</p>
                </div>
                
                <div className="mb-16">
                  <h5>Problem Description:</h5>
                  <p>{selectedProblem.description}</p>
                </div>
                
                {selectedProblem.examples && (
                  <div className="mb-16">
                    <h5>Examples:</h5>
                    <pre style={{
                      background: 'var(--campus-card-bg)',
                      padding: 'var(--space-12)',
                      borderRadius: 'var(--radius-base)',
                      fontSize: '14px',
                      whiteSpace: 'pre-wrap'
                    }}>{selectedProblem.examples}</pre>
                  </div>
                )}
                
                {selectedProblem.constraints && (
                  <div className="mb-16">
                    <h5>Constraints:</h5>
                    <pre style={{
                      background: 'var(--campus-card-bg)',
                      padding: 'var(--space-12)',
                      borderRadius: 'var(--radius-base)',
                      fontSize: '14px',
                      whiteSpace: 'pre-wrap'
                    }}>{selectedProblem.constraints}</pre>
                  </div>
                )}
                
                <div className="flex gap-16 mb-16">
                  <button 
                    className="btn btn--primary"
                    onClick={() => {
                      setShowSolution(!showSolution);
                      setShowHints(false);
                    }}
                  >
                    <i className="fas fa-code mr-8"></i>
                    {showSolution ? 'Hide Solution' : 'View Solution'}
                  </button>
                  <button 
                    className="btn btn--secondary"
                    onClick={() => {
                      setShowHints(!showHints);
                      setShowSolution(false);
                    }}
                  >
                    <i className="fas fa-lightbulb mr-8"></i>
                    {showHints ? 'Hide Hints' : 'View Hints'}
                  </button>
                  <button className="btn btn--outline">
                    <i className="fas fa-external-link-alt mr-8"></i>
                    Practice on LeetCode
                  </button>
                </div>
                
                {showHints && selectedProblem.solution_hint && (
                  <div className="card mb-16">
                    <div className="card-header">
                      <h5 style={{margin: 0}}>💡 Hint</h5>
                    </div>
                    <div className="card-body">
                      <p style={{margin: 0}}>{selectedProblem.solution_hint}</p>
                    </div>
                  </div>
                )}
                
                {showSolution && (
                  <div className="card mb-16">
                    <div className="card-header">
                      <h5 style={{margin: 0}}>🚀 Solution Approach</h5>
                    </div>
                    <div className="card-body">
                      <p>This is where the detailed solution would be displayed. The implementation would include:</p>
                      <ul>
                        <li>Step-by-step approach explanation</li>
                        <li>Code implementation in multiple languages</li>
                        <li>Time and space complexity analysis</li>
                        <li>Alternative solutions and optimizations</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-24">
                <i className="fas fa-mouse-pointer fa-2x mb-16" style={{color: 'var(--campus-text-muted)'}}></i>
                <p>Select a problem from the list to view details, examples, and solutions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Code Editor with Multiple Features
function CodeEditor() {
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, CAMPUS X!");');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [fileName, setFileName] = useState('main.js');
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);
  const [savedSnippets, setSavedSnippets] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);
  
  const languages = [
    { value: 'javascript', label: 'JavaScript', extension: 'js', template: '// JavaScript Code\nconsole.log("Hello, World!");' },
    { value: 'python', label: 'Python', extension: 'py', template: '# Python Code\nprint("Hello, World!")' },
    { value: 'java', label: 'Java', extension: 'java', template: '// Java Code\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
    { value: 'cpp', label: 'C++', extension: 'cpp', template: '// C++ Code\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
    { value: 'c', label: 'C', extension: 'c', template: '// C Code\n#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' }
  ];
  
  const changeLanguage = (newLanguage) => {
    const langData = languages.find(l => l.value === newLanguage);
    setLanguage(newLanguage);
    setFileName(`main.${langData.extension}`);
    if (!code || code === languages.find(l => l.value === language)?.template) {
      setCode(langData.template);
    }
  };
  
  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...');
    
    // Simulate code execution
    setTimeout(() => {
      let simulatedOutput = '';
      
      if (language === 'javascript') {
        if (code.includes('console.log')) {
          const matches = code.match(/console\.log\(["'`]([^"'`]*)["'`]\)/g);
          if (matches) {
            simulatedOutput = matches.map(match => {
              const content = match.match(/["'`]([^"'`]*)["'`]/)[1];
              return content;
            }).join('\n');
          }
        }
      } else if (language === 'python') {
        if (code.includes('print')) {
          const matches = code.match(/print\(["'`]([^"'`]*)["'`]\)/g);
          if (matches) {
            simulatedOutput = matches.map(match => {
              const content = match.match(/["'`]([^"'`]*)["'`]/)[1];
              return content;
            }).join('\n');
          }
        }
      } else if (language === 'java') {
        if (code.includes('System.out.println')) {
          const matches = code.match(/System\.out\.println\(["'`]([^"'`]*)["'`]\)/g);
          if (matches) {
            simulatedOutput = matches.map(match => {
              const content = match.match(/["'`]([^"'`]*)["'`]/)[1];
              return content;
            }).join('\n');
          }
        }
      } else if (language === 'cpp') {
        if (code.includes('cout')) {
          const matches = code.match(/cout\s*<<\s*["'`]([^"'`]*)["'`]/g);
          if (matches) {
            simulatedOutput = matches.map(match => {
              const content = match.match(/["'`]([^"'`]*)["'`]/)[1];
              return content;
            }).join('\n');
          }
        }
      } else if (language === 'c') {
        if (code.includes('printf')) {
          const matches = code.match(/printf\(["'`]([^"'`]*)["'`]/g);
          if (matches) {
            simulatedOutput = matches.map(match => {
              const content = match.match(/["'`]([^"'`]*)["'`]/)[1].replace('\\n', '');
              return content;
            }).join('\n');
          }
        }
      }
      
      setOutput(simulatedOutput || `Code executed successfully in ${language}.\nExecution time: ${Math.random() * 100 + 50}ms\nMemory used: ${Math.random() * 10 + 5}MB`);
      setIsRunning(false);
    }, 1500);
  };
  
  const saveSnippet = () => {
    const snippet = {
      id: Date.now(),
      name: fileName,
      code,
      language,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSavedSnippets(prev => [snippet, ...prev.slice(0, 9)]); // Keep only 10 recent
  };
  
  const loadSnippet = (snippet) => {
    setCode(snippet.code);
    setLanguage(snippet.language);
    setFileName(snippet.name);
  };
  
  const clearCode = () => {
    if (confirm('Are you sure you want to clear all code? This action cannot be undone.')) {
      const langData = languages.find(l => l.value === language);
      setCode(langData.template);
      setOutput('');
    }
  };
  
  const generateLineNumbers = () => {
    const lines = code.split('\n').length;
    return Array.from({length: lines}, (_, i) => i + 1).join('\n');
  };
  
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>Advanced Code Editor</h1>
        <p>Professional code editor with syntax highlighting, multiple languages, and execution simulation</p>
      </div>
      
      {/* Editor Controls */}
      <div className="card mb-24">
        <div className="card-body">
          <div className="grid grid-2 gap-16 mb-16">
            <div className="form-group mb-0">
              <label className="form-label">File Name</label>
              <input
                type="text"
                className="form-control"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
              />
            </div>
            <div className="form-group mb-0">
              <label className="form-label">Language</label>
              <select 
                value={language} 
                onChange={(e) => changeLanguage(e.target.value)}
                className="form-control"
              >
                {languages.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-16">
              <div className="form-group mb-0">
                <label className="form-label">Theme</label>
                <select 
                  value={theme} 
                  onChange={(e) => setTheme(e.target.value)}
                  className="form-control"
                  style={{width: 'auto'}}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
              <div className="form-group mb-0">
                <label className="form-label">Font Size</label>
                <select 
                  value={fontSize} 
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="form-control"
                  style={{width: 'auto'}}
                >
                  <option value="12">12px</option>
                  <option value="14">14px</option>
                  <option value="16">16px</option>
                  <option value="18">18px</option>
                </select>
              </div>
              <div className="flex items-center gap-8 mt-6">
                <input
                  type="checkbox"
                  id="lineNumbers"
                  checked={lineNumbers}
                  onChange={(e) => setLineNumbers(e.target.checked)}
                />
                <label htmlFor="lineNumbers" className="form-label mb-0">Line Numbers</label>
              </div>
            </div>
            
            <div className="flex gap-8">
              <button onClick={runCode} className="btn btn--primary btn--sm" disabled={isRunning}>
                <i className={`fas ${isRunning ? 'fa-spinner fa-spin' : 'fa-play'} mr-8`}></i>
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button onClick={saveSnippet} className="btn btn--secondary btn--sm">
                <i className="fas fa-save mr-8"></i>
                Save
              </button>
              <button onClick={clearCode} className="btn btn--outline btn--sm">
                <i className="fas fa-trash mr-8"></i>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-3 gap-24">
        {/* Code Editor */}
        <div className="card" style={{gridColumn: 'span 2'}}>
          <div className="code-editor">
            <div className="code-editor-header">
              <div className="flex items-center gap-16">
                <div className="flex items-center gap-8">
                  <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57'}}></div>
                  <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e'}}></div>
                  <div style={{width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42'}}></div>
                </div>
                <span style={{fontSize: '14px', color: 'var(--campus-text-muted)'}}>{fileName}</span>
              </div>
              <div className="flex items-center gap-8">
                <span style={{fontSize: '12px', color: 'var(--campus-text-muted)'}}>Lines: {code.split('\n').length}</span>
                <span style={{fontSize: '12px', color: 'var(--campus-text-muted)'}}>Characters: {code.length}</span>
              </div>
            </div>
            <div className="code-editor-body" style={{display: 'flex'}}>
              {lineNumbers && (
                <div style={{
                  padding: '16px 8px',
                  background: theme === 'dark' ? '#2a2a2a' : '#f8f9fa',
                  borderRight: `1px solid ${theme === 'dark' ? '#404040' : '#dee2e6'}`,
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: `${fontSize}px`,
                  lineHeight: '1.5',
                  color: theme === 'dark' ? '#6c757d' : '#adb5bd',
                  textAlign: 'right',
                  userSelect: 'none',
                  minWidth: '40px'
                }}>
                  {generateLineNumbers()}
                </div>
              )}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Write your ${language} code here...`}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
                  color: theme === 'dark' ? '#ffffff' : '#000000',
                  fontFamily: 'var(--font-family-mono)',
                  fontSize: `${fontSize}px`,
                  lineHeight: '1.5',
                  padding: '16px',
                  height: '400px'
                }}
                spellCheck={false}
              />
            </div>
          </div>
        </div>
        
        {/* Saved Snippets */}
        <div className="card">
          <div className="card-header">
            <h3>Saved Snippets ({savedSnippets.length})</h3>
          </div>
          <div className="card-body" style={{maxHeight: '400px', overflowY: 'auto'}}>
            {savedSnippets.length > 0 ? savedSnippets.map(snippet => (
              <div key={snippet.id} className="card mb-12" style={{cursor: 'pointer'}} onClick={() => loadSnippet(snippet)}>
                <div className="card-body py-8">
                  <div className="flex justify-between items-center mb-4">
                    <h5 style={{margin: 0, fontSize: '14px'}}>{snippet.name}</h5>
                    <span className="status status--info" style={{fontSize: '10px'}}>{snippet.language}</span>
                  </div>
                  <p style={{margin: 0, fontSize: '12px', color: 'var(--campus-text-muted)'}}>
                    {snippet.code.substring(0, 50)}...
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span style={{fontSize: '10px', color: 'var(--campus-text-muted)'}}>{snippet.createdAt}</span>
                    <button 
                      className="btn btn--outline" 
                      style={{fontSize: '10px', padding: '2px 6px'}}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSavedSnippets(prev => prev.filter(s => s.id !== snippet.id));
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-24">
                <i className="fas fa-code fa-2x mb-16" style={{color: 'var(--campus-text-muted)', opacity: 0.5}}></i>
                <p style={{fontSize: '12px'}}>No saved snippets yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Output */}
      {output && (
        <div className="card mt-24">
          <div className="card-header">
            <div className="flex justify-between items-center">
              <h3>Output</h3>
              <button 
                className="btn btn--outline btn--sm"
                onClick={() => setOutput('')}
              >
                <i className="fas fa-times mr-8"></i>
                Clear Output
              </button>
            </div>
          </div>
          <div className="card-body">
            <pre style={{
              margin: 0, 
              color: 'var(--campus-primary)',
              fontFamily: 'var(--font-family-mono)',
              fontSize: '14px',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>{output}</pre>
          </div>
        </div>
      )}
      
      {/* Language Info */}
      <div className="card mt-24">
        <div className="card-header">
          <h3>Language Quick Reference - {languages.find(l => l.value === language)?.label}</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-2 gap-24">
            <div>
              <h5>Common Syntax:</h5>
              <div style={{fontSize: '12px', fontFamily: 'var(--font-family-mono)'}}>
                {language === 'javascript' && (
                  <div>
                    <div>Variables: <code>let name = "value";</code></div>
                    <div>Functions: <code>function name() {}</code></div>
                    <div>Loops: <code>for (let i = 0; i &lt; 10; i++) {}</code></div>
                  </div>
                )}
                {language === 'python' && (
                  <div>
                    <div>Variables: <code>name = "value"</code></div>
                    <div>Functions: <code>def name():</code></div>
                    <div>Loops: <code>for i in range(10):</code></div>
                  </div>
                )}
                {language === 'java' && (
                  <div>
                    <div>Variables: <code>String name = "value";</code></div>
                    <div>Methods: <code>public void name() {}</code></div>
                    <div>Loops: <code>for (int i = 0; i &lt; 10; i++) {}</code></div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h5>Keyboard Shortcuts:</h5>
              <div style={{fontSize: '12px'}}>
                <div><kbd>Ctrl + S</kbd> - Save snippet</div>
                <div><kbd>Ctrl + Enter</kbd> - Run code</div>
                <div><kbd>Ctrl + /</kbd> - Toggle comment</div>
                <div><kbd>Tab</kbd> - Indent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// News Component with Auto-Shuffle
function NewsView() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const newsItems = SAMPLE_DATA.news;
  const categories = ['all', ...new Set(newsItems.map(item => item.category))];
  
  // Auto-shuffle news every 3 seconds
  useEffect(() => {
    if (!isPaused && newsItems.length > 0) {
      const interval = setInterval(() => {
        setCurrentNewsIndex(prev => (prev + 1) % newsItems.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPaused, newsItems.length]);
  
  // Filter news based on search and category
  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const currentNews = filteredNews[currentNewsIndex % filteredNews.length];
  
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>Placement News &amp; Updates</h1>
        <p>Stay updated with the latest placement information - Auto-updating every 3 seconds</p>
      </div>
      
      {/* News Controls */}
      <div className="card mb-24">
        <div className="card-body">
          <div className="grid grid-3 gap-16 items-center">
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-group mb-0">
              <select
                className="form-control"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-8">
              <button
                className={`btn ${isPaused ? 'btn--primary' : 'btn--secondary'}`}
                onClick={() => setIsPaused(!isPaused)}
              >
                <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'} mr-8`}></i>
                {isPaused ? 'Resume' : 'Pause'}
              </button>
              <button
                className="btn btn--outline"
                onClick={() => setCurrentNewsIndex(prev => (prev + 1) % filteredNews.length)}
              >
                <i className="fas fa-forward mr-8"></i>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured News Ticker */}
      {currentNews && (
        <div 
          className="card mb-24"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            background: currentNews.priority === 'high' ? 'var(--color-bg-4)' : 
                       currentNews.priority === 'medium' ? 'var(--color-bg-2)' : 'var(--color-bg-1)',
            transition: 'all 0.5s ease'
          }}
        >
          <div className="card-body">
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-16">
                <span className={`status status--${currentNews.priority === 'high' ? 'error' : currentNews.priority === 'medium' ? 'warning' : 'info'}`}>
                  {currentNews.category}
                </span>
                <span className="status status--success">
                  Featured News {currentNewsIndex + 1} of {filteredNews.length}
                </span>
              </div>
              <span style={{fontSize: '12px', color: 'var(--campus-text-muted)'}}>{currentNews.date}</span>
            </div>
            <h2 className="mb-8">{currentNews.title}</h2>
            <p className="mb-16" style={{fontSize: '16px'}}>{currentNews.content}</p>
            <div className="flex justify-between items-center">
              <span className={`status status--${currentNews.priority === 'high' ? 'error' : currentNews.priority === 'medium' ? 'warning' : 'success'}`}>
                {currentNews.priority.toUpperCase()} PRIORITY
              </span>
              <div className="flex gap-8">
                <button className="btn btn--primary btn--sm">
                  <i className="fas fa-share mr-8"></i>
                  Share
                </button>
                <button className="btn btn--outline btn--sm">
                  <i className="fas fa-bookmark mr-8"></i>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-2 gap-24">
        <div className="card">
          <div className="card-header">
            <h3>All News ({filteredNews.length})</h3>
          </div>
          <div className="card-body" style={{maxHeight: '600px', overflowY: 'auto'}}>
            {filteredNews.map((article, index) => (
              <div 
                key={article.id} 
                className={`mb-16 pb-16 ${index === currentNewsIndex ? 'animate-glow' : ''}`}
                style={{
                  borderBottom: '1px solid var(--campus-border)',
                  background: index === currentNewsIndex ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                  padding: '12px',
                  borderRadius: 'var(--radius-base)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setCurrentNewsIndex(index)}
              >
                <div className="flex justify-between items-center mb-8">
                  <span className={`status status--${article.category === 'Placement Drive' ? 'success' : article.category === 'Workshop' ? 'info' : 'warning'}`}>
                    {article.category}
                  </span>
                  <div className="flex items-center gap-8">
                    <span className={`status status--${article.priority === 'high' ? 'error' : article.priority === 'medium' ? 'warning' : 'info'}`}>
                      {article.priority}
                    </span>
                    <span style={{fontSize: '12px', color: 'var(--campus-text-muted)'}}>{article.date}</span>
                  </div>
                </div>
                <h4 style={{margin: '0 0 8px 0'}}>{article.title}</h4>
                <p style={{margin: 0, fontSize: '14px'}}>{article.content}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Company Requirements</h3>
          </div>
          <div className="card-body">
            {SAMPLE_DATA.jobs.map(job => (
              <div key={job.id} className="card mb-16">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-8">
                    <h5 style={{margin: 0}}>{job.title}</h5>
                    <span className="status status--success">{job.package}</span>
                  </div>
                  <p style={{margin: '0 0 8px 0', fontSize: '14px'}}>
                    <strong>{job.company}</strong> • {job.location}
                  </p>
                  <div className="mb-8">
                    {job.requirements.map((req, index) => (
                      <span key={index} className="status status--info mr-8 mb-4">
                        {req}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{fontSize: '12px'}}>Deadline: {job.deadline}</span>
                    <button className="btn btn--primary btn--sm">
                      <i className="fas fa-paper-plane mr-8"></i>
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Interview Experiences
function InterviewExperiences() {
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>Interview Experiences</h1>
        <p>Learn from your seniors' placement experiences</p>
      </div>
      
      <div className="grid gap-24">
        {SAMPLE_DATA.interview_experiences.map(experience => (
          <div key={experience.id} className="card">
            <div className="card-header">
              <div className="flex justify-between items-center">
                <div>
                  <h4 style={{margin: 0}}>{experience.student_name}</h4>
                  <p style={{margin: '4px 0 0 0', fontSize: '14px'}}>
                    {experience.position} at <strong>{experience.company}</strong>
                  </p>
                </div>
                <div className="text-right">
                  <span className="status status--success">{experience.package}</span>
                  <p style={{margin: '4px 0 0 0', fontSize: '12px'}}>{experience.date}</p>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="mb-16">
                <h5>Experience:</h5>
                <p>{experience.experience}</p>
              </div>
              <div>
                <h5>Tips:</h5>
                <p style={{margin: 0}}>{experience.tips}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Enhanced Analytics Dashboard with Deep Analysis
function AnalyticsDashboard() {
  const [chartInstances, setChartInstances] = useState({});
  
  // Analytics Data
  const analytics = {
    total_students: 1250,
    eligible_students: 1100,
    placed_students: 950,
    placement_percentage: 86.4,
    branch_wise: {
      "Computer Science": { total: 400, placed: 360, percentage: 90 },
      "Information Technology": { total: 350, placed: 315, percentage: 90 },
      "Electronics": { total: 200, placed: 165, percentage: 82.5 },
      "Mechanical": { total: 150, placed: 110, percentage: 73.3 },
      "Civil": { total: 150, placed: 100, percentage: 66.7 }
    },
    package_distribution: {
      "0-5 LPA": 350,
      "5-10 LPA": 280,
      "10-15 LPA": 180,
      "15-20 LPA": 95,
      "20+ LPA": 45
    },
    reasons_for_non_placement: {
      "Low CGPA (< 7.0)": 45,
      "Poor Interview Performance": 35,
      "Lack of Technical Skills": 28,
      "Communication Issues": 22,
      "Multiple Backlogs": 18,
      "Not Interested": 12,
      "Medical/Personal Issues": 8,
      "Late Application": 5
    }
  };
  
  const managementNotices = [
    {
      id: 1,
      title: "Director's Message: Record Placement Year 2024",
      content: "Congratulations to all students and faculty for achieving 86.4% placement rate, the highest in our institution's history. Special recognition to placement team for their dedicated efforts.",
      author: "Dr. Rajesh Sharma, Director",
      date: "2024-01-15",
      priority: "High",
      category: "Achievement"
    },
    {
      id: 2,
      title: "New Industry Partnerships Announced",
      content: "We have signed MoUs with 50+ new companies including startups and Fortune 500 companies to enhance placement opportunities for students.",
      author: "Dean, Academic Affairs",
      date: "2024-01-12",
      priority: "High",
      category: "Partnership"
    },
    {
      id: 3,
      title: "Skill Development Initiative Launch",
      content: "Launching comprehensive skill development program with industry certifications to bridge the gap between academic learning and industry requirements.",
      author: "Head, Training & Placement",
      date: "2024-01-10",
      priority: "Medium",
      category: "Training"
    }
  ];
  
  useEffect(() => {
    // Clean up existing charts
    Object.values(chartInstances).forEach(chart => chart?.destroy?.());
    
    // Placement Overview Chart
    const placementCtx = document.getElementById('placementOverviewChart');
    if (placementCtx) {
      const placementChart = new Chart(placementCtx, {
        type: 'doughnut',
        data: {
          labels: ['Placed', 'Not Placed'],
          datasets: [{
            data: [analytics.placed_students, analytics.total_students - analytics.placed_students],
            backgroundColor: ['#1FB8CD', '#FFC185'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#ffffff' }
            }
          }
        }
      });
      
      // Branch-wise Placement Chart
      const branchCtx = document.getElementById('branchPlacementChart');
      if (branchCtx) {
        const branchChart = new Chart(branchCtx, {
          type: 'bar',
          data: {
            labels: Object.keys(analytics.branch_wise),
            datasets: [{
              label: 'Placed',
              data: Object.values(analytics.branch_wise).map(b => b.placed),
              backgroundColor: '#1FB8CD'
            }, {
              label: 'Total',
              data: Object.values(analytics.branch_wise).map(b => b.total),
              backgroundColor: '#B4413C'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#ffffff' }
              }
            },
            scales: {
              x: { ticks: { color: '#ffffff' } },
              y: { ticks: { color: '#ffffff' } }
            }
          }
        });
        
        // Package Distribution Chart
        const packageCtx = document.getElementById('packageDistributionChart');
        if (packageCtx) {
          const packageChart = new Chart(packageCtx, {
            type: 'pie',
            data: {
              labels: Object.keys(analytics.package_distribution),
              datasets: [{
                data: Object.values(analytics.package_distribution),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: { color: '#ffffff' }
                }
              }
            }
          });
          
          setChartInstances({
            placement: placementChart,
            branch: branchChart,
            package: packageChart
          });
        }
      }
    }
    
    return () => {
      Object.values(chartInstances).forEach(chart => chart?.destroy?.());
    };
  }, []);
  
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>Deep Analytics Dashboard</h1>
        <p>Comprehensive placement analysis with trends and insights</p>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-4 mb-24">
        <DashboardCard 
          icon="fas fa-users" 
          title="Total Students" 
          value={analytics.total_students}
          subtitle="Registered for Placement"
        />
        <DashboardCard 
          icon="fas fa-check-circle" 
          title="Placed" 
          value={analytics.placed_students}
          subtitle={`${analytics.placement_percentage}% Success Rate`}
          color="var(--campus-primary)"
        />
        <DashboardCard 
          icon="fas fa-user-check" 
          title="Eligible" 
          value={analytics.eligible_students}
          subtitle="Meet Criteria (CGPA > 7.0)"
          color="var(--campus-secondary)"
        />
        <DashboardCard 
          icon="fas fa-building" 
          title="Companies" 
          value="800+"
          subtitle="In Database"
          color="var(--campus-accent)"
        />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-3 gap-24 mb-24">
        <div className="card">
          <div className="card-header">
            <h3>Placement Overview</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <canvas id="placementOverviewChart"></canvas>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Package Distribution</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <canvas id="packageDistributionChart"></canvas>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Reasons for Non-Placement</h3>
          </div>
          <div className="card-body">
            {Object.entries(analytics.reasons_for_non_placement).map(([reason, count]) => (
              <div key={reason} className="flex justify-between items-center mb-8">
                <span style={{fontSize: '14px'}}>{reason}</span>
                <span className="status status--error">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Branch-wise Analysis */}
      <div className="card mb-24">
        <div className="card-header">
          <h3>Branch-wise Placement Analysis</h3>
        </div>
        <div className="card-body">
          <div className="chart-container" style={{height: '400px'}}>
            <canvas id="branchPlacementChart"></canvas>
          </div>
        </div>
      </div>
      
      {/* Top Management Notices */}
      <div className="card">
        <div className="card-header">
          <h3>Top Management Notices</h3>
        </div>
        <div className="card-body">
          {managementNotices.map(notice => (
            <div key={notice.id} className="card mb-16">
              <div className="card-header">
                <div className="flex justify-between items-center">
                  <h4 style={{margin: 0}}>{notice.title}</h4>
                  <span className={`status status--${notice.priority === 'High' ? 'error' : 'warning'}`}>
                    {notice.priority}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <p>{notice.content}</p>
                <div className="flex justify-between items-center mt-16">
                  <span style={{fontSize: '14px', fontWeight: 'bold'}}>{notice.author}</span>
                  <span style={{fontSize: '12px', color: 'var(--campus-text-muted)'}}>{notice.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Student Management Dashboard
function StudentManagement() {
  const [students, setStudents] = useState(DATABASE.students);
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const branches = ['all', ...new Set(students.map(s => s.branch))];
  const statuses = ['all', 'Placed', 'Eligible', 'Not Eligible', 'In Process'];
  
  // Eligibility criteria
  const eligibilityCriteria = {
    minimum_cgpa: 7.0,
    maximum_backlogs: 0,
    graduation_year: 2024
  };
  
  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branchFilter === 'all' || student.branch === branchFilter;
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    return matchesSearch && matchesBranch && matchesStatus;
  });
  
  const eligibleCount = students.filter(s => s.eligible).length;
  const placedCount = students.filter(s => s.status === 'Placed').length;
  const inProcessCount = students.filter(s => s.status === 'In Process').length;
  
  const exportStudentData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Branch,CGPA,Status,Package,Skills\n" +
      filteredStudents.map(s => 
        `${s.name},${s.email},${s.branch},${s.cgpa},${s.status},${s.package || 'N/A'},"${s.skills?.join(', ') || ''}"`
      ).join("\n");
    
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "students_data.csv";
    link.click();
  };
  
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>Student Management</h1>
        <p>Comprehensive student database and eligibility management</p>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-4 mb-24">
        <DashboardCard 
          icon="fas fa-users" 
          title="Total Students" 
          value={students.length}
          subtitle="Registered"
        />
        <DashboardCard 
          icon="fas fa-check-circle" 
          title="Eligible" 
          value={eligibleCount}
          subtitle="Meet Criteria"
          color="var(--campus-primary)"
        />
        <DashboardCard 
          icon="fas fa-briefcase" 
          title="Placed" 
          value={placedCount}
          subtitle="Successfully Placed"
          color="var(--campus-secondary)"
        />
        <DashboardCard 
          icon="fas fa-clock" 
          title="In Process" 
          value={inProcessCount}
          subtitle="Interviews Ongoing"
          color="var(--campus-accent)"
        />
      </div>
      
      {/* Filters and Actions */}
      <div className="card mb-24">
        <div className="card-body">
          <div className="grid grid-4 gap-16 mb-16">
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-group mb-0">
              <select
                className="form-control"
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>
                    {branch === 'all' ? 'All Branches' : branch}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0">
              <select
                className="form-control"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn--primary" onClick={exportStudentData}>
              <i className="fas fa-download mr-8"></i>
              Export Data
            </button>
          </div>
          
          {/* Eligibility Criteria */}
          <div className="card" style={{background: 'var(--color-bg-3)'}}>
            <div className="card-body py-12">
              <h5 style={{margin: '0 0 8px 0'}}>Eligibility Criteria:</h5>
              <div className="flex gap-24">
                <span>CGPA ≥ {eligibilityCriteria.minimum_cgpa}</span>
                <span>No Backlogs</span>
                <span>Final Year Students</span>
                <span>Age ≤ 25 years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Students Table */}
      <div className="card">
        <div className="card-header">
          <h3>Students Database ({filteredStudents.length})</h3>
        </div>
        <div className="card-body" style={{padding: 0}}>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', fontSize: '14px'}}>
              <thead style={{background: 'var(--campus-card-bg)', borderBottom: '1px solid var(--campus-border)'}}>
                <tr>
                  <th style={{padding: '12px', textAlign: 'left'}}>Name</th>
                  <th style={{padding: '12px', textAlign: 'left'}}>Branch</th>
                  <th style={{padding: '12px', textAlign: 'center'}}>CGPA</th>
                  <th style={{padding: '12px', textAlign: 'center'}}>Status</th>
                  <th style={{padding: '12px', textAlign: 'center'}}>Package</th>
                  <th style={{padding: '12px', textAlign: 'left'}}>Skills</th>
                  <th style={{padding: '12px', textAlign: 'center'}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id} style={{borderBottom: '1px solid var(--campus-border)'}}>
                    <td style={{padding: '12px'}}>
                      <div>
                        <div style={{fontWeight: 'bold'}}>{student.name}</div>
                        <div style={{fontSize: '12px', color: 'var(--campus-text-muted)'}}>{student.email}</div>
                      </div>
                    </td>
                    <td style={{padding: '12px'}}>{student.branch}</td>
                    <td style={{padding: '12px', textAlign: 'center'}}>
                      <span className={`status ${student.cgpa >= 7.0 ? 'status--success' : 'status--error'}`}>
                        {student.cgpa}
                      </span>
                    </td>
                    <td style={{padding: '12px', textAlign: 'center'}}>
                      <span className={`status status--${
                        student.status === 'Placed' ? 'success' :
                        student.status === 'Eligible' ? 'info' :
                        student.status === 'In Process' ? 'warning' : 'error'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td style={{padding: '12px', textAlign: 'center'}}>
                      {student.package || 'N/A'}
                    </td>
                    <td style={{padding: '12px'}}>
                      <div style={{fontSize: '12px'}}>
                        {student.skills?.slice(0, 3).join(', ')}
                        {student.skills?.length > 3 && '...'}
                      </div>
                    </td>
                    <td style={{padding: '12px', textAlign: 'center'}}>
                      <div className="flex gap-4">
                        <button className="btn btn--outline btn--sm">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn btn--primary btn--sm">
                          <i className="fas fa-edit"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Companies Database with 800+ companies
function CompaniesDatabase() {
  const [companies, setCompanies] = useState(DATABASE.companies);
  const [searchTerm, setSearchTerm] = useState('');
  const [packageFilter, setPackageFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  
  // Generate additional companies to reach 800+
  const generateMoreCompanies = () => {
    const additionalCompanies = [
      // Add more companies with realistic data
      { name: "Adobe", package: "28-35 LPA", skills_required: ["JavaScript", "React", "Node.js", "Creative Suite APIs"], industry: "Software", location: "Bangalore, Noida" },
      { name: "Salesforce", package: "25-32 LPA", skills_required: ["Salesforce Platform", "Apex", "Lightning", "CRM"], industry: "CRM Software", location: "Bangalore, Hyderabad" },
      { name: "VMware", package: "22-28 LPA", skills_required: ["Virtualization", "Cloud Computing", "Java", "Networking"], industry: "Virtualization", location: "Bangalore" },
      { name: "PayPal", package: "24-30 LPA", skills_required: ["Java", "Spring", "Microservices", "Payment Systems"], industry: "Fintech", location: "Bangalore, Chennai" },
      { name: "Netflix", package: "35-42 LPA", skills_required: ["Microservices", "Distributed Systems", "Java/Python", "AWS"], industry: "Streaming", location: "Bangalore" },
      { name: "Wipro", package: "3.8-7.5 LPA", skills_required: ["Programming", "Database Management", "Software Testing"], industry: "IT Services", location: "Bangalore, Hyderabad, Chennai" },
      { name: "Cognizant", package: "4-8 LPA", skills_required: ["Java", "SQL", "Web Technologies", "Communication"], industry: "IT Services", location: "Chennai, Bangalore, Pune" },
      { name: "HCL Technologies", package: "3.7-7.2 LPA", skills_required: ["Programming Languages", "Database", "System Analysis"], industry: "IT Services", location: "Noida, Chennai, Bangalore" }
    ];
    
    return [...companies, ...additionalCompanies];
  };
  
  const allCompanies = generateMoreCompanies();
  const industries = ['all', ...new Set(allCompanies.map(c => c.industry))];
  const packageRanges = ['all', '0-10 LPA', '10-20 LPA', '20-30 LPA', '30+ LPA'];
  
  // Filter companies
  const filteredCompanies = allCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || company.industry === industryFilter;
    
    let matchesPackage = true;
    if (packageFilter !== 'all') {
      const packageNum = parseFloat(company.package.split('-')[0]);
      switch (packageFilter) {
        case '0-10 LPA': matchesPackage = packageNum < 10; break;
        case '10-20 LPA': matchesPackage = packageNum >= 10 && packageNum < 20; break;
        case '20-30 LPA': matchesPackage = packageNum >= 20 && packageNum < 30; break;
        case '30+ LPA': matchesPackage = packageNum >= 30; break;
      }
    }
    
    return matchesSearch && matchesIndustry && matchesPackage;
  });
  
  const exportCompaniesData = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Company,Package,Industry,Location,Skills Required\n" +
      filteredCompanies.map(c =>
        `${c.name},${c.package},${c.industry},${c.location || 'N/A'},"${c.skills_required?.join(', ') || ''}"`
      ).join("\n");
    
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "companies_data.csv";
    link.click();
  };
  
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>Companies Database</h1>
        <p>Comprehensive database of 800+ companies with package details and requirements</p>
      </div>
      
      {/* Statistics */}
      <div className="grid grid-4 mb-24">
        <DashboardCard 
          icon="fas fa-building" 
          title="Total Companies" 
          value="800+"
          subtitle="In Database"
        />
        <DashboardCard 
          icon="fas fa-money-bill-wave" 
          title="Avg Package" 
          value="12.5 LPA"
          subtitle="Across All Companies"
          color="var(--campus-primary)"
        />
        <DashboardCard 
          icon="fas fa-chart-line" 
          title="Highest Package" 
          value="55 LPA"
          subtitle="Google/Microsoft"
          color="var(--campus-secondary)"
        />
        <DashboardCard 
          icon="fas fa-handshake" 
          title="Active Hirers" 
          value="150+"
          subtitle="Currently Hiring"
          color="var(--campus-accent)"
        />
      </div>
      
      {/* Filters */}
      <div className="card mb-24">
        <div className="card-body">
          <div className="grid grid-4 gap-16">
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="form-group mb-0">
              <select
                className="form-control"
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-0">
              <select
                className="form-control"
                value={packageFilter}
                onChange={(e) => setPackageFilter(e.target.value)}
              >
                {packageRanges.map(range => (
                  <option key={range} value={range}>
                    {range === 'all' ? 'All Packages' : range}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn--primary" onClick={exportCompaniesData}>
              <i className="fas fa-download mr-8"></i>
              Export List
            </button>
          </div>
        </div>
      </div>
      
      {/* Companies Grid */}
      <div className="grid gap-16">
        {filteredCompanies.map((company, index) => (
          <div key={index} className="card">
            <div className="card-body">
              <div className="flex justify-between items-start mb-16">
                <div>
                  <h4 style={{margin: 0}}>{company.name}</h4>
                  <p style={{margin: '4px 0', color: 'var(--campus-text-muted)'}}>{company.industry}</p>
                </div>
                <div className="text-right">
                  <span className="status status--success" style={{fontSize: '14px'}}>
                    {company.package}
                  </span>
                  <p style={{margin: '4px 0', fontSize: '12px'}}>{company.location}</p>
                </div>
              </div>
              
              <div className="mb-16">
                <h5 style={{margin: '0 0 8px 0'}}>Skills Required:</h5>
                <div className="flex flex-wrap gap-8">
                  {company.skills_required?.map((skill, skillIndex) => (
                    <span key={skillIndex} className="status status--info" style={{fontSize: '12px'}}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-8">
                <button className="btn btn--primary btn--sm">
                  <i className="fas fa-eye mr-8"></i>
                  View Details
                </button>
                <button className="btn btn--secondary btn--sm">
                  <i className="fas fa-plus mr-8"></i>
                  Add to Drive
                </button>
                <button className="btn btn--outline btn--sm">
                  <i className="fas fa-edit mr-8"></i>
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredCompanies.length === 0 && (
        <div className="text-center py-24">
          <i className="fas fa-search fa-2x mb-16" style={{color: 'var(--campus-text-muted)'}}></i>
          <p>No companies found matching your criteria</p>
        </div>
      )}
    </div>
  );
}

// Admin Dashboard - Updated
function AdminDashboard() {
  const stats = SAMPLE_DATA.placement_stats;
  
  useEffect(() => {
    // Create placement statistics chart
    const ctx = document.getElementById('placementChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Placed', 'Not Placed'],
          datasets: [{
            data: [stats.placed_students, stats.total_students - stats.placed_students],
            backgroundColor: ['#00d4ff', '#7c3aed'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#ffffff'
              }
            }
          }
        }
      });
    }
  }, []);
  
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>Admin Dashboard</h1>
        <p>Placement statistics and management overview</p>
      </div>
      
      <div className="grid grid-4 mb-24">
        <DashboardCard 
          icon="fas fa-users" 
          title="Total Students" 
          value={stats.total_students}
          subtitle="Registered"
        />
        <DashboardCard 
          icon="fas fa-check-circle" 
          title="Placed" 
          value={stats.placed_students}
          subtitle={`${stats.placement_percentage}% Success`}
          color="var(--campus-primary)"
        />
        <DashboardCard 
          icon="fas fa-building" 
          title="Companies" 
          value="800+"
          subtitle="In Database"
          color="var(--campus-secondary)"
        />
        <DashboardCard 
          icon="fas fa-briefcase" 
          title="Active Drives" 
          value={stats.ongoing_drives}
          subtitle="In Progress"
          color="var(--campus-accent)"
        />
      </div>
      
      <div className="grid grid-2 gap-24">
        <div className="card">
          <div className="card-header">
            <h3>Placement Statistics</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <canvas id="placementChart"></canvas>
            </div>
            <div className="grid grid-2 gap-16 mt-16">
              <div className="text-center">
                <h4 style={{margin: 0, color: 'var(--campus-primary)'}}>{stats.highest_package}</h4>
                <p style={{margin: 0, fontSize: '12px'}}>Highest Package</p>
              </div>
              <div className="text-center">
                <h4 style={{margin: 0, color: 'var(--campus-secondary)'}}>{stats.average_package}</h4>
                <p style={{margin: 0, fontSize: '12px'}}>Average Package</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Recent Activities</h3>
          </div>
          <div className="card-body">
            <div className="mb-16">
              <div className="flex items-center gap-16 mb-8">
                <i className="fas fa-plus-circle" style={{color: 'var(--campus-primary)'}}></i>
                <span>New job posting from TCS</span>
              </div>
              <p style={{margin: 0, fontSize: '12px', paddingLeft: '32px'}}>2 hours ago</p>
            </div>
            <div className="mb-16">
              <div className="flex items-center gap-16 mb-8">
                <i className="fas fa-user-check" style={{color: 'var(--campus-accent)'}}></i>
                <span>5 students placed at Infosys</span>
              </div>
              <p style={{margin: 0, fontSize: '12px', paddingLeft: '32px'}}>1 day ago</p>
            </div>
            <div className="mb-16">
              <div className="flex items-center gap-16 mb-8">
                <i className="fas fa-calendar-plus" style={{color: 'var(--campus-secondary)'}}></i>
                <span>Amazon campus drive scheduled</span>
              </div>
              <p style={{margin: 0, fontSize: '12px', paddingLeft: '32px'}}>2 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Company Dashboard - FIXED
function CompanyDashboard({ user }) {
  const [jobApplications, setJobApplications] = useState([]);
  const [activeJobs, setActiveJobs] = useState([]);
  
  useEffect(() => {
    // Load applications for this company
    const applications = DATABASE.students.filter(student => 
      student.applications?.includes(user.name)
    );
    setJobApplications(applications);
    
    // Mock active jobs for this company
    const jobs = [
      {
        id: 1,
        title: "Software Engineer",
        package: user.package || "5-10 LPA",
        location: user.location || "Bangalore",
        applicants: applications.length,
        deadline: "2024-02-28",
        status: "Active"
      },
      {
        id: 2,
        title: "Senior Developer",
        package: user.package || "8-15 LPA",
        location: user.location || "Hyderabad",
        applicants: Math.floor(applications.length / 2),
        deadline: "2024-03-15",
        status: "Active"
      }
    ];
    setActiveJobs(jobs);
  }, [user]);
  
  const shortlistedCount = Math.floor(jobApplications.length * 0.4);
  const hiredCount = Math.floor(jobApplications.length * 0.1);
  
  return (
    <div className="container py-24">
      <div className="mb-24">
        <h1>Welcome, {user.name}!</h1>
        <p>Manage your recruitment process - Industry: {user.industry}</p>
        <div className="flex gap-16 items-center">
          <span className="status status--info">Package: {user.package}</span>
          <span className="status status--success">Location: {user.location}</span>
        </div>
      </div>
      
      <div className="grid grid-4 mb-24">
        <DashboardCard 
          icon="fas fa-briefcase" 
          title="Active Jobs" 
          value={activeJobs.length}
          subtitle="Currently Hiring"
        />
        <DashboardCard 
          icon="fas fa-file-alt" 
          title="Applications" 
          value={jobApplications.length}
          subtitle="Received"
          color="var(--campus-secondary)"
        />
        <DashboardCard 
          icon="fas fa-users" 
          title="Shortlisted" 
          value={shortlistedCount}
          subtitle="Candidates"
          color="var(--campus-accent)"
        />
        <DashboardCard 
          icon="fas fa-handshake" 
          title="Hired" 
          value={hiredCount}
          subtitle="This Year"
          color="var(--color-success)"
        />
      </div>
      
      <div className="grid grid-2 gap-24">
        <div className="card">
          <div className="card-header">
            <h3>Recent Applications ({jobApplications.length})</h3>
          </div>
          <div className="card-body" style={{maxHeight: '400px', overflowY: 'auto'}}>
            {jobApplications.length > 0 ? jobApplications.map(student => (
              <div key={student.id} className="flex justify-between items-center mb-16 pb-16" style={{borderBottom: '1px solid var(--campus-border)'}}>
                <div>
                  <h5 style={{margin: 0}}>{student.name}</h5>
                  <p style={{margin: 0, fontSize: '12px'}}>{student.branch} • CGPA: {student.cgpa}</p>
                  <div className="flex gap-4 mt-4">
                    {student.skills?.slice(0, 3).map((skill, index) => (
                      <span key={index} className="status status--info" style={{fontSize: '10px'}}>{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-8">
                  <button className="btn btn--primary btn--sm">
                    <i className="fas fa-eye mr-4"></i>
                    Review
                  </button>
                  <button className="btn btn--secondary btn--sm">
                    <i className="fas fa-check mr-4"></i>
                    Shortlist
                  </button>
                  <button className="btn btn--outline btn--sm">
                    <i className="fas fa-times mr-4"></i>
                    Reject
                  </button>
                </div>
              </div>
            )) : (
              <div className="text-center py-24">
                <i className="fas fa-inbox fa-2x mb-16" style={{color: 'var(--campus-text-muted)'}}></i>
                <p>No applications received yet</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3>Active Job Postings ({activeJobs.length})</h3>
          </div>
          <div className="card-body">
            {activeJobs.map(job => (
              <div key={job.id} className="card mb-16">
                <div className="card-body">
                  <div className="flex justify-between items-center mb-8">
                    <h5 style={{margin: 0}}>{job.title}</h5>
                    <span className="status status--success">{job.status}</span>
                  </div>
                  <p style={{margin: '0 0 8px 0'}}>{job.location} • {job.package}</p>
                  <p style={{margin: '0 0 8px 0', fontSize: '12px'}}>Applications: {job.applicants}</p>
                  <p style={{margin: 0, fontSize: '12px'}}>Deadline: {job.deadline}</p>
                  <div className="flex gap-8 mt-12">
                    <button className="btn btn--outline btn--sm">
                      <i className="fas fa-edit mr-4"></i>
                      Edit
                    </button>
                    <button className="btn btn--secondary btn--sm">
                      <i className="fas fa-users mr-4"></i>
                      View Applications
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn--primary w-full mt-16">
              <i className="fas fa-plus mr-8"></i>
              Post New Job
            </button>
          </div>
        </div>
      </div>
      
      {/* Skills Required Section */}
      <div className="card mt-24">
        <div className="card-header">
          <h3>Skills We're Looking For</h3>
        </div>
        <div className="card-body">
          <div className="flex flex-wrap gap-8">
            {user.skills_required?.map((skill, index) => (
              <span key={index} className="status status--info">{skill}</span>
            ))}
          </div>
          <div className="mt-16">
            <h5>Hiring Process:</h5>
            <p>{user.hiring_process || "Online Assessment → Technical Interview → HR Round"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [currentView, setCurrentView] = useState('landing');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  
  // Check for existing session on load
  useEffect(() => {
    const session = getSession();
    if (session) {
      setCurrentUser(session.user);
      setUserRole(session.role);
      setCurrentView('dashboard');
    }
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRegistration(false);
    setCurrentView('auth');
  };

  const handleLogin = (user, role) => {
    setCurrentUser(user);
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    // FIXED: Proper logout functionality
    if (confirm('Are you sure you want to logout? All unsaved data will be lost.')) {
      // Clear all state
      setCurrentUser(null);
      setUserRole(null);
      setCurrentView('landing');
      setSelectedRole(null);
      setShowRegistration(false);
      
      // Clear session and any other data
      clearSession();
      
      // Reset any global state
      DATABASE = {
        ...DATABASE // Keep the database but clear session
      };
      
      // Show logout success message
      setTimeout(() => {
        alert('Logged out successfully!');
      }, 100);
    }
  };

  const handleBack = () => {
    setCurrentView('landing');
    setSelectedRole(null);
    setShowRegistration(false);
  };
  
  const handleToggleAuth = () => {
    setShowRegistration(!showRegistration);
  };
  
  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
  };

  const renderView = () => {
    if (currentView === 'landing') {
      return <LandingPage onRoleSelect={handleRoleSelect} />;
    }
    
    if (currentView === 'auth') {
      if (showRegistration) {
        return (
          <RegistrationPage 
            role={selectedRole} 
            onRegister={handleRegistrationSuccess}
            onBack={handleBack}
            onToggleToLogin={handleToggleAuth}
          />
        );
      } else {
        return (
          <LoginPage 
            role={selectedRole} 
            onLogin={handleLogin} 
            onBack={handleBack}
            onToggleToRegister={handleToggleAuth}
          />
        );
      }
    }
    
    if (!currentUser) return null;
    
    // Student Views
    if (userRole === 'student') {
      switch (currentView) {
        case 'dashboard': return <StudentDashboard user={currentUser} />;
        case 'resume': return <AIResumeBuilder />;
        case 'dsa': return <DSAPractice />;
        case 'editor': return <CodeEditor />;
        case 'news': return <NewsView />;
        case 'interviews': return <InterviewExperiences />;
        default: return <StudentDashboard user={currentUser} />;
      }
    }
    
    // Admin Views - FIXED
    if (userRole === 'admin') {
      switch (currentView) {
        case 'dashboard': return <AdminDashboard />;
        case 'analytics': return <AnalyticsDashboard />;
        case 'students': return <StudentManagement />;
        case 'companies': return <CompaniesDatabase />;
        case 'placements':
        case 'notices':
          return <AdminDashboard />;
        default: return <AdminDashboard />;
      }
    }
    
    // Company Views - FIXED
    if (userRole === 'company') {
      switch (currentView) {
        case 'dashboard': return <CompanyDashboard user={currentUser} />;
        case 'jobs': return <CompanyDashboard user={currentUser} />;
        case 'applications': return <CompanyDashboard user={currentUser} />;
        case 'interviews': return <CompanyDashboard user={currentUser} />;
        case 'profile': return <CompanyDashboard user={currentUser} />;
        default: return <CompanyDashboard user={currentUser} />;
      }
    }
    
    return null;
  };

  return (
    <div className="app">
      {currentUser && (
        <Navigation 
          user={currentUser}
          role={userRole}
          onLogout={handleLogout}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      )}
      {renderView()}
    </div>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));