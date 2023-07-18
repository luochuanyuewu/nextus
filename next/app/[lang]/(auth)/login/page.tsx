import FormLogin from "@/components/auth/FormLogin";

export default async function PageRoute({ params }: { params: { slug: string, lang: string } }) {

    return (
        <FormLogin />
    )
}
