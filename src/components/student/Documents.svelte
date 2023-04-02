<script lang="ts">
  import httpService from "../../services/httpService";

  export let student;
</script>

{#if student.documents?.length}
  <dt class="mb-2">Documents:</dt>
  <dd>
    <ul class="list-group w-50">
      {#each student.documents as document}
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>{document.name}</span>
          <button
            class="btn btn-primary w-50 ms-2"
            on:click={() =>
              httpService.download(
                `api/students/${student.id}/documents/${document.id}/download`,
                document.name
              )}
          >
            Download
          </button>
        </li>
      {/each}
    </ul>
  </dd>
{:else}
  <p>No documents yet</p>
{/if}
