<script lang="ts">
	import { Router } from "svelte-navigator";
	import Sidebar from "./components/sidebar/Sidebar.svelte";
	import Routes from "./Routes.svelte";
</script>

<Router>
	<main class="h-100">
		<div class="container-fluid h-100">
			<div class="row h-100">
				<div class="col-2 p-0">
					<Sidebar />
				</div>
				<div class="col-10">
					<Routes />
				</div>
			</div>
		</div>
	</main>
</Router>
