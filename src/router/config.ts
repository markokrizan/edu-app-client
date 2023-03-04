import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from "../constants";
import AdminExamRegistrations from "../pages/admin/ExamRegistrations.svelte";
import AdminExams from "../pages/admin/Exams.svelte";
import TeacherExams from '../pages/teacher/Exams.svelte';
import AdminCourses from "../pages/admin/Courses.svelte";
import AdminCreateCourse from "../pages/admin/CreateCourse.svelte";
import Students from "../pages/student/Students.svelte";
import StudyPrograms from "../pages/admin/StudyPrograms.svelte";
import AdminTeachers from "../pages/admin/Teachers.svelte";
import Terms from "../pages/shared/Terms.svelte";
import AdminProfile from "../pages/admin/Profile.svelte";
import Course from "../pages/admin/Course.svelte";
import AdminTeacher from "../pages/admin/Teacher.svelte";
import AdminStudent from "../pages/admin/Student.svelte";
import StudentCourses from "../pages/student/Courses.svelte";
import TeacherCourses from "../pages/teacher/Courses.svelte";
import StudentExams from "../pages/student/Exams.svelte";
import StudentExamRegistrations from "../pages/student/ExamRegistrations.svelte";
import TeacherExamRegistrations from "../pages/teacher/ExamRegistrations.svelte";
import StudentProfile from "../pages/student/Profile.svelte";
import TeacherProfile from "../pages/teacher/Profile.svelte";
import TeacherCourse from "../pages/teacher/Course.svelte";
import StudentCourse from "../pages/student/Course.svelte";

const ROUTES = [
    {
        name: 'Profile',
        accessibleViaSidebar: false,
        path: '/profile',
        components: {
            [ROLE_ADMIN]: AdminProfile,
            [ROLE_TEACHER]: TeacherProfile,
            [ROLE_STUDENT]: StudentProfile
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
        name: 'Create Course',
        accessibleViaSidebar: false,
        path: '/courses/create',
        components: {
            [ROLE_ADMIN]: AdminCreateCourse,
        }
    },
    {
        name: 'Course',
        accessibleViaSidebar: false,
        path: 'courses/*id',
        components: {
            [ROLE_ADMIN]: Course,
            [ROLE_TEACHER]: TeacherCourse, 
            [ROLE_STUDENT]: StudentCourse
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
            [ROLE_ADMIN]: AdminTeachers,
        }
    },
    {
        name: 'Teacher',
        accessibleViaSidebar: false,
        path: '/teachers/*id',
        components: {
            [ROLE_ADMIN]: AdminTeacher
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
            [ROLE_ADMIN]: AdminStudent,
        }
    }
]

export default ROUTES;
