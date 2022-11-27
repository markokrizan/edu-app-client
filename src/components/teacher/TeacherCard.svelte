<script lang="ts">
    import { Link } from "svelte-navigator";
    import HoverableInteraction from "../common/HoverableInteraction.svelte";

	export let teacher;
</script>

<style>
    .card-container {
        width: 18rem;
    }
</style>


<Link 
    to="/teachers/{teacher?.id}" 
    class="text-decoration-none text-dark" 
>
    <HoverableInteraction let:isHovered>
        <div class="card card-container col m-4 {isHovered ? 'shadow' : '' }">
            <img src="{teacher.profileImage || '/assets/user-profile-icon.jpg'}" class="card-img-top" alt="Teacher profile">
            <div class="card-body">
                <h5 class="card-title">{teacher.firstName} {teacher.lastName} {teacher.academicTitle}</h5>
                <dl>
                    <dt>Email:</dt>
                    <dd>{teacher.email ?? ''}</dd>

                    <dt>Phone number:</dt>
                    <dd>{teacher.phoneNumber ?? ''}</dd>
                </dl>
            </div>
        </div>
    </HoverableInteraction>
</Link>
