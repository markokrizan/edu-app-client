<script lang="ts">
    import CourseCard from "../../components/course/CourseCard.svelte";

	const DUMMY_COURSES = [
        {
            id: 1,
            name: 'E education',
            year: 'FIRST',
            semester: 'SUMMER',
            espbPoints: 4
        },
        {
            id: 2,
            name: 'DB administration',
            year: 'SECOND',
            semester: 'SUMMER',
            espbPoints: 5
        },
        {
            id: 3,
            name: 'Web development',
            year: 'THIRD',
            semester: 'WINTER',
            espbPoints: 6
        },
        {
            id: 4,
            name: 'Mobile app development',
            year: 'FOURTH',
            semester: 'WINTER',
            espbPoints: 4
        },
        {
            id: 4,
            name: 'Mobile app development',
            year: 'FOURTH',
            semester: 'WINTER',
            espbPoints: 4
        },
        {
            id: 4,
            name: 'Mobile app development',
            year: 'FOURTH',
            semester: 'WINTER',
            espbPoints: 4
        }
    ]
</script>

<h2>Courses</h2>

<div class="row row-cols-lg-auto">
    {#each DUMMY_COURSES as course}
        <CourseCard course={course} /> 
    {/each}
</div>
