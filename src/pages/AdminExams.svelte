<script>
    import { Link } from "svelte-navigator";
    import Pager from "../components/common/Pager.svelte";
    import Table from "../components/common/Table.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import httpService from "../services/httpService";

    const fetchExams = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/exams?page=${page}`});
    }

    const columnNames = ['Id', 'Exam date', 'Location', 'Term', 'Course']

    const examToTableRow = (exam) => [exam.id, exam.examDate, exam.location, exam.term.name, exam.course];

    const reducePagesToTableRows = (pages) => {
        return pages.reduce(
            (acc, page) => {
                return [...acc, ...page.content.map(exam => examToTableRow(exam))]
            },
            []
        )
    } 
</script>

<PrivateLayout>
    <h2>Exams</h2>

    <Pager
        fetchFn={fetchExams} 
        queryKey="courses" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <div class="row row-cols-lg-auto">
                <Table columnNames={columnNames} tableData={reducePagesToTableRows(pages)}>
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
            </div>
        </svelte:fragment>
    </Pager>
</PrivateLayout>
