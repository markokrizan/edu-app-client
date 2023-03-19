<script lang="ts">
  import Modal from "../../components/common/Modal.svelte";
  import Pager from "../../components/common/Pager.svelte";
  import TeacherForm from "../../components/forms/TeacherForm.svelte";
  import TeacherCard from "../../components/teacher/TeacherCard.svelte";
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import httpService from "../../services/httpService";

  const fetchTeachers = (page) => {
    return httpService
      .withAuth()
      .request({ method: "GET", url: `api/teachers?page=${page}` });
  };

  let showUpsertTeacherModal = false;
</script>

<PrivateLayout>
  <div class="d-flex justify-content-between">
    <h4>Teachers</h4>
    <button
      class="btn btn-primary"
      on:click={() => (showUpsertTeacherModal = true)}>Add</button
    >
  </div>

  <Pager
    fetchFn={fetchTeachers}
    queryKey="teachers"
    queryOptions={{ refetchOnMount: false }}
  >
    <svelte:fragment slot="pages" let:pages>
      <div class="row row-cols-lg-auto">
        {#each pages as page}
          {#each page.content as item}
            <TeacherCard teacher={item} />
          {/each}
        {/each}
      </div>
    </svelte:fragment>
  </Pager>

  <Modal open={showUpsertTeacherModal} onClose={() => showUpsertTeacherModal = false} title="Upsert teacher">
    <TeacherForm onComplete={() => (showUpsertTeacherModal = false)} />
  </Modal>
</PrivateLayout>
