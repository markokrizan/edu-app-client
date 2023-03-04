<script lang="ts">
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import httpService from "../../services/httpService";
  import Loadable from "../../components/common/Loadable.svelte";
  import StudentCourse from "../../components/course/student/Course.svelte";

  export let id;
</script>

<PrivateLayout>
  <Loadable
    fetchFn={() =>
      httpService
        .withAuth()
        .request({ method: "GET", url: `api/courses/${id}` })}
    queryKey="course"
  >
    <svelte:fragment slot="data" let:data>
      <StudentCourse course={data} />
    </svelte:fragment>
  </Loadable>
</PrivateLayout>
