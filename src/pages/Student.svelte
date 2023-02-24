<script>
  import Loadable from "../components/common/Loadable.svelte";
  import PrivateLayout from "../layouts/PrivateLayout.svelte";
  import httpService from "../services/httpService";
  import Student from "../components/student/Student.svelte";
  import StudentForm from "../components/forms/StudentForm.svelte";
  import Modal from "../components/common/Modal.svelte";

  export let id;

  let showUpsertStudentModal = false;
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
          <button
            class="btn btn-primary"
            on:click={() => (showUpsertStudentModal = true)}>Edit</button
          >
        </svelte:fragment>
      </Student>

      <Modal open={showUpsertStudentModal} title="Upsert student">
        <StudentForm
          student={data}
          onComplete={() => (showUpsertStudentModal = false)}
        />
      </Modal>
    </svelte:fragment>
  </Loadable>
</PrivateLayout>
