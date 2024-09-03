import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();

      const auth = getAuth();
  
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } catch (error) {
        console.error("Error signing in:", error);
        setError("Failed to log in. Please check your email and password.");
      }
    };

    return (
        <section className="flex w-full">
            <article className="bg-white mx-auto items-center flex flex-col gap-4 p-4 mt-24">
                <h2 className="text-center font-bold text-3xl">Iniciar Sesión</h2>
                <form className="flex flex-col gap-2 p-4 w-96" onSubmit={handleLogin}>
                    <div className="relative border rounded p-2">
                        <input
                            className="w-full outline-none"
                            placeholder="Email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="border rounded p-2">
                        <input
                            className="w-full outline-none"
                            placeholder="Contraseña"
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="bg-violet-900 text-white p-2 mt-2 rounded hover:bg-violet-700" type="submit">
                        Iniciar Sesión
                    </button>
                </form>
            </article>
        </section>
    )
}

export default Login;