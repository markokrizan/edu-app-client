<script>
    import Form from "../common/forms/Form.svelte";
    import TextInput from "../common/forms/TextInput.svelte";
    import * as yup from "yup";
    import authService from "../../services/authService";
    import { navigate } from "svelte-navigator";

    let loginError = '';

    const onSubmit = async (values) => {
        loginError = '';

        const { username, password } = values;

        try {
            await authService.login(username, password);

            navigate('/profile');
        } catch (e) {
            loginError = e.error;
        }
    }
</script>

<Form 
    let:handleChange 
    let:errors 
    let:form onSubmit={onSubmit}
    validationSchema={
        yup.object().shape({
            username: yup
            .string()
            .required("Username is required"),
            password: yup.string().required("Password is required")
        })
    }
    class="d-flex justify-content-center align-items-center flex-column"
>
    <h3>Login</h3>
    <p class="text-danger">{loginError}</p>
    <TextInput 
        name="username" 
        label="Username:" 
        handleChange={handleChange} 
        value={form?.username} 
        error={errors?.username}
    />
    <TextInput 
        name="password"
        label="Password:"
        handleChange={handleChange}
        value={form?.password}
        error={errors?.password}
        class="mt-2"
        variant="password"
    />
    <button 
        class="btn btn-primary mt-2" 
        type="submit"
    >
        Login
    </button>
</Form>
