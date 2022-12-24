<script lang="ts">
    export let columnNames;
    export let tableData;
</script>

<table class="table table-hover">
    <thead>
        <tr>
            {#each columnNames as columnName}
                <th scope="col">{columnName}</th>
            {/each}
        </tr>
    </thead>
    <tbody>
        {#each tableData as dataRow}
            <tr>
                {#each dataRow as cell, index}
                        {#if $$slots.row}
                            <slot
                                name="row"
                                cellValue={cell}
                                index={index}
                            />
                        {:else}
                            <td>{cell}</td>
                        {/if}
                {/each}
            </tr>
        {/each}   
    </tbody>
</table>
