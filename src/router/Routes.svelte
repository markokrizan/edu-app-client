<script lang="ts">
    import { navigate, useLocation } from "svelte-navigator";

	import { Route } from "svelte-navigator";
    import AccessDenied from "../pages/AccessDenied.svelte";
    import Login from "../pages/Login.svelte";
    import NotFound from "../pages/NotFound.svelte";
    import { userStore } from "../store";
    import ROUTES from "./config";

    const location = useLocation();

    if ($location?.pathname === '/') {
        navigate('/profile');
    }

    const user = userStore.getUser();

    $: role = $user?.roles?.map(role => role?.name)[0];
</script>

{#each ROUTES as route }
    <Route path={route.path} component={route.components[role] ?? AccessDenied} />
{/each}

<Route path="/login" component={Login} />
<Route component={NotFound} />
