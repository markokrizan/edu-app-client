<script lang="ts">
  import { navigate, Router } from "svelte-navigator";
  import { QueryClientProvider } from "@sveltestack/svelte-query";
  import Routes from "./router/Routes.svelte";
  import { userStore } from "./store";
  import queryClient from "./store/queryClient";

  const token = userStore.getToken();

  if (!$token) {
    navigate("/login");
  }
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
