<script>
  export let open = false;
  export let showBackdrop = true;
  export let onClose = () => {};
  export let title;
  let clazz = '';
  export { clazz as class };
</script>

{#if open}
  <div
    class="modal"
    id="sampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="sampleModalLabel"
    aria-hidden={false}
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sampleModalLabel">{title}</h5>
          <button
            type="button"
            class="btn"
            data-dismiss="modal"
            aria-label="Close"
            on:click={onClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class={`modal-body ${clazz}`}>
          <slot />
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            on:click={onClose}>Close</button
          >
        </div>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" />
  {/if}
{/if}

<style>
  .modal {
    display: block;
  }
</style>
