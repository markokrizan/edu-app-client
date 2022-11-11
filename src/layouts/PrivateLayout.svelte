<script lang="ts">
    import Sidebar from "../components/sidebar/Sidebar.svelte";
</script>

<div class="row h-100">
    <div class="col-2 p-0">
        <Sidebar />
    </div>
    <div class="col-10 py-2">
        <slot></slot>
    </div>
</div>
