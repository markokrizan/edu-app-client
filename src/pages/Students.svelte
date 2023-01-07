<script lang="ts">
    import Pager from "../components/common/Pager.svelte";
    import StudentCard from "../components/student/StudentCard.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import httpService from "../services/httpService";

    const fetchStudents = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/students?page=${page}`});
    }
</script>

<PrivateLayout>
    <h4>Students</h4>

    <Pager
        fetchFn={fetchStudents} 
        queryKey="students" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <div class="row row-cols-lg-auto">
                {#each pages as page}
                    {#each page.content as item}
                        <StudentCard student={item} />
                    {/each}
                {/each}
            </div>
        </svelte:fragment>
    </Pager>
</PrivateLayout>
