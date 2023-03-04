<script>
  import { Link } from "svelte-navigator";
  import Pager from "../../components/common/Pager.svelte";
  import Table from "../../components/common/Table.svelte";
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import httpService from "../../services/httpService";
  import { userStore } from "../../store";

  const user = userStore.getUser();

  const fetchPassedExams = (page) => {
    return httpService
      .withAuth()
      .request({
        method: "GET",
        url: `api/students/${$user.id}/passed-exams?page=${page}`,
      });
  };

  const columnNames = [
    "Id",
    "Exam date",
    "Location",
    "Term",
    "Course",
    "Grade",
  ];

  const examToTableRow = (exam) => [
    exam.id,
    exam.examDate,
    exam.location,
    exam.term.name,
    exam.course,
    getExamGrade(exam.id)?.gradeType,
  ];

  const reducePagesToTableRows = (pages) => {
    return pages.reduce((acc, page) => {
      return [...acc, ...page.content.map((exam) => examToTableRow(exam))];
    }, []);
  };

  const getExamGrade = (examId) => {
    if ($user.grades?.length === 0) {
      return null;
    }

    return $user.grades.find((grade) => grade.exam.id === examId);
  };
</script>

<PrivateLayout>
  <h4>Passed exams</h4>

  <Pager
    fetchFn={fetchPassedExams}
    queryKey="passed-exams"
    queryOptions={{ refetchOnMount: false }}
  >
    <svelte:fragment slot="pages" let:pages>
      <Table {columnNames} tableData={reducePagesToTableRows(pages)}>
        <svelte:fragment slot="row" let:cellValue let:index>
          {#if index === 4}
            <td>
              <Link
                to="/courses/{cellValue.id}"
                class="text-decoration-none text-dark"
              >
                <span class="fw-bold">{cellValue.name}</span>
              </Link>
            </td>
          {:else}
            <td>{cellValue}</td>
          {/if}
        </svelte:fragment>
      </Table>
    </svelte:fragment>
  </Pager>
</PrivateLayout>
