
import React, { useState, useEffect } from "react";

const users = ["Alexander Monteiro", "Andréia Simões Maciel", "Guilherme Lamego Lima", "Joao Leonardo Lima", "LUCAS ISIDORO", "Marcelo Alves dos Santos", "Pedro Henrique Pinto Souza", "Petry Schuartz", "Rafaella da Costa", "Ramon Lamego", "Renata Lima"];

export default function ChatGPTAccessControl() {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime) {
        setStartTime(new Date(startTime));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [startTime]);

  const handleEnter = () => {
    if (!selectedUser) return;
    if (!currentUser) {
      setCurrentUser(selectedUser);
      setStartTime(new Date());
    }
  };

  const handleExit = () => {
    setCurrentUser(null);
    setStartTime(null);
  };

  const getDuration = () => {
    if (!startTime) return "-";
    const now = new Date();
    const diff = Math.floor((now - new Date(startTime)) / 60000);
    return `${diff} min${diff !== 1 ? "s" : ""}`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Controle de Uso - ChatGPT</h1>

        {currentUser ? (
          <div className="text-center mb-4">
            <p className="text-lg">🔒 Em uso por:</p>
            <p className="text-2xl font-semibold">{currentUser}</p>
            <p className="text-sm text-gray-500 mt-1">Tempo de uso: {getDuration()}</p>
            <button
              onClick={handleExit}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-2xl hover:bg-green-600"
            >
              Liberar acesso
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="mb-4 px-4 py-2 rounded-xl border border-gray-300"
            >
              <option value="">Selecione seu nome</option>
              {users.map((user) => (
                <option key={user} value={user}>{user}</option>
              ))}
            </select>
            <button
              onClick={handleEnter}
              disabled={!selectedUser}
              className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600 disabled:bg-gray-300"
            >
              Entrar no ChatGPT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
