<script>
    import Pager from "../components/common/Pager.svelte";
    import Table from "../components/common/Table.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import httpService from "../services/httpService";

    const fetchExamRegistrations = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/exam-registrations?page=${page}`});
    }

    const columnNames = ['Id', 'Course', 'Student', 'Date Registered'];

    const examRegistrationToTableRow = (examRegistration) => [
        examRegistration.id,
        examRegistration.exam.course.name,
        `${examRegistration.student.firstName} ${examRegistration.student.lastName}`,
        examRegistration.createdAt
    ];

    const reducePagesToTableRows = (pages) => {
        return pages.reduce(
            (acc, page) => {
                return [...acc, ...page.content.map(examRegistration => examRegistrationToTableRow(examRegistration))]
            },
            []
        )
    } 
</script>

<PrivateLayout>
    <h4>Exam Registrations</h4>

    <Pager
        fetchFn={fetchExamRegistrations} 
        queryKey="exam-registrations" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <Table columnNames={columnNames} tableData={reducePagesToTableRows(pages)} />
        </svelte:fragment>
    </Pager>
</PrivateLayout>
