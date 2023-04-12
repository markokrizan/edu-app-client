<script>
  import { Link } from "svelte-navigator";
  import Pager from "../../components/common/Pager.svelte";
  import Table from "../../components/common/Table.svelte";
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import httpService from "../../services/httpService";
  import { userStore } from "../../store";
  import dateService from "../../services/dateService";

  const user = userStore.getUser();

  const registeredExamsColumnNames = [
    "Id",
    "Exam date",
    "Location",
    "Term",
    "Course",
  ];
  const registrableExamColumnNames = [
    "Id",
    "Exam date",
    "Location",
    "Term",
    "Course",
    "Register",
  ];

  const fetchRegisteredExams = (page) => {
    return httpService
      .withAuth()
      .request({
        method: "GET",
        url: `api/students/${$user.id}/exam-registrations?page=${page}`,
      });
  };

  const fetchRegistrableExams = (page) => {
    return httpService
      .withAuth()
      .request({
        method: "GET",
        url: `api/students/${$user.id}/registrable-exams?page=${page}`,
      });
  };

  const examRegistrationsToRegisteredTableRow = ({ exam }) => [
    exam.id,
    dateService.formatDate(exam.examDate, "ff"),
    exam.location,
    exam?.term?.name,
    exam?.course,
  ];
  const examsToRegistableTableRow = (exam) => [
    exam.id,
    dateService.formatDate(exam.examDate, "ff"),
    exam.location,
    exam.term.name,
    exam.course,
    { examId: exam.id },
  ];

  // TODO: Reuse through component
  const reducePagesToTableRows = (pages, rowMaper) => {
    return pages.reduce((acc, page) => {
      return [...acc, ...page.content.map((item) => rowMaper(item))];
    }, []);
  };

  const handleRegister = async (examId) => {
    const registration = {
      exam: {
        id: examId,
      },
      student: {
        id: $user.id,
      },
      examRegistrationStatus: "REGISTERED",
    };

    await httpService
      .withAuth()
      .request({
        method: "POST",
        url: "api/exam-registrations",
        body: JSON.stringify(registration),
      });

    window.location.reload(); // A dirty hack in order not to deal with the infinite query cache reload issue now
  };
</script>

<PrivateLayout>
  <h4>Registered exams</h4>

  <Pager
    fetchFn={fetchRegisteredExams}
    queryKey="registered-exams"
    queryOptions={{ refetchOnMount: false }}
  >
    <svelte:fragment slot="pages" let:pages>
      <Table
        columnNames={registeredExamsColumnNames}
        tableData={reducePagesToTableRows(
          pages,
          examRegistrationsToRegisteredTableRow
        )}
      >
        <svelte:fragment slot="row" let:cellValue let:index>
          {#if index === 4}
            <td>
              <Link
                to="/courses/{cellValue?.id}"
                class="text-decoration-none text-dark"
              >
                <span class="fw-bold">{cellValue?.name}</span>
              </Link>
            </td>
          {:else}
            <td>{cellValue}</td>
          {/if}
        </svelte:fragment>
      </Table>
    </svelte:fragment>
  </Pager>

  <h4>Registrable exams</h4>

  <Pager
    fetchFn={fetchRegistrableExams}
    queryKey="registrable-exams"
    queryOptions={{ refetchOnMount: false }}
  >
    <svelte:fragment slot="pages" let:pages>
      <Table
        columnNames={registrableExamColumnNames}
        tableData={reducePagesToTableRows(pages, examsToRegistableTableRow)}
      >
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
          {:else if index === 5}
            <td>
              <button
                class="btn btn-primary"
                on:click={() => handleRegister(cellValue.examId)}
              >
                <i class="bi bi-pen" />
              </button>
            </td>
          {:else}
            <td>{cellValue}</td>
          {/if}
        </svelte:fragment>
      </Table>
    </svelte:fragment>
  </Pager>
</PrivateLayout>
