<script lang="ts">
	import { Route } from "svelte-navigator";
    import Courses from "./pages/courses/Courses.svelte";
	import Course from "./pages/Course.svelte";
</script>

<Route path="courses" component={Courses} />
<Route path="courses/*id" component={Course} />

<Route path="exams">
    <h3>Exams</h3>
</Route>

<Route path="teachers">
    <h3>Teachers</h3>
</Route>

<Route path="terms">
    <h3>Terms</h3>
</Route>

<Route>
    <h3>Default dashboard route</h3>
</Route>

