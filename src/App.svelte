<script lang="ts">
	import { navigate, Router } from "svelte-navigator";
	import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'
	import Routes from "./Routes.svelte";
    import { userStore } from "./store";

	const token = userStore.getToken();

	if (!$token) {
		navigate('/login')
	}

	const queryClient = new QueryClient()
</script>

<QueryClientProvider client={queryClient}>
	<Router>
		<main class="h-100">
			<div class="container-fluid h-100">
				<Routes />
			</div>
		</main>
	</Router>
</QueryClientProvider>
