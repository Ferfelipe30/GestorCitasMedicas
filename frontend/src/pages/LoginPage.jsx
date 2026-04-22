import { useState } from "react"
import './LoginPage.css'

function LoginPage() {
    const [isLogin, setIsLogin] = useState(false)
    const [form, setform] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        dateOfBirth: "",
        username: "", 
        password: "",
        agreeTerms: false
    })
    const [loading, setloading] = useState(false)
    const [error, setError] = useState("")
    const [ok, setOk] = useState('')

    const onChange = (e) => {
        const { name, value, type, checked } = e.target
        setform({ 
            ...form, 
            [name]: type === 'checkbox' ? checked : value 
        })
    }

    const validatePassword = (password) => {
        const hasNumber = /[0-9]/.test(password)
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password)
        return password.length >= 8 && hasNumber && hasSymbol
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setOk('')

        if (isLogin) {
            //Login
            if (!form.username || !form.password) {
                setError('Usuario y contraseña son obligatorios')
                return
            }
        } else {
            //Registro
            if (!form.fullName || !form.email || !form.phoneNumber || !form.dateOfBirth || !form.password) {
                setError('Todos los campos son obligatorios')
                return
            }
            if (!validatePassword(form.password)) {
                setError('La contraseña debe tener al menos 8 caracteres, un número y un símbolo')
                return
            }
            if (!form.agreeTerms) {
                setError('Debes aceptar los términos y condiciones')
                return
            }
        }

        try {
            setloading(true)

             const endpoint = isLogin 
                ? 'http://localhost:3000/api/usuarios/login'
                : 'http://localhost:3000/api/usuarios/registro'

            const payload = isLogin
                ? { username: form.username, password: form.password }
                : {
                    fullName: form.fullName,
                    email: form.email,
                    phoneNumber: form.phoneNumber,
                    dateOfBirth: form.dateOfBirth,
                    password: form.password
                }

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'No se pudo completar la operación')
                return
            }

            setOk(isLogin ? 'Inicio de sesión exitoso' : 'Registro exitoso')
            if (isLogin) {
                localStorage.setItem('usuario', JSON.stringify(data.usuario))
            }
        } catch {
            setError('Error de conexión con el servidor')
        } finally {
            setloading(false)
        }
    }

    return (
        <main className="login-page">
            <div className="login-container">
                {!isLogin ? (
                    <>
                        <div className="login-left">
                            <h2>Join our patient community</h2>
                            <p>Experience a better way to manage your healthcare journey with our integrated patient portal.</p>

                            <div className="feature-list">
                                <div className="feature-item">
                                    <div className="feature-icon">⏱️</div>
                                    <h4>View Medical History</h4>
                                    <p>Access your lab results, immunization records, and past visit summaries anytime.</p>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">📅</div>
                                    <h4>Manage Appointments</h4>
                                    <p>Schedule new visits or reschedule existing ones without making a phone call.</p>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon">💬</div>
                                    <h4>Direct Messaging</h4>
                                    <p>Communicate securely with your healthcare providers and care team.</p>
                                </div>
                            </div>

                            <div className="trust-badge">
                                <span>Trusted by 50,000+ patients</span>
                            </div>
                        </div>

                        <div className="login-right">
                            <h3>Create Your Account</h3>

                            <form onSubmit={onSubmit} className="form-register">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input
                                            name="fullName"
                                            value={form.fullName}
                                            onChange={onChange}
                                            placeholder="Jonathan Doe"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={form.email}
                                            onChange={onChange}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input
                                            name="phoneNumber"
                                            value={form.phoneNumber}
                                            onChange={onChange}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Date of Birth</label>
                                        <input
                                            name="dateOfBirth"
                                            type="date"
                                            value={form.dateOfBirth}
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        value={form.password}
                                        onChange={onChange}
                                        placeholder="••••••••"
                                    />
                                    <small>Must be at least 8 characters with a number and symbol.</small>
                                </div>

                                {error && <p className="error">{error}</p>}
                                {ok && <p className="success">{ok}</p>}

                                <div className="form-group checkbox-group">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={form.agreeTerms}
                                        onChange={onChange}
                                        id="terms"
                                    />
                                    <label htmlFor="terms">
                                        I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>, including how City General Hospital handles my medical data.
                                    </label>
                                </div>

                                <button type="submit" disabled={loading} className="btn-submit">
                                    {loading ? 'Creating Account...' : 'Create Account'} →
                                </button>

                                <div className="divider">
                                    <span>OR SIGN UP WITH</span>
                                </div>

                                <div className="social-buttons">
                                    <button type="button" className="social-btn google">
                                        <span>🔵</span> Google
                                    </button>
                                    <button type="button" className="social-btn facebook">
                                        <span>f</span> Facebook
                                    </button>
                                </div>

                                <p className="toggle-login">
                                    Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="link-btn">Login</button>
                                </p>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="login-simple">
                        <form onSubmit={onSubmit} className="form-login">
                            <h2>Iniciar sesión</h2>

                            <div className="form-group">
                                <label>Usuario</label>
                                <input
                                    name="username"
                                    value={form.username}
                                    onChange={onChange}
                                    placeholder="Tu usuario"
                                />
                            </div>

                            <div className="form-group">
                                <label>Contraseña</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={onChange}
                                    placeholder="Tu contraseña"
                                />
                            </div>

                            {error && <p className="error">{error}</p>}
                            {ok && <p className="success">{ok}</p>}

                            <button type="submit" disabled={loading} className="btn-submit">
                                {loading ? 'Iniciando...' : 'Iniciar sesión'}
                            </button>

                            <p className="toggle-login">
                                ¿No tienes cuenta? <button type="button" onClick={() => setIsLogin(false)} className="link-btn">Regístrate</button>
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </main>
    );
}

export default LoginPage