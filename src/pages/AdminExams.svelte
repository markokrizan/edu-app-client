<script lang="ts">
    import Table from "../components/common/Table.svelte";

    const DUMMY_EXAM_DATA = [
        {
            id: 1,
            examDate: '2020-01-01',
            location: 'A1',
            term: {
                name: 'January',
                from: '2020-01-01',
                to: '2020-01-01'
            },
            course: {
                id: '1',
                name: "DB Administration",
                year: "FIRST",
                espbPoints: 4,
            }
        },
        {
            id: 2,
            examDate: '2020-02-01',
            location: 'A2',
            term: {
                name: 'February',
                from: '2020-01-01',
                to: '2020-01-01'
            },
            course: {
                id: '1',
                name: "Web Development",
                year: "FIRST",
                espbPoints: 4,
            }
        }
    ]

    const examToTableRow = (exam) => [exam.id, exam.examDate, exam.location, exam.term.name, exam.course.name];

    const tableData = {
        columnNames: ['Id', 'Exam date', 'Location', 'Term', 'Course'],
        data: DUMMY_EXAM_DATA.map(examToTableRow)
    }
</script>

<h2>Exams</h2>

<Table tableData={tableData} />
