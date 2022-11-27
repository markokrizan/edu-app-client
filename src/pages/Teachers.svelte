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
    <h2>Teachers</h2>

    <Pager
        fetchFn={fetchTeachers} 
        queryKey="teachers" 
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
                    <TeacherCard teacher={item} /> 
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
