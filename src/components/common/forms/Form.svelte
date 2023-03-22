
<script lang="ts">
    import { createForm } from "svelte-forms-lib";
    import stringService from '../../../services/stringService';

    export let initialValues;
    export let onSubmit;
    export let validationSchema;
    let clazz;
	export { clazz as class };

    let apiFormErrors = {};
    let submitError = '';

    const submit = async (data) => {
        apiFormErrors = {}
        submitError = ''
    
        try {
            await onSubmit(data);
        } catch (e) {
            if (e.errors) {
                for (let error of e.errors) {
                    const fieldName = error.field || stringService.toCamelCase(error.code);

                    if (!fieldName) {
                        continue;
                    }

                    apiFormErrors[fieldName] = error.defaultMessage
                }
            } else {
                submitError = e.message || e.error;
            }
        }
    }

    let { form, errors, state, handleChange, handleSubmit } = createForm({
        initialValues,
        validationSchema,
        onSubmit: submit
    });

    $: combinedErrors = {...apiFormErrors, ...$errors, ...apiFormErrors}
</script>

<form on:submit={handleSubmit} class={clazz}>
    <slot form={$form} errors={combinedErrors} {handleChange} state={$state} submitError={submitError}></slot>
</form>
