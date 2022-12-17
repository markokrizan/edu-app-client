<script lang="ts">
    import { navigate, useLocation } from "svelte-navigator";

	import { Route } from "svelte-navigator";
    import Courses from "./pages/Courses.svelte";
	import Course from "./pages/Course.svelte";
    import Teachers from "./pages/Teachers.svelte";
    import Teacher from "./pages/Teacher.svelte";
    import AdminExams from "./pages/AdminExams.svelte";
    import Login from "./pages/Login.svelte";
    import NotFound from "./pages/NotFound.svelte";
    import UserProfile from "./pages/UserProfile.svelte";
    import StudyPrograms from "./pages/StudyPrograms.svelte";
    import Terms from "./pages/Terms.svelte";
    
    const location = useLocation();

    if ($location?.pathname === '/') {
        navigate('/profile');
    }
</script>

<Route path="profile" component={UserProfile} />
<Route path="login" component={Login} />
<Route path="courses" component={Courses} />
<Route path="courses/*id" component={Course} />
<Route path="teachers" component={Teachers} />
<Route path="teachers/*id" component={Teacher} />
<Route path="admin/exams" component={AdminExams} />
<Route path="admin/exams" component={AdminExams} />
<Route path="/study-programs" component={StudyPrograms} />
<Route path="/terms" component={Terms} />
<Route component={NotFound} />
