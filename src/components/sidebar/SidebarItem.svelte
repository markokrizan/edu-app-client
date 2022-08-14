
<script lang="ts">
    import { Link, useLocation } from "svelte-navigator";

    export let path = '';
    export let iconClass = '';
    export let label = '';

    const location = useLocation();

    $: isCurrent = $location.pathname === path;
</script>

<li class="nav-item">
    <Link to={path} class="nav-link text-white {isCurrent ? 'active' : ''} d-flex align-items-center" aria-current="page">
        <i class="{iconClass} me-2"></i>
        <span>{label}</span>
    </Link>
</li>
