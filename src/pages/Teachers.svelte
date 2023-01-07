<script lang="ts">
    import Pager from "../components/common/Pager.svelte";
    import TeacherCard from "../components/teacher/TeacherCard.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import httpService from "../services/httpService";

    const fetchTeachers = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/teachers?page=${page}`});
    }
</script>

<PrivateLayout>
    <h4>Teachers</h4>

    <Pager
        fetchFn={fetchTeachers} 
        queryKey="teachers" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <div class="row row-cols-lg-auto">
                {#each pages as page}
                    {#each page.content as item}
                        <TeacherCard teacher={item} />
                    {/each}
                {/each}
            </div>
        </svelte:fragment>
    </Pager>
</PrivateLayout>
