<script lang="ts">
    export let grades;
</script>

{#if grades?.length}
    <dt class="mb-2">Grades:</dt>
    <dd>
        <ul class="list-group w-50">
            {#each grades as grade}
                <li class="list-group-item">{grade.exam.course.name} - {grade.gradeType}</li>
            {/each}
        </ul>
    </dd>
{:else}
	<p>No grades yet</p>
{/if}
