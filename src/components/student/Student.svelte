<script lang="ts">
    import Grades from "./Grades.svelte";

    export let student;
</script>
 
<div class="row">
    <h2>{student.firstName} {student.lastName}</h2>
</div>

<div class="row">
    <div class="col-md-4">   
        <img src="{student.profileImage || '/assets/user-profile-icon.jpg'}" class="img-fluid mb-3" alt="Student profile">

        <dl class="row">
            <dt class="col-sm-4">Email:</dt>
            <dd class="col-sm-8">{student.email}</dd>

            <dt class="col-sm-4">Phone number:</dt>
            <dd class="col-sm-8">{student.phoneNumber}</dd>

            <dt class="col-sm-4">Financial status:</dt>
            <dd class="col-sm-8">{student.financialStatus}</dd>

            <dt class="col-sm-4">Current study year:</dt>
            <dd class="col-sm-8">{student.currentStudyYear}</dd>

            <dt class="col-sm-4">School id number:</dt>
            <dd class="col-sm-8">{student.schoolIdNumber}</dd>
        </dl>
    </div>
    <div class="col-md-8">
        <Grades grades={student.grades} />
    </div>
</div>
