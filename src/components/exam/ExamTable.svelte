<script>
    import { Link } from "svelte-navigator";
    import Table from "../common/Table.svelte";

    export let examPages = [];

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

<Table columnNames={columnNames} tableData={reducePagesToTableRows(examPages)}>
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
