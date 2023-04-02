<script lang="ts">
  import httpService from "../../services/httpService";
  import Documents from "./Documents.svelte";
  import Grades from "./Grades.svelte";

  export let student;
</script>

<div class="row">
  <div class="d-flex justify-content-between">
    <h4>{student.firstName} {student.lastName}</h4>
    <slot name="action" />
  </div>
</div>

<div class="row">
  <div class="col-md-4">
    <img
      src={student.profileImage || "/assets/user-profile-icon.jpg"}
      class="img-fluid mb-3"
      alt="Student profile"
    />

    <dl class="row">
      <dt class="col-sm-4">Study Program:</dt>
      <dd class="col-sm-8">{student?.studyProgram?.name}</dd>

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
    <div class="row">
      <button
        class="btn btn-primary w-50 ms-2"
        on:click={() =>
          httpService.download(
            `api/students/${student.id}/report`,
            "student-report.pdf"
          )}
      >
        Download Report
      </button>
    </div>
  </div>
  <div class="col-md-8">
    <div class="row">
      <Grades grades={student.grades} />
    </div>
    <div class="row">
      <Documents student={student} />
    </div>
  </div>
</div>
