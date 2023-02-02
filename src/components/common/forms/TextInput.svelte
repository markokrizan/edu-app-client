
<script lang="ts">
    type TextInputVariant = "text" | "number" | "password" | "email";

    export let name;
    export let label;
    export let value;
    export let handleChange;
    export let error;
    export let variant: TextInputVariant = 'text';
    let clazz;
	export { clazz as class };
</script>

<div class={clazz}>
    <label class="form-label" for={name}>{label}</label>
    {#if variant === 'password'}
        <input
            id={name}
            name={name}
            type="password"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={value}
            class="form-control"
        />
    {:else if variant === 'email'}
        <input
            id={name}
            name={name}
            type="email"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={value}
            class="form-control"
        />
    {:else if variant === 'number'}
        <input
            id={name}
            name={name}
            type="number"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={value}
            class="form-control"
        />
    {:else if variant === 'text'}
        <input
            id={name}
            name={name}
            type="text"
            on:change={handleChange}
            on:blur={handleChange}
            bind:value={value}
            class="form-control"
        />
    {/if}
    {#if error}
        <small class="text-danger">{error}</small>
    {/if}
</div>
