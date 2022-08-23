<script lang="ts">
    import { Link } from "svelte-navigator";
    import HoverableInteraction from "../common/HoverableInteraction.svelte";

    export let teacher;
</script>
 
<div class="row">
    <h2>{teacher.firstName} {teacher.lastName}</h2>
</div>

<div class="row">
    <div class="col-md-4">   
        <img src="{teacher.profileImage}" class="img-fluid mb-3" alt="Teacher profile">

        <dl class="row">
            <dt class="col-sm-4">Email:</dt>
            <dd class="col-sm-8">{teacher.email}</dd>

            <dt class="col-sm-4">Phone number:</dt>
            <dd class="col-sm-8">{teacher.phoneNumber}</dd>

            <dt class="col-sm-4">Academic title:</dt>
            <dd class="col-sm-8">{teacher.academicTitle}</dd>
        </dl>
    </div>
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
                        <li class="list-group-item">{engagement.course.name} - {engagement.engagementType}</li>
                    </Link>
                </HoverableInteraction>
            {/each}
        </ul>
    </dd>
    </div>
</div>
