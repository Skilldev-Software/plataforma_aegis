import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './kit_comercial.css'
import { Bell, Settings, LogOut, LayoutDashboard, FileText, ClipboardList, Briefcase, GraduationCap, Users, Trophy, ChevronRight, Download, Search, Filter, Clock } from 'lucide-react';

function App() {
  const recentFiles = [
    { name: 'Contrato XXX', type: 'PDF', size: '2.4 MB', date: '12 Mar 2024', category: 'Contratos' },
    { name: 'Manual Operacional', type: 'PDF', size: '5.1 MB', date: '10 Mar 2024', category: 'Manuais' },
    { name: 'Apresentação Institucional', type: 'PPTX', size: '8.7 MB', date: '08 Mar 2024', category: 'Apresentações' },
  ];

  const categories = [
    { name: 'Contratos', count: 24 },
    { name: 'Manuais', count: 12 },
    { name: 'Apresentações', count: 8 },
    { name: 'Documentos', count: 15 },
  ];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM3ODE3MDYzLCJpYXQiOjE3Mzc3MzA2NjMsImp0aSI6IjhkYmQyMWI3ZjQ2NzQ4MWE4ZDliYzhmOGIwMDg3ZTYzIiwidXNlcl9pZCI6NX0.AH1kscLenTKF0NfI910pTKhnPw9nHUiQBL69ROUtRnU"
  useEffect(() => {
    axios.get('http://localhost:8000/teste_proposta/get_files', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      })
      .then(response => {
        setData(response.data);
        setLoading(false);  // Atualizando estado para indicar que o carregamento terminou
      })
      .catch(error => {
        console.error('Erro:', error);
        setLoading(false);  // Mesmo em caso de erro, o loading deve ser encerrado
      });
  }, []);

  // Verificando se ainda está carregando
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#111111] text-white">
        <span>Carregando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1A1A1A] border-r border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-[#FFD700]">AÉGIS</span> CAPITAL
          </h1>
        </div>
        
        <nav className="p-4">
          <div className="space-y-1">
            <a href="#" className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFC000] text-black">
              <div className="flex items-center space-x-3">
                <LayoutDashboard size={22} />
                <span className="font-semibold">Dashboard</span>
              </div>
              <ChevronRight size={20} />
            </a>
            
            {[
              { icon: FileText, text: 'Nova proposta' },
              { icon: ClipboardList, text: 'Minhas Operações' },
              { icon: Briefcase, text: 'Kit Comercial' },
              { icon: GraduationCap, text: 'Academy' },
              { icon: Users, text: 'Prospecção' },
              { icon: Trophy, text: 'Ranking' }
            ].map((item, index) => (
              <a key={index} href="#" className="flex items-center justify-between p-4 rounded-xl hover:bg-[#242424] transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <item.icon size={22} className="text-gray-500" />
                  <span className="text-gray-300 font-medium">{item.text}</span>
                </div>
                <ChevronRight size={20} className="text-gray-600" />
              </a>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-[#1A1A1A] border-b border-gray-800">
          <div className="flex justify-between items-center px-8 py-4">
            <h2 className="text-xl font-semibold">Visão Geral</h2>
            <div className="flex items-center space-x-8">
              <button className="relative">
                <Bell size={22} className="text-gray-400 hover:text-[#FFD700] transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFD700] rounded-full text-black text-xs flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-semibold">Caio Ferreira</p>
                  <p className="text-sm text-gray-400">BANKER</p>
                </div>
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFC000] flex items-center justify-center text-black font-bold shadow-lg">
                  CF
                </div>
                <div className="flex space-x-3 ml-4 border-l border-gray-800 pl-4">
                  <button className="p-2 hover:bg-[#242424] rounded-lg transition-colors">
                    <Settings size={22} className="text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-[#242424] rounded-lg transition-colors">
                    <LogOut size={22} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Files Content */}
        <main className="p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Arquivos Úteis</h2>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                  <input
                    type="text"
                    placeholder="Buscar arquivos..."
                    className="bg-[#1A1A1A] border border-gray-800 rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-[#FFD700] transition-colors"
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 bg-[#1A1A1A] border border-gray-800 rounded-lg hover:border-[#FFD700] transition-colors">
                  <Filter size={20} className="text-gray-400" />
                  <span>Filtrar</span>
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4 hover:border-[#FFD700] transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">{category.name}</span>
                    <span className="bg-[#242424] px-2 py-1 rounded-md text-sm text-[#FFD700]">{category.count}</span>
                  </div>
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFC000] w-0 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Files */}
            <div className="bg-[#1A1A1A] rounded-xl border border-gray-800">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock size={20} className="text-[#FFD700]" />
                  <h3 className="font-semibold">Arquivos Recentes</h3>
                </div>
                <button className="text-sm text-[#FFD700] hover:underline">Ver todos</button>
              </div>
              <div className="divide-y divide-gray-800">
                {data.map((file, index) => (
                  <div key={index} className="p-4 hover:bg-[#242424] transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-[#242424] rounded-lg flex items-center justify-center group-hover:bg-[#1A1A1A]">
                          <FileText size={20} className="text-[#FFD700]" />
                        </div>
                        <div>
                          <h4 className="font-medium">{file.name}</h4>
                          <div className="flex items-center space-x-3 text-sm text-gray-400">
                            <span>{file.type}</span>
                            <span>•</span>
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.date}</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors">
                        <Download size={20} className="text-gray-400 hover:text-[#FFD700]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
