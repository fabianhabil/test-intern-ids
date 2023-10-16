import ViewDetailItem from '@/components/template/Item/ViewDetailItem/ViewDetailItem';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <title>Detail Item Data | Test Intern ids.id - Fabian</title>
            <ViewDetailItem params={params.id} />
        </>
    );
}
