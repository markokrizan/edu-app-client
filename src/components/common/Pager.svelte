<script lang="ts">
    import { useInfiniteQuery } from '@sveltestack/svelte-query'

    export let fetchFn;
    export let queryKey;
    export let queryOptions = {};
    
    // TODO: Provide typing
    const queryResult = useInfiniteQuery<any, any, any, any>(
        queryKey, 
        async ({ pageParam = 0 }) => await fetchFn(pageParam), 
        {
            getNextPageParam: response => {
                if (response?.last === undefined) {
                    return undefined;
                }

                if (response.last) {
                    return undefined
                }

                return response?.pageable?.pageNumber + 1
            },
            ...queryOptions
        }
    )
</script>

{#if $queryResult?.status === 'loading'}
    Loading...
{:else if $queryResult?.status === 'error'}
    Error: {$queryResult?.error?.message}
{:else}
    <slot
        name="pages"
        pages={$queryResult?.data.pages} 
    />
    {#if $queryResult.hasNextPage}
        {#if $$slots.pager}
            <slot
                name="pager"
                fetchNextPage={() => $queryResult.fetchNextPage()}
                isLoading={$queryResult.isFetchingNextPage}
            />
        {:else}
            <button
                class="btn btn-primary"
                on:click={() => $queryResult.fetchNextPage()}
                disabled={$queryResult.isFetchingNextPage}
            >
                {#if $queryResult.isFetchingNextPage}
                    Loading more...
                {:else} 
                    Load More 
                {/if}
            </button>
        {/if}
    {/if}
{/if}
