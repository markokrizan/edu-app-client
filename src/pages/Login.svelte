<script lang="ts">
    import { navigate } from "svelte-navigator";
    import PublicLayout from "../layouts/PublicLayout.svelte";
    import { userStore } from "../store";

    const token = userStore.getToken();

	if ($token) {
		navigate('/profile')
	}
</script>

<PublicLayout>
    <p>Login page</p>
</PublicLayout>
