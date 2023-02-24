<script>
  import SelectInput from "./SelectInput.svelte";

  export let name;
  export let label;
  export let handleChange;
  export let value;
  export let error;

  let clazz = "";
  export { clazz as class };
</script>

<SelectInput
  {name}
  {label}
  {handleChange}
  {value}
  {error}
  class={clazz}
  options={{
    SELF_FINANCING: "Self Financing",
    BUDGET: "Budget",
  }}
/>
