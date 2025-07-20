// src/pages/public/Home.tsx
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Bienvenido a RedComex</h1>
      <p>Facilitamos las exportaciones de las PYMEs colombianas</p>

      <div style={{ marginTop: '2rem' }}>
        <Link to="/login">
          <button style={{ margin: '1rem', padding: '0.5rem 1.5rem' }}>Iniciar Sesión</button>
        </Link>
        <Link to="/registro">
          <button style={{ margin: '1rem', padding: '0.5rem 1.5rem' }}>Registrarse</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
