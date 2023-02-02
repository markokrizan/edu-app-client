<script lang="ts">
  import Teacher from "../components/teacher/Teacher.svelte";
  import PrivateLayout from "../layouts/PrivateLayout.svelte";
  import { userStore } from "../store";

  const user = userStore.getUser();
</script>

<PrivateLayout>
  <Teacher teacher={$user} />
</PrivateLayout>
