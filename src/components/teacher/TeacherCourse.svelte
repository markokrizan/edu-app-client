<script>
  export let course;
</script>

<h4>{course.name}</h4>

<dl class="row">
  <dt class="col-sm-3">Year:</dt>
  <dd class="col-sm-9">{course.year}</dd>

  <dt class="col-sm-3">Espb points:</dt>
  <dd class="col-sm-9">{course.espbPoints}</dd>

  <dt class="mb-2">Engagements:</dt>
  <dd>
    {#if course.engagements?.length}
      <ul class="list-group w-50">
        {#each course.engagements as engagement}
          <li class="list-group-item">
            {engagement.teacher.firstName}
            {engagement.teacher.lastName} - {engagement.engagementType}
          </li>
        {/each}
      </ul>
    {:else}
      No Engagements
    {/if}
  </dd>

  <dt class="mb-2">Available in study programs:</dt>
  <dd>
    {#if course.studyPrograms?.length}
      <ul class="list-group w-50">
        {#each course.studyPrograms || [] as studyProgram}
          <li class="list-group-item">{studyProgram.name}</li>
        {/each}
      </ul>
    {:else}
      Course not yet in any study program
    {/if}
  </dd>
</dl>
