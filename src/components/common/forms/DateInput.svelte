<script lang="ts">
  export let name;
  export let label;
  export let value;
  export let handleChange;
  export let error;
  let clazz;
  export { clazz as class };
</script>

<div class={clazz}>
  <label class="form-label" for={name}>{label}</label>
  <input
    id={name}
    {name}
    type="date"
    on:change={handleChange}
    on:blur={handleChange}
    bind:value
    class="form-control"
  />
  {#if error}
    <small class="text-danger">{error}</small>
  {/if}
</div>
