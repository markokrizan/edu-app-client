<script lang="ts">
    import TeacherCard from "../components/teacher/TeacherCard.svelte";

	const DUMMY_TEACHERS = [
        {
            id: 1,
            firstName: "Marko",
            lastName: "Markovic",
            username: "markom",
            email: "marko@mail.com",
            phoneNumber: "123123",
            personalIdNumber: "111111",
            roles: {
                id: 1,
                name: "ROLE_TEACHER",
            },
            academicTitle: "PhD",
            profileImage: "/assets/user-profile-icon.jpg"
        },
        {
            
            id: 2,
            firstName: "Petar",
            lastName: "Petrovic",
            username: "pekip",
            email: "pekip@mail.com",
            phoneNumber: "123123",
            personalIdNumber: "111111",
            roles: {
                id: 1,
                name: "ROLE_TEACHER",
            },
            academicTitle: "Mr",
            profileImage: "/assets/user-profile-icon.jpg"
        }
    ]
</script>

<h2>Teachers</h2>

<div class="row row-cols-lg-auto">
    {#each DUMMY_TEACHERS as teacher}
        <TeacherCard teacher={teacher} /> 
    {/each}
</div>
