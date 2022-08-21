<script lang="ts">	
	let isHovered = false
	
	function toggleHovered() {
		isHovered = !isHovered
	}
</script>

<span on:mouseenter={toggleHovered} on:mouseleave={toggleHovered} role="button" class="{isHovered ? 'shadow' : ''}">
	<slot {isHovered}/>
</span>
