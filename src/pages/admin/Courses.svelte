<script lang="ts">
    import CourseCard from "../../components/course/shared/CourseCard.svelte";
    import PrivateLayout from "../../layouts/PrivateLayout.svelte";

    import Pager from "../../components/common/Pager.svelte";
    import httpService from "../../services/httpService";
    import { Link } from "svelte-navigator";

    const fetchCourses = (page) => {
        return httpService
            .withAuth()
            .request({ method: 'GET', url: `api/courses?page=${page}`});
    }

</script>

<PrivateLayout>
    <div class="d-flex justify-content-between">
        <h4>Courses</h4>
        <Link to="/courses/create" class="btn btn-primary">Create</Link>
    </div>
    
    <Pager 
        fetchFn={fetchCourses} 
        queryKey="admin-courses" 
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
