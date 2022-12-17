<script lang="ts">
	import { Link, navigate, } from "svelte-navigator";
  import authService from "../../services/authService";
  import { userStore } from "../../store";
  import SidebarItem from "./SidebarItem.svelte";

  const SIDEBAR_ITEMS = [
    {
      label: 'Study Programs',
      iconClass: 'bi bi-bookmark-star fs-4',
      path: '/study-programs'
    },
    {
      label: 'Courses',
      iconClass: 'bi bi-book fs-4',
      path: '/courses'
    },
    {
      label: 'Exams (Only admin)',
      iconClass: 'bi bi-clipboard-check fs-4',
      path: '/admin/exams'
    },
    {
      label: 'Teachers',
      iconClass: 'bi bi-file-person fs-4',
      path: '/teachers'
    }
  ]

  const handleLogout = () => {
    authService.logout();

    navigate('/login')
  }

  const user = userStore.getUser();

  $: userFullName = `${$user?.firstName} ${$user?.lastName}`;
</script>

<div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark h-100" style="width: 280px;">
  <Link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
    <i class="bi bi-book-half fs-2 me-2"></i>
    <span class="fs-4">Edu app</span>
  </Link>
  <hr>
  <ul class="nav nav-pills flex-column mb-auto">
    {#each SIDEBAR_ITEMS as sidebarItem}
      <SidebarItem {...sidebarItem} /> 
    {/each}
  </ul>
  <hr>
  <div class="dropdown">
    <div role="button" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
      <img src="/assets/user-profile-icon.jpg" alt="" width="32" height="32" class="rounded-circle me-2">
      <strong>{userFullName}</strong>
    </div>
    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
      <li><Link class="dropdown-item" to="/profile">Profile</Link></li>
      <li><hr class="dropdown-divider"></li>
      <li><button class="dropdown-item" on:click={handleLogout}>Sign out</button></li>
    </ul>
  </div>
</div>
