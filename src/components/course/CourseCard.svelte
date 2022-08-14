<script lang="ts">
    import { Link } from "svelte-navigator";

	export let course;

    let isHovered = false
	
	function toggleHovered() {
		isHovered = !isHovered
	}
</script>

<style>
    .card-container {
        width: 18rem;
    }
</style>

<Link 
    to="/courses/{course?.id}" 
    class="text-decoration-none text-dark" 
>
    <div 
        class="card card-container col m-4 {isHovered ? 'shadow' : ''}" 
        role="button" 
        on:mouseenter={toggleHovered}
        on:mouseleave={toggleHovered}
    >
        <div class="card-body">
            <h5 class="card-title">{course?.name}</h5>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Year: {course?.year}</li>
            <li class="list-group-item">Semester: {course?.semester}</li>
            <li class="list-group-item">ESPB points: {course?.espbPoints}</li>
        </ul>
    </div>
</Link>
