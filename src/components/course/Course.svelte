<script>
    import { Link } from "svelte-navigator";
    import HoverableInteraction from "../../components/common/HoverableInteraction.svelte";

    export let course;
</script>

<h4>{course.name}</h4>

<dl class="row">
    <dt class="col-sm-3">Year:</dt>
    <dd class="col-sm-9">{course.year}</dd>

    <dt class="col-sm-3">Espb points:</dt>
    <dd class="col-sm-9">{course.espbPoints}</dd>

    {#if course.engagements?.length}
        <dt class="mb-2">Engagements:</dt>
        <dd>
            <ul class="list-group w-50">
                {#each course.engagements as engagement}
                    <HoverableInteraction>
                        <Link 
                            to="/teachers/{engagement.teacher.id}" 
                            class="text-decoration-none text-dark" 
                        >
                            <li class="list-group-item">{engagement.teacher.firstName} {engagement.teacher.lastName} - {engagement.engagementType}</li>
                        </Link>
                    </HoverableInteraction>
                {/each}
            </ul>
        </dd>
    {/if}

    {#if course.engagements?.length}
        <dt class="mb-2">Available in study programs:</dt>
        <dd>
            <ul class="list-group w-50">
                {#each (course.studyPrograms || []) as studyProgram}
                    <li class="list-group-item">{studyProgram.name}</li>
                {/each}
            </ul>
        </dd>
    {/if}
</dl>
