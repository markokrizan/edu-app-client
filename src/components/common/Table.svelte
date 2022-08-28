<script lang="ts">
    export let tableData;
</script>

<table class="table table-hover">
    <thead>
        <tr>
            {#each tableData.columnNames as columnName}
                <th scope="col">{columnName}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each tableData.data as dataRow}
            <tr>
                {#each dataRow as cell, index}
                    {#if index === 0}
                        <th scope="row">{cell}</th>
                    {:else}
                        <td>{cell}</td>
                    {/if}
                {/each}
            </tr>
        {/each}   
    </tbody>
</table>
