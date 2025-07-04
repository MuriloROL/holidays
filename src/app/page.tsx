// src/app/page.tsx

"use client"; // Necessário pois usamos hooks e providers

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Importamos o componente HolidayApp que agora está sendo exportado corretamente
import { HolidayApp } from '@/components/holidayApp'; // <-- AJUSTE ESSE CAMINHO se necessário

// Criamos a instância do QueryClient aqui, na página que o utiliza
const queryClient = new QueryClient();

// Este é o componente da sua página
export default function Page() {
    return (
        // O Provider "abraça" o seu componente aqui
        <QueryClientProvider client={queryClient}>
            {/* Os estilos da página também ficam aqui */}
            <style>{`
    @import url('https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css');
    body { padding: 2rem; }
            `}</style>
            
            {/* E finalmente, renderizamos o seu app! */}
            <HolidayApp />
        </QueryClientProvider>
    );
}