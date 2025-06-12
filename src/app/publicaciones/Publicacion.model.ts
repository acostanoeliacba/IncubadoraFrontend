export interface Publicacion {
    id_publicacion?: number;
    titulo: string;
    contenido: string;
    tipo: 'curso' | 'capacitacion' | 'entrenamiento';
    estado: 'activo' | 'inactivo';
    fecha_publicacion?: string; 
  }
  