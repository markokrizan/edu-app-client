<script>
  import { useQueryClient } from "@sveltestack/svelte-query";
  import Modal from "../../components/common/Modal.svelte";
  import Pager from "../../components/common/Pager.svelte";
  import ExamTable from "../../components/exam/ExamTable.svelte";
  import ExamForm from "../../components/forms/ExamForm.svelte";
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import httpService from "../../services/httpService";
  import { userStore } from "../../store";

  const user = userStore.getUser();

  const queryClient = useQueryClient();

  const fetchPassedExams = (page) => {
    return httpService
      .withAuth()
      .request({
        method: "GET",
        url: `api/teachers/${$user.id}/exams?page=${page}`,
      });
  };

  let showExamModal = false;

  const onComplete = async () => {
    showExamModal = false;
    queryClient.refetchQueries(["teacher-exams"]);
  };
</script>

<PrivateLayout>
  <div class="d-flex justify-content-between mb-2">
    <h4>Your courses' exams</h4>

    <button class="btn btn-primary" on:click={() => (showExamModal = true)}
      >Add</button
    >
  </div>

  <Pager
    fetchFn={fetchPassedExams}
    queryKey="teacher-exams"
    queryOptions={{ refetchOnMount: false }}
  >
    <svelte:fragment slot="pages" let:pages>
      <ExamTable examPages={pages} />
    </svelte:fragment>
  </Pager>

  <Modal title="Create a new exam" open={showExamModal} onClose={() => showExamModal = false}>
    <ExamForm {onComplete} />
  </Modal>
</PrivateLayout>
