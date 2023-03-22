<script lang="ts">
  import HoverableInteraction from "../common/HoverableInteraction.svelte";

  export let term;
  export let onClick = () => {};

  const termFromDate = new Date(term.from);
  const termToDate = new Date(term.to);

  const termFrom = `${termFromDate.getDate()} ${termFromDate.toLocaleString(
    "default",
    { month: "long" }
  )}`;
  const termTo = `${termToDate.getDate()} ${termToDate.toLocaleString(
    "default",
    { month: "long" }
  )}`;
</script>

<HoverableInteraction onlyOutputState={true} let:isHovered>
  <div
    class="card card-container col m-4 {isHovered ? 'shadow' : ''}"
    on:click={onClick}
  >
    <div class="card-body">
      <h5 class="card-title">{term?.name}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">From: {termFrom}</li>
      <li class="list-group-item">To: {termTo}</li>
    </ul>
  </div>
</HoverableInteraction>

<style>
  .card-container {
    width: 18rem;
  }
</style>
