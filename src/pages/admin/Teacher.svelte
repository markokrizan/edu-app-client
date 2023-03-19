<script>
  import { useQueryClient } from "@sveltestack/svelte-query";
  import { navigate } from "svelte-navigator";
  import Loadable from "../../components/common/Loadable.svelte";
  import Modal from "../../components/common/Modal.svelte";
  import TeacherForm from "../../components/forms/TeacherForm.svelte";
  import Teacher from "../../components/teacher/Teacher.svelte";
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import httpService from "../../services/httpService";

  export let id;

  let showUpsertTeacherModal = false;

  const queryClient = useQueryClient();

  const deleteTeacher = async () => {
    await httpService
      .withAuth()
      .request({ method: "DELETE", url: `api/teachers/${id}` });

    await queryClient.refetchQueries(["teachers"]);

    navigate("/teachers");
  };
</script>

<PrivateLayout>
  <Loadable
    fetchFn={() =>
      httpService
        .withAuth()
        .request({ method: "GET", url: `api/teachers/${id}` })}
    queryKey="teacher"
  >
    <svelte:fragment slot="data" let:data>
      <Teacher teacher={data}>
        <svelte:fragment slot="action">
          <div>
            <button
              class="btn btn-primary"
              on:click={() => (showUpsertTeacherModal = true)}>Edit</button
            >
            <button class="btn btn-danger" on:click={() => deleteTeacher()}
              >Delete</button
            >
          </div>
        </svelte:fragment>
      </Teacher>

      <Modal
        open={showUpsertTeacherModal}
        onClose={() => (showUpsertTeacherModal = false)}
        title="Upsert student"
      >
        <TeacherForm
          teacher={data}
          onComplete={() => (showUpsertTeacherModal = false)}
        />
      </Modal>
    </svelte:fragment>
  </Loadable>
</PrivateLayout>
