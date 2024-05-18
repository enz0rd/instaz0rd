import LoginForm from "@/components/LoginForm";

export default function Login() {
    return (
        <div className="flex flex-row justify-center items-center h-screen">
            
            <div className="flex flex-col w-100 border-zinc-300 border-2 rounded-xl p-5">
                <h1 className="text-4xl font-bold mb-4">Instaz0rd</h1>
                <p className="mb-2">make your social life simpler.</p>
                <LoginForm></LoginForm>
                <small className="mt-3">
                    <a href="/signup" className="text-slate-500">Doesn't have an account? Sign up</a>
                </small>
            </div>
        </div>
    )
}