import {GetServerSideProps} from "next";

export default function Login() {
    return <a href="/api/auth/login">Login</a>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        redirect: {
            destination: "/api/auth/login",
            permanent: true
        }
    }
}