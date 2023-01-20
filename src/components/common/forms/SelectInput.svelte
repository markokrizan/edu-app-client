<script lang="ts">
  export let name;
  export let label;
  export let options;
  export let value;
  export let handleChange;
  export let error;
  let clazz;
  export { clazz as class };
</script>

<div class={clazz}>
  <label class="form-label" for={name}>{label}</label>
  <select
    class="form-select"
    aria-label={label}
    bind:value={value}
    on:change={handleChange}
    {name}
  >
    {#each Object.entries(options) as [optionValue, optionLabel]}
      <option value={optionValue}>{optionLabel}</option>
    {/each}
  </select>
  {#if error}
    <small class="text-danger">{error}</small>
  {/if}
</div>
