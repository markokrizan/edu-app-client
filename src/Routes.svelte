<script lang="ts">
	import { Route } from "svelte-navigator";
	import SingleCourse from "./pages/SingleCourse.svelte";
</script>

<Route path="courses">
    <h3>Courses</h3>
</Route>

<Route path="courses/*id" component={SingleCourse} />

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

