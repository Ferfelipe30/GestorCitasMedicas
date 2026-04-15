import { useMemo, useState } from "react";
import './CitaPage.css'

const specialties = [
    'Cardiology',
    'Dermatology',
    'Pediatrics',
    'General Medicine',
    'Neurology',
    'Orthopedics',
]

const doctors = [
    {
        name: 'Dr. Michael Chen',
        specialty: 'Cardiology',
        exp: '12 yrs exp.',
        rating: 4.9,
        reviews: 128,
        fee: 120,
    },
    {
        name: 'Dr. Sarah Johnson',
        specialty: 'Cardiology',
        exp: '8 yrs exp.',
        rating: 4.8,
        reviews: 194,
        fee: 110,
    },
    {
        name: 'Dr. James Lee',
        specialty: 'Dermatology',
        exp: '10 yrs exp.',
        rating: 4.7,
        reviews: 142,
        fee: 100,
    },
    {
        name: 'Dr. Emma Ortiz',
        specialty: 'Pediatrics',
        exp: '9 yrs exp.',
        rating: 4.9,
        reviews: 211,
        fee: 95,
    }
]

const slots = [
    '09:00 AM', '10:30 AM', '02:15 PM', '03:45 PM', '05:00 PM'
]

const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
]

function CitaPage() {
    const [selectedSpecialty, setSelectedSpecialty] = useState('Cardiology')
    const [selectedDoctor, setSelectedDoctor] = useState('Dr. Sarah Johnson')
    const [selectedDay, setSelectedDay] = useState(10)
    const [selectedSlot, setSelectedSlot] = useState('02:15 PM')
    const [message, setMessage] = useState('')

    const filteredDoctors = useMemo(
        () => doctors.filter((doctor) => doctor.specialty === selectedSpecialty),
        [selectedSpecialty]
    )

    const activeDoctor =
        filteredDoctors.find((doctor) => doctor.name === selectedDoctor) ||
        filteredDoctors[0] ||
        doctors[0]
    const consultationFee = activeDoctor?.fee ?? 110
    const serviceFee = 5
    const total = consultationFee + serviceFee

    const handleSpecialtyChange = (specialty) => {
        setSelectedSpecialty(specialty)
        const firstDoctor = doctors.find((doctor) => doctor.specialty === specialty)
        if (firstDoctor) setSelectedDoctor(firstDoctor.name)
    }

    const handleConfirm = () => {
        setMessage(
            `Cita confirmada con ${activeDoctor.name} el 2023-10-${String(selectedDay).padStart(2, '0')} a las ${selectedSlot}.`
        )
    }

    return (
        <main className="booking-page">
            <section className="booking-content">
                <p className="breadcrumb">Home {'>'}  Appointment Booking</p>

                <div className="steps">
                    <article className="step active">
                        <span>STEP 1</span>
                        <strong>Select Specialty</strong>
                    </article>
                    <article className="step">
                        <span>STEP 2</span>
                        <strong>Choose Doctor</strong>
                    </article>
                    <article className="step">
                        <span>STEP 3</span>
                        <strong>Pick Time</strong>
                    </article>
                </div>

                <h1>What type of care do you need?</h1>
                <p className="subtitle">Select a specialty to view available doctors in your area.</p>

                <div className="specialty-grid">
                    {specialties.map((specialty) => (
                    <button
                    key={specialty}
                    type="button"
                    className={selectedSpecialty === specialty ? 'specialty-card active' : 'specialty-card'}
                    onClick={() => handleSpecialtyChange(specialty)}
                    >
                        {specialty}
                    </button>
                    ))}
                </div>

                <div className="section-head">
                    <h2>Recommended {selectedSpecialty}</h2>
                    <button type="button" className="link-btn">View All</button>
                </div>

                <div className="doctor-grid">
                    {filteredDoctors.map((doctor) => (
                        <button
                        key={doctor.name}
                        type="button"
                        className={selectedDoctor === doctor.name ? 'doctor-card active' : 'doctor-card'}
                        onClick={() => setSelectedDoctor(doctor.name)}
                        >
                            <div>
                                <h3>{doctor.name}</h3>
                                <p>{doctor.specialty}</p>
                                <small>{doctor.exp}</small>
                                <small>⭐ {doctor.rating} ({doctor.reviews})</small>
                            </div>
                            <strong>${doctor.fee}/visit</strong>
                        </button>
                    ))}
                </div>

                <h2>Pick Date & Time</h2>
                <section className="calendar-card">
                    <div className="calendar-days">
                        {days.map((day) => (
                            <button
                            key={day}
                            type="button"
                            className={selectedDay === day ? 'day active' : 'day'}
                            onClick={() => setSelectedDay(day)}
                            >
                                {day}
                            </button>
                        ))}
                    </div>

                    <div className="slots-panel">
                        <h3>Available Slots</h3>
                        <div className="slot-grid">
                            {slots.map((slot) => (
                                <button
                                key={slot}
                                type="button"
                                className={selectedSlot === slot ? 'slot active' : 'slot'}
                                onClick={() => setSelectedSlot(slot)}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {message ? <p className="ok-message">{message}</p> : null}
            </section>

            <aside className="summary-card">
                <header>Appointment Summary</header>

                <div className="summary-row">
                    <span>SPECIALTY</span>
                    <strong>{selectedSpecialty}</strong>
                </div>

                <div className="summary-row">
                    <span>DOCTOR</span>
                    <strong>{activeDoctor.name}</strong>
                    <small>⭐ {activeDoctor.rating} Rating</small>
                </div>

                <div className="summary-row">
                    <span>DATE & TIME</span>
                    <strong>Tue, Oct {selectedDay}, 2023</strong>
                    <small>{selectedSlot}</small>
                </div>

                <div className="fees">
                    <p><span>Consultation Fee</span><strong>${consultationFee}.00</strong></p>
                    <p><span>Service Fee</span><strong>${serviceFee}.00</strong></p>
                    <p className="total"><span>Total</span><strong>${total}.00</strong></p>
                </div>

                <button type="button" className="confirm-btn" onClick={handleConfirm}>
                    Confirm Appointment
                </button>
            </aside>
        </main>
    )
}

export default CitaPage