<script lang="ts">
  import { Link } from "svelte-navigator";
  import HoverableInteraction from "../common/HoverableInteraction.svelte";

  export let teacher;
</script>

<div class="row">
  <div class="d-flex justify-content-between">
    <h4>{teacher.firstName} {teacher.lastName}</h4>
    <slot name="action" />
  </div>
</div>

<div class="row">
  <div class="col-md-4">
    <img
      src={teacher.profileImage || "/assets/user-profile-icon.jpg"}
      class="img-fluid mb-3"
      alt="Teacher profile"
    />

    <dl class="row">
      <dt class="col-sm-4">Email:</dt>
      <dd class="col-sm-8">{teacher.email}</dd>

      <dt class="col-sm-4">Phone number:</dt>
      <dd class="col-sm-8">{teacher.phoneNumber}</dd>

      <dt class="col-sm-4">Academic title:</dt>
      <dd class="col-sm-8">{teacher.academicTitle}</dd>
    </dl>
  </div>
  {#if teacher.engagements?.length}
    <div class="col-md-8">
      <dt class="mb-2">Engagements:</dt>
      <dd>
        <ul class="list-group w-50">
          {#each teacher.engagements as engagement}
            <HoverableInteraction>
              <Link
                to="/courses/{engagement.course.id}"
                class="text-decoration-none text-dark"
              >
                <li class="list-group-item">
                  {engagement.course.name} - {engagement.engagementType}
                </li>
              </Link>
            </HoverableInteraction>
          {/each}
        </ul>
      </dd>
    </div>
  {/if}
</div>
