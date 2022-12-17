<script lang="ts">
	export let studyProgram;
</script>

<style>
    .card-container {
        width: 18rem;
    }
</style>

<div class="card card-container col m-4">
    <div class="card-body">
        <h5 class="card-title">{studyProgram?.name}</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Study Field: {studyProgram?.studyField}</li>
        <li class="list-group-item">Prefix: {studyProgram?.prefix}</li>
        <li class="list-group-item">ESPB Points: {studyProgram?.espbPoints}</li>
        <li class="list-group-item">Study Program Type: {studyProgram?.studyProgramType}</li>
    </ul>
</div>
