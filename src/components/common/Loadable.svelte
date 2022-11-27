<script lang="ts">
    import { useQuery } from '@sveltestack/svelte-query'

    export let fetchFn;
    export let queryKey;
 
    // TODO: Provide typing
    const queryResult = useQuery<any, any, any, any>(
        queryKey, 
        fetchFn
    );
</script>

{#if $queryResult.isLoading}
    {#if $$slots.loading}
        <slot name="loading" />
    {:else}
        <span>Loading...</span>
    {/if}
{:else if $queryResult.error}
    {#if $$slots.error}
        <slot name="error" error={$queryResult.error} />
    {:else}
        <span>An error has occurred: {$queryResult.error.message || $queryResult.error.error}</span>
    {/if}
{:else}
    <slot name="data" data={$queryResult.data} />
{/if}
