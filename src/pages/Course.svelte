<script>
    import Course from "../components/course/Course.svelte";
    import PrivateLayout from "../layouts/PrivateLayout.svelte";

    export let id;

    const COURSE_DUMMY_DATA = {
        id: id,
        name: "DB Administration",
        year: "FIRST",
        espbPoints: 4,
        engagements: [
            {
                id: 1,
                engagementType: "PROFESSOR",
                teacher: {
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
                },
            },
            {
                id: 1,
                engagementType: "ASSISTANT",
                teacher: {
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
                },
            },
        ],
        studyPrograms: [
            {
                id: 1,
                studyField: 'Informatics',
                prefix: 'SF',
                name: 'SIIT',
                espbPoints: 180,
                studyProgramType: 'PROFESSIONAL_STUDIES'
            }
        ]
    };
</script>

<PrivateLayout>
    <Course course={COURSE_DUMMY_DATA} />
</PrivateLayout>
