<script lang="ts">
    import CourseCard from "../../components/course/shared/CourseCard.svelte";
    import PrivateLayout from "../../layouts/PrivateLayout.svelte";

    import Pager from "../../components/common/Pager.svelte";
    import httpService from "../../services/httpService";
    import { userStore } from "../../store";

    const user = userStore.getUser();

    const fetchCourses = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/students/${$user.id}/courses?page=${page}`});
    }

</script>

<PrivateLayout>
    <h4>My Courses</h4>

    <Pager 
        fetchFn={fetchCourses} 
        queryKey="student-courses" 
        queryOptions={{ refetchOnMount: false }}
    >
        <svelte:fragment slot="pages" let:pages>
            <div class="row row-cols-lg-auto">
                {#each pages as page}
                    {#each page.content as item}
                        <CourseCard course={item} />
                    {/each}
                {/each}
            </div>
        </svelte:fragment>
    </Pager>
</PrivateLayout>
