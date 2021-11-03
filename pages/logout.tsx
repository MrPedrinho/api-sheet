import {GetServerSideProps} from "next";

export default function Login() {
    return <a href="/api/auth/logout">Login</a>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        redirect: {
            destination: "/api/auth/logout",
            permanent: true
        }
    }
}