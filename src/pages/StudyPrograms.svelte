<script>
    import Pager from "../components/common/Pager.svelte";
    import StudyProgramCard from "../components/study-program/StudyProgramCard.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import httpService from "../services/httpService";

    const fetchStudyPrograms = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/study-programs?page=${page}`});
    }
</script>

<PrivateLayout>
    <h2>Study programs</h2>

    <Pager
        fetchFn={fetchStudyPrograms} 
        queryKey="study-programs" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <div class="row row-cols-lg-auto">
                {#each pages as page}
                    {#each page.content as item}
                        <StudyProgramCard studyProgram={item} />
                    {/each}
                {/each}
            </div>
        </svelte:fragment>
    </Pager>
</PrivateLayout>
