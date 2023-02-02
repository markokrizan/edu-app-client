<script lang="ts">
  import { useQuery } from "@sveltestack/svelte-query";
  import httpService from "../../../services/httpService";

  import SelectInput from "./SelectInput.svelte";

  export let handleChange;
  export let name;
  export let label;
  export let value;
  export let error;
  let clazz;
  export { clazz as class };

  const queryResult = useQuery("all-study-programs", () =>
    httpService.withAuth().request({ method: "GET", url: `api/study-programs` })
  );
</script>

{#if $queryResult.isLoading}
  <span>Loading...</span>
{:else if $queryResult.error}
  <span>Study programs could not be fetched</span>
{:else}
  <SelectInput
    {name}
    {label}
    {handleChange}
    {value}
    {error}
    class={clazz}
    options={$queryResult.data.content.reduce((acc, studyProgram) => {
        acc[studyProgram.id] = studyProgram.name;
    
        return acc;
      }, {})}
  />
{/if}
