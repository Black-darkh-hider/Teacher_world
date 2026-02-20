import { Link } from "react-router-dom"

export default function Policy() {
  return (
    <div>
      <nav className="navbar">
        <div className="container flex justify-between">
          <Link to="/" className="navbar-brand">
            TeacherWorld
          </Link>
          <ul className="navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </nav>

      <section style={{ padding: "3rem 0", background: "#f9fafb" }}>
        <div className="container">
          <h1>Privacy Policy & Terms of Service</h1>
        </div>
      </section>

      <section style={{ padding: "3rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Privacy Policy</h3>
          <p>Last updated: January 2025</p>

          <h4 style={{ marginTop: "2rem" }}>1. Introduction</h4>
          <p>
            TeacherWorld ("we", "us", "our") operates the TeacherWorld website and platform. This page informs you of
            our policies regarding the collection, use, and disclosure of personal data.
          </p>

          <h4 style={{ marginTop: "2rem" }}>2. Information Collection and Use</h4>
          <p>We collect several different types of information:</p>
          <ul style={{ marginLeft: "2rem" }}>
            <li>Personal identification information (name, email, phone number)</li>
            <li>Professional information (qualifications, experience, certifications)</li>
            <li>Document uploads (resume, certificates, credentials)</li>
            <li>Location data (for job search functionality)</li>
          </ul>

          <h4 style={{ marginTop: "2rem" }}>3. Security of Data</h4>
          <p>
            The security of your data is important to us but remember that no method of transmission over the Internet
            or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to
            protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h4 style={{ marginTop: "2rem" }}>4. Changes to This Privacy Policy</h4>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page.
          </p>

          <h3 style={{ marginTop: "3rem", marginBottom: "1rem" }}>Terms of Service</h3>

          <h4 style={{ marginTop: "2rem" }}>1. Use License</h4>
          <p>
            Permission is granted to temporarily download one copy of the materials for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you
            may not: modify the materials; use the materials for any commercial purpose or for any public display;
            attempt to decompile, disassemble, or reverse engineer any software contained on the platform.
          </p>

          <h4 style={{ marginTop: "2rem" }}>2. Disclaimer</h4>
          <p>
            The materials on TeacherWorld's platform are provided on an 'as is' basis. TeacherWorld makes no warranties,
            expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
            of intellectual property or other violation of rights.
          </p>

          <h4 style={{ marginTop: "2rem" }}>3. Limitations</h4>
          <p>
            In no event shall TeacherWorld or its suppliers be liable for any damages (including, without limitation,
            damages for loss of data or profit, or due to business interruption) arising out of the use or inability to
            use the materials on TeacherWorld's platform.
          </p>

          <h4 style={{ marginTop: "2rem" }}>4. Contact Us</h4>
          <p>
            If you have any questions about this Privacy Policy or Terms of Service, please contact us at
            support@teacherworld.com
          </p>
        </div>
      </section>
    </div>
  )
}
