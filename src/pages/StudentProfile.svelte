<script lang="ts">
  import Student from "../components/student/Student.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";
    import { userStore } from "../store";
    
    const user = userStore.getUser();
</script>

<PrivateLayout>
    <Student student={$user}/>
</PrivateLayout>
