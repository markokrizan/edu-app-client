<script lang="ts">
  export let onlyOutputState = false;

  let isHovered = false;

  function toggleHovered() {
    isHovered = !isHovered;
  }
</script>

<span
  on:mouseenter={toggleHovered}
  on:mouseleave={toggleHovered}
  role="button"
  class={isHovered && !onlyOutputState ? "shadow" : ""}
>
  <slot {isHovered} />
</span>
