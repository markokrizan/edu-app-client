<script>
  import Form from "../../components/common/forms/Form.svelte";
  import SelectInput from "../../components/common/forms/SelectInput.svelte";
  import Modal from "../../components/common/Modal.svelte";
  import Pager from "../../components/common/Pager.svelte";
  import Table from "../../components/common/Table.svelte";
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import dateService from "../../services/dateService";
  import httpService from "../../services/httpService";
  import { userStore } from "../../store";

  const user = userStore.getUser();

  const fetchExamRegistrations = (page) => {
    return httpService.withAuth().request({
      method: "GET",
      url: `api/teachers/${$user.id}/exam-registrations?page=${page}`,
    });
  };

  const columnNames = [
    "Id",
    "Course",
    "Student",
    "Date Registered",
    "Set Grade",
  ];

  let currentRegistration = null;

  const examRegistrationToTableRow = (examRegistration) => [
    examRegistration.id,
    examRegistration.exam.course.name,
    `${examRegistration.student.firstName} ${examRegistration.student.lastName}`,
    dateService.formatDate(examRegistration.createdAt, "ff"),
    examRegistration,
  ];

  const reducePagesToTableRows = (pages) => {
    return pages.reduce((acc, page) => {
      return [
        ...acc,
        ...page.content.map((examRegistration) =>
          examRegistrationToTableRow(examRegistration)
        ),
      ];
    }, []);
  };

  const setGrade = async ({ grade }) => {
    const gradeData = {
      student: {
        id: currentRegistration.student.id,
      },
      exam: {
        id: currentRegistration.exam.id,
      },
      examRegistration: {
        id: currentRegistration.id,
      },
      gradeType: grade,
    };

    await httpService.withAuth().request({
      method: "POST",
      url: "api/grades",
      body: JSON.stringify(gradeData),
    });

    currentRegistration = null;

    window.location.reload(); // A dirty hack in order not to deal with the infinite query cache reload issue now
  };
</script>

<PrivateLayout>
  <h4>Your courses' exam registrations</h4>

  <Pager
    fetchFn={fetchExamRegistrations}
    queryKey="exam-registrations"
    queryOptions={{ refetchOnMount: false }}
  >
    <svelte:fragment slot="pages" let:pages>
      <Table {columnNames} tableData={reducePagesToTableRows(pages)}>
        <svelte:fragment slot="row" let:cellValue let:index>
          {#if index === 4}
            <td>
              <button
                class="btn btn-primary"
                on:click={() => {
                  currentRegistration = cellValue;
                }}
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

  <Modal
    open={!!currentRegistration}
    onClose={() => (currentRegistration = false)}
    title="Set Grade"
  >
    <Form
      let:handleChange
      let:errors
      let:submitError
      let:form
      onSubmit={setGrade}
      class="d-flex justify-content-center align-items-center flex-column"
      initialValues={{ grade: "FIVE" }}
    >
      <p class="text-danger">{submitError}</p>
      <SelectInput
        label="Select grade"
        name="grade"
        options={{
          FIVE: 5,
          SIX: 6,
          SEVEN: 7,
          EIGHT: 8,
          NINE: 9,
          TEN: 10,
        }}
        {handleChange}
        error={errors?.grade}
        value={form?.grade}
      />
      <button class="btn btn-primary mt-2" type="submit">Save</button>
    </Form>
  </Modal>
</PrivateLayout>
