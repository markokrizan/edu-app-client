<script lang="ts">
	import { Route } from "svelte-navigator";
    import Courses from "./pages/Courses.svelte";
	import Course from "./pages/Course.svelte";
    import Teachers from "./pages/Teachers.svelte";
    import Teacher from "./pages/Teacher.svelte";
    import AdminExams from "./pages/AdminExams.svelte";
</script>

<Route path="courses" component={Courses} />
<Route path="courses/*id" component={Course} />
<Route path="teachers" component={Teachers} />
<Route path="teachers/*id" component={Teacher} />
<Route path="admin/exams" component={AdminExams} />

<Route>
    <h3>Not found</h3>
</Route>
