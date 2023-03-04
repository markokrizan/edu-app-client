<script>
    import Loadable from "../../components/common/Loadable.svelte";
    import Teacher from "../../components/teacher/Teacher.svelte";
    import PrivateLayout from "../../layouts/PrivateLayout.svelte";
    import httpService from "../../services/httpService";

    export let id;
</script>

<PrivateLayout>
    <Loadable
        fetchFn={() => httpService.withAuth().request({ method: 'GET', url: `api/teachers/${id}`})}
        queryKey="teacher"
    >
        <svelte:fragment slot="data" let:data>
            <Teacher teacher={data}/>
        </svelte:fragment>
    </Loadable>
</PrivateLayout>
