// src/components/ChartsHome.tsx
import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    LineChart, Line, CartesianGrid, Legend, Cell
} from 'recharts';

interface ProductoPais {
    pais: string;
    producto: string;
    volumen: number;
}

interface VolumenMes {
    mes: string;
    volumen: number;
}

export default function ChartsHome() {
    const [topDatos, setTopDatos] = useState<ProductoPais[]>([]);
    const [mesDatos, setMesDatos] = useState<VolumenMes[]>([]);

    useEffect(() => {
        fetch('http://localhost:4567/top-productos-por-pais')
            .then(res => res.json())
            .then(data => setTopDatos(data));

        fetch('http://localhost:4567/volumen-por-mes')
            .then(res => res.json())
            .then(data => setMesDatos(data));
    }, []);

    const PRODUCTO_COLORS: Record<string, string> = {
        Aguacate: '#057536',
        Café: '#8B4513',
        Banano: '#DED147',
        Flores: '#FF69B4',
    };

    return (
        <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl text-indigo-700 mb-2 text-center">
                     Productos más exportados por país (Top 5)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topDatos} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        onMouseMove={(state) => { /* hover optional opacity logic aquí si deseas */ }}
                    >
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" />
                        <XAxis dataKey="pais" tick={{ fill: '#444', fontSize: 14 }} />
                        <YAxis tick={{ fill: '#444', fontSize: 14 }} />
                        <Tooltip cursor={false} />
                        <Bar dataKey="volumen" name="Volumen" isAnimationActive={true} animationDuration={1200}>
                            {topDatos.map((entry, idx) => (
                                <Cell key={idx} fill={PRODUCTO_COLORS[entry.producto] || '#8884d8'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                {/* Leyenda */}
                <div className="flex justify-center mt-2 space-x-4">
                    {Object.entries(PRODUCTO_COLORS).map(([prod, color]) => (
                        <div key={prod} className="flex items-center space-x-1">
                            <span className="w-4 h-4" style={{ backgroundColor: color }} />
                            <span>{prod}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl text-indigo-700 mb-2 text-center">
                     Volumen mensual de exportaciones
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={mesDatos}>
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <CartesianGrid stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="volumen" stroke="#d53f8c" name="Volumen" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
