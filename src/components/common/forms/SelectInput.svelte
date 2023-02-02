<script lang="ts">
  export let name;
  export let label;
  export let options;
  export let value;
  export let handleChange;
  export let error;
  export let multiple = false;
  let clazz;
  export { clazz as class };
</script>

<div class={clazz}>
  <label class="form-label" for={name}>{label}</label>
  {#if multiple}
    <select
      class="form-select"
      aria-label={label}
      value={value || ''}
      on:change={handleChange}
      {name}
      multiple
    >
      {#each options ? Object.entries(options) : [] as [optionValue, optionLabel]}
        <option value={optionValue}>{optionLabel}</option>
      {/each}
    </select>
  {:else}
    <select
      class="form-select"
      aria-label={label}
      value={value || ''}
      on:change={handleChange}
      {name}
    >
      {#each options ? Object.entries(options) : [] as [optionValue, optionLabel]}
        <option value={optionValue}>{optionLabel}</option>
      {/each}
    </select>
  {/if}

  {#if error}
    <small class="text-danger">{error}</small>
  {/if}
</div>
