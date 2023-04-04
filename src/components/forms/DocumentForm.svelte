<script>
  import { useQueryClient } from "@sveltestack/svelte-query";
  import httpService from "../../services/httpService";
  import FileInput from "../common/forms/FileInput.svelte";

  let file = null;
  let error = null;
  export let student = null;
  export let onComplete = () => {};

  const queryClient = useQueryClient();

  const onSave = async () => {
    if (!file) {
      error = "File not selected";
      return;
    }

    const data = new FormData();

    data.append("document", file);

    await httpService.request({
      method: "POST",
      url: `api/students/${student.id}/upload-document`,
      body: data,
    });

    await queryClient.refetchQueries(["student"], { active: true });

    onComplete();
  };
</script>

<div class="d-flex justify-content-center align-items-center flex-column">
  <FileInput
    name="document"
    label="Choose Document"
    value={file}
    handleChange={(f) => (file = f)}
    class="d-flex justify-content-center align-items-center flex-column"
  />

  <button class="btn btn-primary mt-2" on:click={onSave}>Save</button>
</div>
