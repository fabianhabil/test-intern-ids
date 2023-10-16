import ViewStatusItem from '@/components/template/Status/ViewStatusItem/ViewStatusItem';

export default function Page({ params }: { params: { id: string } }) {
    return (
        <>
            <title>Detail Status Data | Test Intern ids.id - Fabian</title>
            <ViewStatusItem params={params.id} />
        </>
    );
}
