<script>
    import Teacher from "../components/teacher/Teacher.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";

    export let id;

    const DUMMY_TEACHER = {
        id: id,
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
        profileImage: "/assets/user-profile-icon.jpg",
        engagements: [
            {
                id: 1,
                engagementType: "PROFESSOR",
                course: {
                    id: id,
                    name: "DB Administration",
                    year: "FIRST",
                    semester: "SUMMER",
                    espbPoints: 4
                },
            },
            {
                id: 1,
                engagementType: "ASSISTANT",
                course: {
                    id: 2,
                    name: 'Web development',
                    year: 'THIRD',
                    semester: 'WINTER',
                    espbPoints: 6
                },
            },
        ],
    };
</script>

<PrivateLayout>
    <Teacher teacher={DUMMY_TEACHER} />
</PrivateLayout>
