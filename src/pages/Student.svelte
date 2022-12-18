<script>
    import Loadable from "../components/common/Loadable.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import httpService from "../services/httpService";
    import Student from "../components/student/Student.svelte";

    export let id;
</script>

<PrivateLayout>
    <Loadable
        fetchFn={() => httpService.withAuth().request({ method: 'GET', url: `api/students/${id}`})}
        queryKey="student"
    >
        <svelte:fragment slot="data" let:data>
            <Student student={data}/>
        </svelte:fragment>
    </Loadable>
</PrivateLayout>
