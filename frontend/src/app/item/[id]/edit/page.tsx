import EditItem from '@/components/template/Item/EditItem/EditItem';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <title>Edit Item Data | Test Intern ids.id - Fabian</title>
            <EditItem params={params.id} />
        </>
    );
}
