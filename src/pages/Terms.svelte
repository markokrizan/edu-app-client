<script>
    import Pager from "../components/common/Pager.svelte";
    import TermCard from "../components/term/TermCard.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import httpService from "../services/httpService";

    const fetchTerms = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/terms?page=${page}`});
    }
</script>

<PrivateLayout>
    <h4>Terms</h4>

    <Pager
        fetchFn={fetchTerms} 
        queryKey="terms" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <div class="row row-cols-lg-auto">
                {#each pages as page}
                    {#each page.content as item}
                        <TermCard term={item} />
                    {/each}
                {/each}
            </div>
        </svelte:fragment>
    </Pager>
</PrivateLayout>
