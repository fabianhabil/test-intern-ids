import EditStatus from '@/components/template/Status/EditStatus/EditStatus';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <title>Edit Item Data | Test Intern ids.id - Fabian</title>
            <EditStatus params={params.id} />
        </>
    );
}
