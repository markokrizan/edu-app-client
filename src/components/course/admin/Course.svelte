<script>
  import { Link } from "svelte-navigator";
  import HoverableInteraction from "../../common/HoverableInteraction.svelte";
  import Modal from "../../common/Modal.svelte";
  import CourseForm from "../../forms/CourseForm.svelte";

  export let course;

  let showCourseForm = false;
</script>

<div class="d-flex justify-content-between">
  <h4>{course.name}</h4>
  <button class="btn btn-primary" on:click={() => (showCourseForm = true)}>
    Edit
  </button>
</div>

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
          <HoverableInteraction>
            <Link
              to="/teachers/{engagement.teacher.id}"
              class="text-decoration-none text-dark"
            >
              <li class="list-group-item">
                {engagement.teacher.firstName}
                {engagement.teacher.lastName} - {engagement.engagementType}
              </li>
            </Link>
          </HoverableInteraction>
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

<Modal
  open={showCourseForm}
  title="Update Course"
  class="d-flex justify-content-center"
  onClose={() => (showCourseForm = false)}
>
  <CourseForm
    {course}
    onComplete={() => (showCourseForm = false)}
    class="w-100"
  />
</Modal>
