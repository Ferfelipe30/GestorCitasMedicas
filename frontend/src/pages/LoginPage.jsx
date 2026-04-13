import { use, useState } from "react"
import './LoginPage.css'

function LoginPage() {
    const [form, setform] = useState({username: "", password: ""})
    const [loading, setloading] = useState(false)
    const [error, setError] = useState("")
    const [ok, setOk] = useState('')

    const onChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setOk('')

        if (!form.username || !form.password) {
            setError('Usuario y contraseña son obligatorios')
            return
        }

        try {
            setloading(true)

            const res = await fetch('http://localhost:3000/api/usuarios/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'No se pudo iniciar sesión')
                return
            }

            setOk('Inicio de sesión exitoso')
            localStorage.setItem('usuario', JSON.stringify(data.usuario))
        } catch {
            setError('Error de conexión con el servidor')
        } finally {
            setloading(false)
        }
    }

    return (
        <main className="login-page">
            <form className="login-card" onSubmit={onSubmit}>
                <h1>Iniciar sesión</h1>

                <label>Usuario</label>
                <input
                    name="username"
                    value={form.username}
                    onChange={onChange}
                    placeholder="Tu usuario"
                />

                <label>Contraseña</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="Tu contraseña"
                />

                {error && <p className="error">{error}</p>}
                {ok && <p className="success">{ok}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Iniciando...' : 'Iniciar sesión'}
                </button>
            </form>
        </main>
    );
}

export default LoginPage