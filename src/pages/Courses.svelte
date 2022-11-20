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
        let:pages
        let:hasNextPage
        let:fetchNextPage
        let:disabled
        let:isFetching
    >
        <div class="row row-cols-lg-auto">
            {#each pages as page}
                {#each page.content as item}
                    <CourseCard course={item} />
                {/each}
            {/each}
        </div>
        {#if hasNextPage}
            <button
                class="btn btn-primary"
                on:click={fetchNextPage}
                disabled={disabled}
            >
                {#if isFetching}
                    Loading more...
                {:else} 
                    Load More 
                {/if}
            </button>
        {/if}
    </Pager>
</PrivateLayout>
