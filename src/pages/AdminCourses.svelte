<script lang="ts">
    import CourseCard from "../components/course/CourseCard.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";

    import Pager from "../components/common/Pager.svelte";
    import httpService from "../services/httpService";

    const fetchCourses = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/courses?page=${page}`});
    }

</script>

<PrivateLayout>
    <h2>Courses</h2>
    <Pager 
        fetchFn={fetchCourses} 
        queryKey="courses" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <div class="row row-cols-lg-auto">
                {#each pages as page}
                    {#each page.content as item}
                        <CourseCard course={item} />
                    {/each}
                {/each}
            </div>
        </svelte:fragment>
    </Pager>
</PrivateLayout>
