<script>
    import Pager from "../components/common/Pager.svelte";
    import ExamTable from "../components/exam/ExamTable.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import httpService from "../services/httpService";
    import { userStore } from "../store";

    const user = userStore.getUser();

    const fetchPassedExams = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/students/${$user.id}/passed-exams?page=${page}`});
    }

    const fetchRegistrableExams = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/students/${$user.id}/registrable-exams?page=${page}`});
    }
</script>

<PrivateLayout>
    <h4>Passed exams</h4>

    <Pager
        fetchFn={fetchPassedExams} 
        queryKey="passed-exams" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <ExamTable examPages={pages} />
        </svelte:fragment>
    </Pager>
</PrivateLayout>
