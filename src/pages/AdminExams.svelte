<script>
    import Pager from "../components/common/Pager.svelte";
    import ExamTable from "../components/exam/ExamTable.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import httpService from "../services/httpService";

    const fetchExams = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/exams?page=${page}`});
    }
</script>

<PrivateLayout>
    <h4>Exams</h4>

    <Pager
        fetchFn={fetchExams} 
        queryKey="exams" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <ExamTable examPages={pages} />
        </svelte:fragment>
    </Pager>
</PrivateLayout>
