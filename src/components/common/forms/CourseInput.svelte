<script lang="ts">
  import { useQuery } from "@sveltestack/svelte-query";
  import { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER } from "../../../constants";
  import httpService from "../../../services/httpService";
  import { userStore } from "../../../store";

  import SelectInput from "./SelectInput.svelte";

  export let handleChange;
  export let name;
  export let label;
  export let value;
  export let error;
  let clazz;
  export { clazz as class };

  const user = userStore.getUser();
  $: userRole = $user?.roles?.map((role) => role?.name)[0];

  const QUERY_URLS = {
    [ROLE_ADMIN]: `api/courses`,
    [ROLE_TEACHER]: `api/teachers/${$user.id}/courses`,
    [ROLE_STUDENT]: `api/students/${$user.id}/courses`,
  };

  const queryResult = useQuery("all-courses", () => {
    const url = QUERY_URLS[userRole];

    return httpService.withAuth().request({ method: "GET", url });
  });
</script>

{#if $queryResult.isLoading}
  <span>Loading...</span>
{:else if $queryResult.error}
  <span>Courses could not be fetched</span>
{:else}
  <SelectInput
    {name}
    {label}
    {handleChange}
    {value}
    {error}
    class={clazz}
    options={$queryResult.data.content.reduce((acc, course) => {
      acc[course.id] = course.name;

      return acc;
    }, {})}
  />
{/if}
