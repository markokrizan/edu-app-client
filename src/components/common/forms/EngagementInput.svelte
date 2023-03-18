<script>
  import SelectInput from "../../common/forms/SelectInput.svelte";
  import TeacherInput from "../../common/forms/TeacherInput.svelte";

  export let form;
  export let errors;
  export let handleChange;
  export let name;
  let clazz;
  export { clazz as class };

  const add = () => {
    form[name] = form[name].concat({
      engagementType: "",
      teacher: "",
    });
    errors[name] = errors[name].concat({
      engagementType: "",
      teacher: "",
    });
  };

  const remove = (i) => () => {
    form[name] = form[name].filter((u, j) => j !== i);
    errors[name] = errors[name].filter((u, j) => j !== i);
  };

  if (form[name].length === 0) {
    add();
  }
</script>

<div class={`border p-1 ${clazz}`}>
  Engagements:
  {#each form?.[name] as engagement, j}
    <SelectInput
      name={`engagements[${j}].engagementType`}
      label="Engagement Type:"
      {handleChange}
      value={form?.[name][j]?.engagementType}
      error={errors?.[name][j]?.engagementType}
      class="mt-2"
      options={{
        ASSISTANT: "Assistant",
        PROFESSOR: "Professor",
      }}
    />
    <TeacherInput
      name={`engagements[${j}].teacher`}
      label="Teacher"
      {handleChange}
      value={form?.[name][j]?.teacher}
      error={errors?.[name][j]?.teacher}
      class="mt-2"
    />
    {#if j === form?.[name].length - 1}
      <button class="btn btn-primary mt-1" type="button" on:click={add}
        >+</button
      >
    {/if}
    {#if form?.[name].length !== 1}
      <button class="btn btn-primary mt-1" type="button" on:click={remove(j)}
        >-</button
      >
    {/if}
  {/each}
</div>
