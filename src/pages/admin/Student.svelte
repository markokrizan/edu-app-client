<script>
  import Loadable from "../../components/common/Loadable.svelte";
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import httpService from "../../services/httpService";
  import Student from "../../components/student/Student.svelte";
  import StudentForm from "../../components/forms/StudentForm.svelte";
  import Modal from "../../components/common/Modal.svelte";
  import { navigate } from "svelte-navigator";
  import { useQueryClient } from "@sveltestack/svelte-query";

  export let id;

  let showUpsertStudentModal = false;

  const queryClient = useQueryClient();

  const deleteStudent = async () => {
    await httpService
        .withAuth()
        .request({ method: "DELETE", url: `api/students/${id}` });

    await queryClient.refetchQueries(["students"]);

    navigate('/students');
  }
</script>

<PrivateLayout>
  <Loadable
    fetchFn={() =>
      httpService
        .withAuth()
        .request({ method: "GET", url: `api/students/${id}` })}
    queryKey="student"
  >
    <svelte:fragment slot="data" let:data>
      <Student student={data}>
        <svelte:fragment slot="action">
          <div>
            <button
              class="btn btn-primary"
              on:click={() => (showUpsertStudentModal = true)}>Edit</button
            >
            <button
              class="btn btn-danger"
              on:click={() => deleteStudent()}>Delete</button
            >
          </div>
        </svelte:fragment>
      </Student>

      <Modal open={showUpsertStudentModal} onClose={() => showUpsertStudentModal = false} title="Upsert student">
        <StudentForm
          student={data}
          onComplete={() => (showUpsertStudentModal = false)}
        />
      </Modal>
    </svelte:fragment>
  </Loadable>
</PrivateLayout>
