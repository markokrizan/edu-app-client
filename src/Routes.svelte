<script lang="ts">
	import { Route } from "svelte-navigator";
    import Courses from "./pages/Courses.svelte";
	import Course from "./pages/Course.svelte";
    import Teachers from "./pages/Teachers.svelte";
    import Teacher from "./pages/Teacher.svelte";
</script>

<Route path="courses" component={Courses} />
<Route path="courses/*id" component={Course} />
<Route path="teachers" component={Teachers} />
<Route path="teachers/*id" component={Teacher} />

<Route path="exams">
    <h3>Exams</h3>
</Route>

<Route path="terms">
    <h3>Terms</h3>
</Route>

<Route>
    <h3>Default dashboard route</h3>
</Route>
