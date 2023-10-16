import EditTransaction from '@/components/template/Transaction/EditTransaction/EditTransaction';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <title>Edit Item Data | Test Intern ids.id - Fabian</title>
            <EditTransaction params={params.id} />
        </>
    );
}
