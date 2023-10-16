import ViewTransactionItem from '@/components/template/Transaction/ViewTransactionItem/ViewTransactionItem';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <title>Detail Status Data | Test Intern ids.id - Fabian</title>
            <ViewTransactionItem params={params.id} />
        </>
    );
}
