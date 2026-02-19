"use client";

import { useEffect, useState } from "react";
import { Template } from "@/types/template";
import { getTemplates, saveTemplate } from "@/lib/templates_service";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newTemplate, setNewTemplate] = useState({
    nombre: "",
    imagenPrevia: "",
    esPremium: false,
  });

  useEffect(() => {
    loadTemplates();
  }, []);

  async function loadTemplates() {
    try {
      setLoading(true);
      const data = await getTemplates();
      setTemplates(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTemplate(e: React.FormEvent) {
    e.preventDefault();

    try {
      const created = await saveTemplate({
        id: "",
        ...newTemplate,
      });

      setTemplates((prev) => [...prev, created]);

      setNewTemplate({
        nombre: "",
        imagenPrevia: "",
        esPremium: false,
      });
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Administrar Plantillas</h1>

      {/* FORMULARIO CREAR */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Crear Nueva Plantilla</h2>

        <form onSubmit={handleCreateTemplate} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={newTemplate.nombre}
            onChange={(e) =>
              setNewTemplate({ ...newTemplate, nombre: e.target.value })
            }
            className="w-full border p-2 rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="URL Imagen Preview"
            value={newTemplate.imagenPrevia}
            onChange={(e) =>
              setNewTemplate({
                ...newTemplate,
                imagenPrevia: e.target.value,
              })
            }
            className="w-full border p-2 rounded-lg"
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newTemplate.esPremium}
              onChange={(e) =>
                setNewTemplate({
                  ...newTemplate,
                  esPremium: e.target.checked,
                })
              }
            />
            Plantilla Premium
          </label>

          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-80"
          >
            Crear Plantilla
          </button>
        </form>
      </div>

      {/* LISTADO */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Listado</h2>

        {loading && <p>Cargando plantillas...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-xl overflow-hidden shadow-sm"
            >
              <img
                src={template.imagenPrevia}
                alt={template.nombre}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">{template.nombre}</h3>

                {template.esPremium && (
                  <span className="text-sm text-yellow-600 font-medium">
                    Premium
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
