<script lang="ts">
    import Course from "../../components/course/admin/Course.svelte";
    import PrivateLayout from "../../layouts/PrivateLayout.svelte";``
    import httpService from "../../services/httpService";
    import Loadable from "../../components/common/Loadable.svelte";

    export let id;
</script>

<PrivateLayout>
    <Loadable
        fetchFn={() => httpService.withAuth().request({ method: 'GET', url: `api/courses/${id}`})}
        queryKey="course"
    >
        <svelte:fragment slot="data" let:data>
            <Course course={data}/>
        </svelte:fragment>
    </Loadable>
</PrivateLayout>
