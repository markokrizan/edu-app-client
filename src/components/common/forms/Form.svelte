
<script lang="ts">
    import { createForm } from "svelte-forms-lib";

    export let initialValues;
    export let onSubmit;
    export let validationSchema;
    let clazz;
	export { clazz as class };

    let { form, errors, state, handleChange, handleSubmit } = createForm({
        initialValues,
        validationSchema,
        onSubmit
    });
</script>

<form on:submit={handleSubmit} class={clazz}>
    <slot form={$form} errors={$errors} {handleChange} state={$state}></slot>
</form>
