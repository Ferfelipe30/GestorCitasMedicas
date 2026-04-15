import { Route, Routes } from 'react-router-dom'
import './App.css'
import heroImg from './assets/hero.png'
import LoginPage from './pages/LoginPage'
import CitaPage from './pages/CitaPage'

const stats = [
  { value: '24/7', label: 'Urgencias' },
  { value: '120+', label: 'Especialistas' },
  { value: '4.9/5', label: 'Satisfacción' },
]

const services = [
  {
    short: 'CM',
    title: 'Citas médicas',
    text: 'Agenda presencial o virtual en minutos.',
  },
  {
    short: 'AI',
    title: 'Atención inmediata',
    text: 'Consulta síntomas y recibe orientación rápida.',
  },
  {
    short: 'ES',
    title: 'Exámenes y resultados',
    text: 'Revisa tus estudios desde un solo lugar.',
  },
]

const doctors = [
  { name: 'Dra. Ana Torres', specialty: 'Medicina general', shift: 'Lun - Vie' },
  { name: 'Dr. Luis Pérez', specialty: 'Cardiología', shift: 'Mie - Sab' },
  { name: 'Dra. Sofía Rojas', specialty: 'Pediatría', shift: 'Todos los días' },
]

function HomePage() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">+</div>
          <div>
            <strong>City General</strong>
            <span>Hospital y clínica integral</span>
          </div>
        </div>

        <nav className="topnav" aria-label="Navegación principal">
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#doctores">Doctores</a>
          <a href="#citas">Citas</a>
        </nav>

        <a className="topbar-cta" href="/citas">
          Agendar cita
        </a>
        <a className="topbar-cta" href="/login">
          Login
        </a>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Hospital moderno y cercano</span>
            <h1>Tu salud, en un solo lugar</h1>
            <p>
              Agenda citas, consulta especialistas y revisa tus resultados sin
              complicaciones. Atención rápida, clara y humana.
            </p>

            <div className="hero-actions">
              <a className="btn btn-primary" href="#citas">
                Reservar cita
              </a>
              <a className="btn btn-secondary" href="#servicios">
                Ver servicios
              </a>
            </div>

            <div className="hero-metrics">
              {stats.map((item) => (
                <article key={item.label} className="metric">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <img
                src={heroImg}
                alt="Equipo médico atendiendo a un paciente"
                className="hero-image"
              />

              <aside className="assistant-card" aria-label="Asistente virtual">
                <div className="assistant-header">
                  <span className="assistant-dot" />
                  <span>MediBot</span>
                </div>
                <p>
                  Hola, soy tu asistente virtual. Puedo ayudarte a reservar
                  una cita, revisar horarios y resolver dudas rápidas.
                </p>

                <div className="assistant-actions">
                  <a href="#citas">Ver citas</a>
                  <a href="#doctores">Hablar con enfermería</a>
                  <a href="#citas">Emergencias</a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section id="servicios" className="section">
          <div className="section-heading">
            <span className="eyebrow">Lo esencial</span>
            <h2>Servicios principales</h2>
            <p>
              Una home hospitalaria debe mostrar de inmediato lo más importante:
              atención, rapidez y confianza.
            </p>
          </div>

          <div className="grid services-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <span className="service-icon">{service.short}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="doctores" className="section split">
          <div className="panel info-panel">
            <span className="eyebrow">Atención humana</span>
            <h2>Especialistas disponibles todos los días</h2>
            <p>
              Organiza tu consulta según especialidad, horario y tipo de
              atención. Así el paciente encuentra rápido al profesional que
              necesita.
            </p>

            <ul className="bullet-list">
              <li>
                <span className="check">✓</span>
                <span>Atención presencial y virtual</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Resultados y seguimiento desde la web</span>
              </li>
              <li>
                <span className="check">✓</span>
                <span>Interfaz clara para pacientes y familiares</span>
              </li>
            </ul>
          </div>

          <div className="panel doctors-panel">
            {doctors.map((doctor) => (
              <article key={doctor.name} className="doctor-card">
                <div className="doctor-meta">
                  <div className="avatar">
                    {doctor.name
                      .split(' ')
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join('')}
                  </div>
                  <div>
                    <h3>{doctor.name}</h3>
                    <p>{doctor.specialty}</p>
                  </div>
                </div>
                <span className="shift">{doctor.shift}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="citas" className="cta-band">
          <div>
            <span className="eyebrow inverse">Empieza hoy</span>
            <h2>Agenda tu consulta en menos de un minuto</h2>
            <p>
              El siguiente paso natural es conectar este home con tu sistema de
              reservas y tu backend.
            </p>
          </div>

          <a className="btn btn-primary" href="/citas">
            Agendar Cita
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>City General. Cuidamos tu salud con tecnología y cercanía.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/citas" element={<CitaPage />} />
    </Routes>
  )
}

export default App
