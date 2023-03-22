<script>
  import Modal from "../../components/common/Modal.svelte";
  import Pager from "../../components/common/Pager.svelte";
  import TermForm from "../../components/forms/TermForm.svelte";
  import TermCard from "../../components/term/TermCard.svelte";
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import httpService from "../../services/httpService";

  const fetchTerms = (page) => {
    return httpService
      .withAuth()
      .request({ method: "GET", url: `api/terms?page=${page}` });
  };

  const deleteTerm = async () => {
    await httpService
      .withAuth()
      .request({ method: "DELETE", url: `api/terms/${currentTerm.id}` });

    showUpsertTermsModal = false;
    currentTerm = null;

    window.location.reload(); // A dirty hack in order not to deal with the infinite query cache reload issue now
  };

  let showUpsertTermsModal = false;
  let currentTerm = null;
</script>

<PrivateLayout>
  <div class="d-flex justify-content-between">
    <h4>Terms</h4>
    <button
      class="btn btn-primary"
      on:click={() => {
        currentTerm = null;
        showUpsertTermsModal = true;
      }}>Add</button
    >
  </div>

  <Pager
    fetchFn={fetchTerms}
    queryKey="terms"
    queryOptions={{ refetchOnMount: false }}
  >
    <svelte:fragment slot="pages" let:pages>
      <div class="row row-cols-lg-auto">
        {#each pages as page}
          {#each page.content as item}
            <TermCard
              term={item}
              onClick={() => {
                currentTerm = item;
                showUpsertTermsModal = true;
              }}
            />
          {/each}
        {/each}
      </div>
    </svelte:fragment>
  </Pager>

  <Modal
    open={showUpsertTermsModal}
    onClose={() => (showUpsertTermsModal = false)}
    title="Upsert term"
  >
    <TermForm
      term={currentTerm}
      onComplete={() => (showUpsertTermsModal = false)}
    />
    {#if currentTerm}
      <div class="d-flex justify-content-end">
        <button class="btn btn-danger" on:click={deleteTerm}>Delete</button>
      </div>
    {/if}
  </Modal>
</PrivateLayout>
