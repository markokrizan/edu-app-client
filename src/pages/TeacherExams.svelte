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
            .request({ method: 'GET', url: `api/teachers/${$user.id}/exams?page=${page}`});
    }
</script>

<PrivateLayout>
    <h4>Your courses' exams</h4>

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
