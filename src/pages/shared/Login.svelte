<script lang="ts">
    import { navigate } from "svelte-navigator";
    import LoginForm from "../../components/forms/LoginForm.svelte";
    import PublicLayout from "../../layouts/PublicLayout.svelte";
    import authService from "../../services/authService";

	if (authService.isLoggedIn()) {
		navigate('/profile')
	}
</script>

<PublicLayout>
    <div class="d-flex justify-content-center align-items-center">
        <LoginForm/>
    </div>
</PublicLayout>
