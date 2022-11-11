<script lang="ts">
	import { navigate, Router } from "svelte-navigator";
	import Routes from "./Routes.svelte";
    import { userStore } from "./store";

	const token = userStore.getToken();

	if (!$token) {
		navigate('/login')
	}
</script>

<Router>
	<main class="h-100">
		<div class="container-fluid h-100">
			<Routes />
		</div>
	</main>
</Router>
