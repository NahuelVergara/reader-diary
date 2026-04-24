'use client';

import { insforge } from '@/lib/insforge';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteButton({ bookId }: { bookId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
      setIsDeleting(true);
      const { error } = await insforge.database
        .from('entries')
        .delete()
        .eq('id', bookId);

      if (error) {
        alert('Hubo un error al eliminar: ' + error.message);
        setIsDeleting(false);
      } else {
        router.push('/');
        router.refresh();
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="font-mono text-[13px] tracking-widest uppercase text-red-700 font-bold hover:text-red-900 transition-colors duration-300 disabled:opacity-50"
    >
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </button>
  );
}
