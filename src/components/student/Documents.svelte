<script lang="ts">
  import httpService from "../../services/httpService";
  import Modal from "../common/Modal.svelte";
  import DocumentForm from "../forms/DocumentForm.svelte";

  export let student;

  let showUploadDocumentModal = false;
</script>

{#if student.documents?.length}
  <dt class="mb-2">
    <span>Documents:</span>
    <span
      role="button"
      class="ms-2"
      on:click={() => (showUploadDocumentModal = true)}
      ><i class="bi bi-cloud-upload-fill" /></span
    >
  </dt>
  <dd>
    <ul class="list-group w-50">
      {#each student.documents as document}
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
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

<Modal
  open={showUploadDocumentModal}
  title="Upload Document"
  class="d-flex justify-content-center"
  onClose={() => (showUploadDocumentModal = false)}
>
  <DocumentForm {student} onComplete={() => (showUploadDocumentModal = false)}/>
</Modal>
