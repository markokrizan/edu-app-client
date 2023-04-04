<script lang="ts">
  import { useQueryClient } from "@sveltestack/svelte-query";
  import httpService from "../../services/httpService";
  import Modal from "../common/Modal.svelte";
  import DocumentForm from "../forms/DocumentForm.svelte";

  export let student;

  const queryClient = useQueryClient();

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
          <span class="d-inline-block text-truncate" style="max-width: 150px;"
            >{document.name}</span
          >
          <div>
            <span
              role="button"
              on:click={() =>
                httpService.download(
                  `api/students/${student.id}/documents/${document.id}/download`,
                  document.name
                )}
            >
              <i class="bi bi-cloud-download-fill" />
            </span>
            <span
              role="button"
              on:click={async () => {
                await httpService.request({
                  method: "DELETE",
                  url: `api/students/${student.id}/delete-document/${document.name}`,
                });

                await queryClient.refetchQueries(["student"], { active: true });
              }}
            >
              <i class="bi bi-trash3-fill" />
            </span>
          </div>
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
  <DocumentForm
    {student}
    onComplete={() => (showUploadDocumentModal = false)}
  />
</Modal>
