<script lang="ts">
  import Modal from "../components/common/Modal.svelte";
  import EditProfileForm from "../components/forms/EditProfileForm.svelte";
  import PrivateLayout from "../layouts/PrivateLayout.svelte";
  import { userStore } from "../store";

  const user = userStore.getUser();

  let showEditUserModal = false;
</script>

<PrivateLayout>
  <div class="row">
    <div class="d-flex justify-content-between mb-2">
      <h4>{$user?.firstName} {$user?.lastName}</h4>
      <button
        class="btn btn-primary"
        on:click={() => (showEditUserModal = !showEditUserModal)}>Edit</button
      >
    </div>
  </div>

  <div class="row">
    <div class="col-md-4">
      {#if $user.profileImage}
        <img
          src={$user.profileImage}
          class="img-fluid mb-3"
          alt="User profile"
        />
      {:else}
        (No image availabe)
      {/if}

      <dl class="row mt-1">
        <dt class="col-sm-4">Email:</dt>
        <dd class="col-sm-8">{$user?.email}</dd>

        <dt class="col-sm-4">Phone number:</dt>
        <dd class="col-sm-8">{$user.phoneNumber}</dd>

        <dt class="col-sm-4">Roles:</dt>
        <dd class="col-sm-8">
          {$user?.roles?.map?.((role) => role.name).join(", ")}
        </dd>
      </dl>
    </div>
  </div>

  <Modal open={showEditUserModal} title="Edit profile info">
    <EditProfileForm onComplete={() => showEditUserModal = false} />
  </Modal>
</PrivateLayout>
