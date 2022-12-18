<script lang="ts">
    import { Link } from "svelte-navigator";
    import HoverableInteraction from "../common/HoverableInteraction.svelte";

	export let student;
</script>

<style>
    .card-container {
        width: 18rem;
    }
</style>


<Link 
    to="/students/{student?.id}" 
    class="text-decoration-none text-dark" 
>
    <HoverableInteraction let:isHovered>
        <div class="card card-container col m-4 {isHovered ? 'shadow' : '' }">
            <img src="{student.profileImage || '/assets/user-profile-icon.jpg'}" class="card-img-top" alt="Teacher profile">
            <div class="card-body">
                <h5 class="card-title">{student.firstName} {student.lastName}</h5>
                <dl>
                    <dt>Email:</dt>
                    <dd>{student.email ?? ''}</dd>

                    <dt>Phone number:</dt>
                    <dd>{student.phoneNumber ?? ''}</dd>

                    <dt>School id number:</dt>
                    <dd>{student.schoolIdNumber ?? ''}</dd>
                </dl>
            </div>
        </div>
    </HoverableInteraction>
</Link>
