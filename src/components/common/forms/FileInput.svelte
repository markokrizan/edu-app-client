<script lang="ts">
  export let name;
  export let label;
  export let value;
  export let handleChange;
  export let error;
  let clazz;
  export { clazz as class };
</script>

<div
  class={`d-flex justify-content-center align-items-center flex-column ${clazz}`}
>
  <input
    type="file"
    id="document-file-input"
    hidden
    {name}
    on:change={(e) => handleChange(e.target?.files?.[0] ?? null)}
  />
  <label for="document-file-input" class="btn btn-primary">{label}</label>
  {#if value}
    <span>{value.name}</span>
  {/if}
  {#if error}
    <small class="text-danger">{error}</small>
  {/if}
</div>
