import { useEffect, useState } from "react";
import type { User } from "./types/User";

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => setUser(data[0]));
  }, []);

  if (!user) return <p>Chargement...</p>;
  return (
    <p>
      Bonjour {user.firstName} {user.lastName} ! Voici ton adresse mail (
      {user.mail})
    </p>
  );
}
