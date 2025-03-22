import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 bg-white w-64 border-r">
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <nav className="px-4 py-4">
            <ul className="space-y-1">
              <li>
                <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Integrações
                </Link>
              </li>
              <li>
                <Link to="/utms" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  UTMs
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  Configurações
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
} 