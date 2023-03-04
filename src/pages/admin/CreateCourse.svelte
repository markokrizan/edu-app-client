<script lang="ts">
  import PrivateLayout from "../../layouts/PrivateLayout.svelte";
  import { navigate } from "svelte-navigator";
  import CourseForm from "../../components/forms/CourseForm.svelte";
</script>

<PrivateLayout>
  <CourseForm onComplete={() => navigate("/courses")} />
</PrivateLayout>
