<script lang="ts">
  import Modal from "../../components/common/Modal.svelte";
  import Pager from "../../components/common/Pager.svelte";
  import StudentForm from "../../components/forms/StudentForm.svelte";
  import StudentCard from "../../components/student/StudentCard.svelte";
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import httpService from "../../services/httpService";

  const fetchStudents = (page) => {
    return httpService
      .withAuth()
      .request({ method: "GET", url: `api/students?page=${page}` });
  };

  let showUpsertStudentModal = false;
</script>

<PrivateLayout>
  <div class="d-flex justify-content-between">
    <h4>Students</h4>
    <button
      class="btn btn-primary"
      on:click={() => (showUpsertStudentModal = true)}>Add</button
    >
  </div>

  <Pager
    fetchFn={fetchStudents}
    queryKey="students"
    queryOptions={{ refetchOnMount: false }}
  >
    <svelte:fragment slot="pages" let:pages>
      <div class="row row-cols-lg-auto">
        {#each pages as page}
          {#each page.content as item}
            <StudentCard student={item} />
          {/each}
        {/each}
      </div>
    </svelte:fragment>
  </Pager>

  <Modal open={showUpsertStudentModal} onClose={() => showUpsertStudentModal = false} title="Upsert student">
    <StudentForm onComplete={() => (showUpsertStudentModal = false)} />
  </Modal>
</PrivateLayout>
