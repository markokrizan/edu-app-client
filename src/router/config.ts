import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from "../constants";
import AdminExamRegistrations from "../pages/AdminExamRegistrations.svelte";
import AdminExams from "../pages/AdminExams.svelte";
import TeacherExams from '../pages/TeacherExams.svelte';
import AdminCourses from "../pages/AdminCourses.svelte";
import Students from "../pages/Students.svelte";
import StudyPrograms from "../pages/StudyPrograms.svelte";
import Teachers from "../pages/Teachers.svelte";
import Terms from "../pages/Terms.svelte";
import UserProfile from "../pages/UserProfile.svelte";
import Course from "../pages/Course.svelte";
import Teacher from "../pages/Teacher.svelte";
import Student from "../pages/Student.svelte";
import StudentCourses from "../pages/StudentCourses.svelte";
import TeacherCourses from "../pages/TeacherCourses.svelte";
import StudentExams from "../pages/StudentExams.svelte";
import StudentExamRegistrations from "../pages/StudentExamRegistrations.svelte";
import TeacherExamRegistrations from "../pages/TeacherExamRegistrations.svelte";

const ROUTES = [
    {
        name: 'Profile',
        accessibleViaSidebar: false,
        path: '/profile',
        components: {
            [ROLE_ADMIN]: UserProfile,
            [ROLE_TEACHER]: UserProfile,
            [ROLE_STUDENT]: UserProfile
        }
    },
    {
        name: 'Study Programs',
        sidebarIconClass: 'bi bi-bookmark-star fs-4',
        accessibleViaSidebar: true,
        path: '/study-programs',
        components: {
            [ROLE_ADMIN]: StudyPrograms
        }
    },
    {
        name: 'Terms',
        sidebarIconClass: 'bi bi-calendar-check fs-4',
        accessibleViaSidebar: true,
        path: '/terms',
        components: {
            [ROLE_ADMIN]: Terms,
            [ROLE_TEACHER]: Terms,
            [ROLE_STUDENT]: Terms
        }
    },
    {
        name: 'Courses',
        sidebarIconClass: 'bi bi-book fs-4',
        accessibleViaSidebar: true,
        path: '/courses',
        components: {
            [ROLE_ADMIN]: AdminCourses,
            [ROLE_TEACHER]: TeacherCourses, 
            [ROLE_STUDENT]: StudentCourses
        }
    },
    {
        name: 'Course',
        accessibleViaSidebar: false,
        path: 'courses/*id',
        components: {
            [ROLE_ADMIN]: Course,
            [ROLE_TEACHER]: Course, 
            [ROLE_STUDENT]: Course
        }
    },
    {
        name: 'Exams',
        sidebarIconClass: 'bi bi-clipboard-check fs-4',
        accessibleViaSidebar: true,
        path: '/exams',
        components: {
            [ROLE_ADMIN]: AdminExams,
            [ROLE_TEACHER]: TeacherExams,
            [ROLE_STUDENT]: StudentExams
        }
    },
    {
        name: 'Exam Registrations',
        sidebarIconClass: 'bi bi-card-checklist fs-4',
        accessibleViaSidebar: true,
        path: '/exam-registrations',
        components: {
            [ROLE_ADMIN]: AdminExamRegistrations,
            [ROLE_TEACHER]: TeacherExamRegistrations, 
            [ROLE_STUDENT]: StudentExamRegistrations
        }
    },
    {
        name: 'Teachers',
        sidebarIconClass: 'bi bi-file-person fs-4',
        accessibleViaSidebar: true,
        path: '/teachers',
        components: {
            [ROLE_ADMIN]: Teachers,
        }
    },
    {
        name: 'Teacher',
        accessibleViaSidebar: false,
        path: '/teachers/*id',
        components: {
            [ROLE_ADMIN]: Teacher,
        }
    },
    {
        name: 'Students',
        sidebarIconClass: 'bi bi-people fs-4',
        accessibleViaSidebar: true,
        path: '/students',
        components: {
            [ROLE_ADMIN]: Students,
        }
    },
    {
        name: 'Student',
        sidebarIconClass: 'bi bi-people fs-4',
        accessibleViaSidebar: false,
        path: '/students/*id',
        components: {
            [ROLE_ADMIN]: Student,
        }
    }
]

export default ROUTES;
