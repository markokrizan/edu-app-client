<script lang="ts">
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import { navigate } from "svelte-navigator";
  import CourseForm from "../../components/forms/CourseForm.svelte";
</script>

<PrivateLayout>
  <h3>Create a new course</h3>
  <CourseForm onComplete={() => navigate("/courses")} class="w-50" />
</PrivateLayout>
