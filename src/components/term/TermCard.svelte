<script lang="ts">
	export let term;

    const termFromDate = new Date(term.from);
    const termToDate = new Date(term.to);

    const termFrom = `${termFromDate.getDate()} ${termFromDate.toLocaleString('default', { month: 'long' })}`;
    const termTo = `${termToDate.getDate()} ${termToDate.toLocaleString('default', { month: 'long' })}`;
</script>

<style>
    .card-container {
        width: 18rem;
    }
</style>

<div class="card card-container col m-4">
    <div class="card-body">
        <h5 class="card-title">{term?.name}</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">From: {termFrom}</li>
        <li class="list-group-item">To: {termTo}</li>
    </ul>
</div>
